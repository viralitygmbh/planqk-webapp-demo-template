import express, { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import * as dotenv from 'dotenv';
import { Buffer } from 'buffer';


dotenv.config();

const app = express();
let planqkAccessToken: string = '';


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.post('/create', async (req: Request, res: Response) => {
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

app.get('/result/:computingId', async (req: Request, res: Response) => {
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

app.get('/status/:computingId', async (req: Request, res: Response) => {
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

app.listen(3000, () => {
    console.log('App listening on port 3000');
});