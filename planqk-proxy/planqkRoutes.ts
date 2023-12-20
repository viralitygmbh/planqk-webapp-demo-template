import { Router, Request, Response } from 'express';
import { PlanqkServiceClient } from "@anaqor/planqk-service-sdk";

const router = Router();

export default function(planqkServiceClient: PlanqkServiceClient) {
    router.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
    });

    router.post('/create', async (req: Request, res: Response) => {
        try {
            const data = req.body.data;
            const params = req.body.params;
            const response = await planqkServiceClient.startExecution({ data, params });
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    });

    router.get('/result/:computingId', async (req: Request, res: Response) => {
        try {
            const response = await planqkServiceClient.getResult(req.params.computingId);
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    });

    router.get('/status/:computingId', async (req: Request, res: Response) => {
        try {
            const response = await planqkServiceClient.getStatus(req.params.computingId);
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    });

    return router;
}
