import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()


class App {

    app: Application
    private port: string | number

    constructor(controllers: any[]) {
        this.app = express();
        this.port = process.env.PORT || 8080
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    private initializeMiddlewares() {
        this.app.use(express.json())
    }
    initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use("/api", controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server ready at http://localhost:${this.port}`)
        })
    }
}

export default App