// config.ts
export interface Config {
    port: number;
    serviceEndpoint: string;
    consumerKey: string;
    consumerSecret: string;
    demoData: string;
}

const config: Config = {
    port: parseInt(process.env.PORT || '8080', 10),
    serviceEndpoint: process.env.SERVICE_ENDPOINT || '',
    consumerKey: process.env.CONSUMER_KEY || '',
    consumerSecret: process.env.CONSUMER_SECRET || '',
    demoData: process.env.DEMO_DATA || '{\n' +
        '        "data": {},\n' +
        '        "params": {}\n' +
        '    }',
};

export { config };
