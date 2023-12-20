// config.ts
interface Config {
    port: number;
    serviceEndpoint: string;
    consumerKey: string;
    consumerSecret: string;
}

const config: Config = {
    port: parseInt(process.env.PORT || '8080', 10),
    serviceEndpoint: process.env.SERVICE_ENDPOINT || '',
    consumerKey: process.env.CONSUMER_KEY || '',
    consumerSecret: process.env.CONSUMER_SECRET || '',
};

export { config };
