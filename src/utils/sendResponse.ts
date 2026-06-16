import type { Response } from "express";

type TResponse = {
    statusCode: number;
    status: string | boolean;
    message: string;
    data?: any;
    error?: any;
    token?: string;
}

export const sendResponse = (res: Response, data: TResponse) => {
    res.status(data.statusCode).json({
        status: data.status,
        message: data.message,
        data: data.data,
        error: data.error
    });
}