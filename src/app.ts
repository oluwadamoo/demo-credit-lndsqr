import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()
const app: Application = express();
const port = process.env.PORT || 8080


class App {

    constructor(controllers: any[]) {
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    private initializeMiddlewares() {
        app.use(express.json())
    }
    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            app.use("/", controller.router)
        })
    }

    public listen() {
        app.listen(port, () => {
            console.log(`🚀 Server ready at http://localhost:${port}`)
        })
    }
}

export default App