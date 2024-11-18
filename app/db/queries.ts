import { connectionDB } from '../db/dbConnection';

export const createTable: string  = 
`CREATE TABLE IF NOT EXISTS sites (
id TEXT PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
site VARCHAR(255) NOT NULL,
status VARCHAR(64) NOT NULL
 );` 

export const insertIntoSites: string  = 
`INSERT INTO sites (id, name, site, status) VALUES ($1, $2, $3, $4);` 

export const updateSites = async (status: string, siteName: string, siteID: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `UPDATE sites SET status = $1 WHERE id = $2`
         connectionDB.client.query(query, [status, siteID], (err: any) => {
            if (err) {
                console.error('Erro ao atualizar dado:', err);
                reject(err)
            } else {
                console.log(`Status do site ${siteName} atualizado para "${status}"`);
                resolve('Sucesso')
            }
        })
    })
}

export async function getSites(): Promise<any> {
    return new Promise((resolve, reject) => {
        connectionDB.client.query('SELECT * FROM sites', [], (err: any, rows: any) => {
            if(err){
                if(err.code === '42P01')
                resolve(false)
                return
            }
                resolve(rows.rows)
        })
    })
}