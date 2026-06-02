import type { Request, RequestHandler, Response } from "express";
import { userService } from "./auth.service";
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
            message: "User registered successfully",
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

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)
        const result = await userService.loginUserIntoDB(email, password);
        if (!result?.rows[0]) {
            return sendResponse(res, {
                statusCode: 401,
                status: "error",
                message: "Invalid email or password",
            });
        }
        sendResponse(res, {
            statusCode: 200,
            status: "success",
            message: "User logged in successfully",
            data: result?.rows[0]
        });
    } catch (error: any) {
        console.log(error);
        sendResponse(res, {
            statusCode: 400,
            status: "error",
            message: "Failed to login user",
            error: error.message
        });
    }
}

export const userController = {
    createUser,
    loginUser
}