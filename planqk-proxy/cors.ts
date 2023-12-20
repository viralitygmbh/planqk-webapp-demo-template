import { Request, Response, NextFunction } from 'express';

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*'); // Erlaubt Zugriffe von jeder Herkunft
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // Erlaubte HTTP-Methoden
    res.header('Access-Control-Allow-Headers', '*'); // Erlaubt alle Header
    res.header('Cross-Origin-Resource-Policy', 'cross-origin'); // Setzt die Cross-Origin-Ressourcenpolitik

    next(); // Fährt mit der nächsten Middleware in der Kette fort
};

export default corsMiddleware;
