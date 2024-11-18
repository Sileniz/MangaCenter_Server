import express, { Application } from 'express'
import { router } from '../router/mangaRouter'
import { connectionDB } from '../db/dbConnection'
import fetchNewData from '../lib/updateRepo'
import cron from 'node-cron'
import cors from 'cors'
import helmet from "helmet";
import 'dotenv/config'

class Server{
    private app: Application
    private port: string

    constructor(port: string){
        this.port = process.env.SERVER_PORT || port || '3000'
        this.app = express()
        this.app.use(express.json())
        this.app.use(cors({
            methods: 'GET',
            origin: 'https://mangacenter.vercel.app',
            allowedHeaders: 'Content-Type'
        }))
        this.app.use(helmet());
        this.app.use(router)
        this.initServer()
    }
    private initServer(): any {
        this.app.listen(this.port, () => {
            try {
                console.log(`Servidor inicializado na porta ${this.port}`)
            } catch (error) {
                console.log('Houve um problema ao inicializar o servidor')
            }
        })
    }
}

(async () => {
    const server = new Server("4000")
    await connectionDB.connectDB()
    const task = cron.schedule('*/3 * * * *', async() => {
        console.log('Executando refresh');
        await fetchNewData()
    });
    task.start()
})()