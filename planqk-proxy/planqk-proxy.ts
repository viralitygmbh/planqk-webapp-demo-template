import express, { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import * as dotenv from 'dotenv';
import { Buffer } from 'buffer';
import path from 'path';


dotenv.config();

const app = express();
let planqkAccessToken: string = '';

app.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../webapp/')));


app.get('/planqk/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.post('/planqk/create', async (req: Request, res: Response) => {
    const auth = 'Basic ' + Buffer.from(process.env.CONSUMER_KEY! + ':' + process.env.CONSUMER_SECRET!).toString('base64');
    return await axios.post('https://gateway.platform.planqk.de/token', 'grant_type=client_credentials', {
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(
        async (authResponse: AxiosResponse) => {
            planqkAccessToken = authResponse.data.access_token;
            try {
                const response = await axios.post(process.env.SERVICE_ENDPOINT!, req.body, {
                    headers: {
                        'Authorization': 'Bearer ' + planqkAccessToken,
                        'X-Do-Not-Set-Default-Content-Type': 'true',
                        'Content-Type': 'application/json',
                    }
                });

                res.json(response.data);
            } catch (error) {
                res.status(500).send('Something went wrong');
            }
        });
});

app.get('/planqk/result/:computingId', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${process.env.SERVICE_ENDPOINT!}/${req.params.computingId}/result`, {
            headers: {
                'Authorization': 'Bearer ' + planqkAccessToken,
                'X-Do-Not-Set-Default-Content-Type' : 'true',
                'Content-Type': 'application/json',
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

app.get('/planqk/status/:computingId', async (req: Request, res: Response) => {
    console.log("Get status");
    try {
        const response = await axios.get(`${process.env.SERVICE_ENDPOINT!}/${req.params.computingId}`, {
            headers: {
                'Authorization': 'Bearer ' + planqkAccessToken,
                'X-Do-Not-Set-Default-Content-Type' : 'true',
                'Content-Type': 'application/json',
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../webapp/index.html'));
});

app.listen(8080, () => {
    console.log('App listening on port 8080');
});