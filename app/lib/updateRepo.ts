import { getSites, updateSites } from "../db/queries";
import('node-fetch')
export interface SiteData {
  id: string,
  name: string;
  site: string;
  status: string;
}
export default async function fetchNewData(): Promise<void> {

  let linksArray: SiteData[] = [];
  const fetchData = async () => {
    try {
      linksArray = await getSites();
      if (!linksArray || linksArray.length === 0)
        throw Error("Sem dados no array");
    } catch (error) {
      console.log(error);
    }
  };
  await fetchData()
  await Promise.all(linksArray.map(async (item) => {
    let arrayCodes = [500,418,404]
    let arrayErrors = ["ENETUNREACH","ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR","ERR_SSL_SSLV3_ALERT_HANDSHAKE_FAILURE"]
      try {
        let response = await fetch(item.site, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0'
          }
        });

        let values = "Offline";
        if (response.ok) values = "Online";
        if (response.status == 403) values = "403";
        if (arrayCodes.includes(response.status)) values = "Não foi possível diagnosticar";
        if(item.status !== values) await updateSites(values, item.name, item.id);
        
      } catch (error: any) {
        let values = "Erro desconhecido";
        if (error.cause.code === "ENOTFOUND") {
          values = "Site não encontrado";
        } else if (arrayErrors.includes(error.cause.code)) {
          values = "Não foi possível estabelecer conexão";
        }
        if(item.status !== values) await updateSites(values, item.name, item.id);
      }
    })
  )
  console.log("Todos os dados atualizados");
}
