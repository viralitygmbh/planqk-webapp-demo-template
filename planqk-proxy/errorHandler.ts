// errorHandler.ts
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log the error, e.g., using Winston or another logging library
    console.error(err);

    res.status(500).json({ message: 'Something went wrong' });
};

export default errorHandler;
