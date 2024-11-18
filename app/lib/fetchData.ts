import { getSites } from "../db/queries";
import { SiteData } from "./updateRepo";

export default async function fetchData(): Promise<SiteData[]> {
    let data: any[] = [];
    const fetchData = async () => {
        try {
          data = await getSites();
          if (!data || data.length === 0)
            throw Error("Sem dados no array");
        } catch (error) {
          console.log(error);
        }
      };
    await fetchData();
    return data;
}
