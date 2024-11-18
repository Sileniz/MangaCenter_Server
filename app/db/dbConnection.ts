import pg, {Client} from 'pg'
import { v4 as uuidv4 } from 'uuid';
import { createTable, getSites, insertIntoSites } from './queries'
import 'dotenv/config'

class Database{
  public client: pg.Client
  constructor(){
    this.client = new Client({
      connectionString: process.env.POSTGRES_STRING,
      ssl: {
        rejectUnauthorized: false
      }
    })
  }
  public async connectDB(): Promise<void>{
    this.client.connect(async(err) => {
      if(err){
        console.log('Erro ao conectar no banco de dados')
        return
      }
      console.log('Conectado no banco de dados')
      let checkTable = await getSites()
      if(!checkTable) await this.firstConnection()
    })
  }
  private async firstConnection(): Promise<void>{
    try {
      await this.client.query(createTable);
      let response = await fetch('https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json')
      if(!response.ok) throw Error('Falha ao requisitar dados para tabela')

      let jsonResponse: any = await response.json()
      let onlyPT = jsonResponse.filter((item: any) => item.lang == 'pt-BR')
      for(let i = 0; i < onlyPT.length; i++){
        let source = onlyPT[i].sources[0]
        await this.client.query(insertIntoSites, [uuidv4(), source.name, source.baseUrl, 'Offline'])
      }
    } catch (err) {
      console.error('Erro ao criar tabela:', err);
      this.client.end()
    }
  }
}
export const connectionDB = new Database()