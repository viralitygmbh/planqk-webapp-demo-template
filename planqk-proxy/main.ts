import express, { Application } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import logger from './logger';
import { config } from './config';
import customCorsMiddleware from './cors';
import errorHandler from './errorHandler';
import planqkRoutes from './planqkRoutes';
import { PlanqkServiceClient } from "@anaqor/planqk-service-sdk";

class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandler();
        this.configureMiddleware();
    }

    private configureMiddleware(): void {
        this.app.use(customCorsMiddleware); // Verwenden der benutzerdefinierten CORS-Middleware
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '../webapp')));
    }

    private configureRoutes(): void {
        console.log("Config: ", config.serviceEndpoint, config.consumerKey, config.consumerSecret);
        const planqkServiceClient = new PlanqkServiceClient(config.serviceEndpoint, config.consumerKey, config.consumerSecret);
        this.app.use('/planqk/', planqkRoutes(planqkServiceClient));
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../webapp/index.html'));
        });
    }

    private configureErrorHandler(): void {
        this.app.use(errorHandler);
    }

    public start(): void {
        this.app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`);
        });
    }
}

new Server().start();
