import { Request, Response } from "express";
import fetchData from '../lib/fetchData'

class ControllerClass{

    public async getData(req: Request, res: Response): Promise<void> {
        const data = await fetchData()
        if(!data || data.length === 0){
            res.status(500).json({error: "Falha no servidor."})
            return
        }
        res.status(200).json({status: 200, data})
    }
}

const mangaController = new ControllerClass()
export default mangaController