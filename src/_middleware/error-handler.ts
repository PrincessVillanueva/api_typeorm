import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (typeof err === "string") {
        const is404 = err.toLowerCase().includes("not found");
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err });
    }

    return res.status(500).json({ message: err.message || "Internal Server Error" });
};

export default errorHandler;
