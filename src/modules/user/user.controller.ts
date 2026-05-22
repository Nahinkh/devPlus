import type { Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.registerUserIntoDB(req.body);
        if(!result?.rows[0]){
            return sendResponse(res, {
                statusCode: 400,
                status: "error",
                message: "Email already exists",
            });
        }
        sendResponse(res,{
            statusCode: 201,
            status: "success",
            message: "User created successfully",
            data: result?.rows[0]
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 400,
            status: "error",
            message: "Failed to create user",
            error: error.message
        });
    }
}

export const userController = {
    createUser
}