import { Router } from 'express'
import mangaController from '../controller/mangaController'

class RouterClass{
    public router: Router
    constructor(){
        this.router = Router()
        this.initRouter()
    }
    private initRouter(): void {
        this.router.get('/', mangaController.getData)
    }
}

export const router = new RouterClass().router
