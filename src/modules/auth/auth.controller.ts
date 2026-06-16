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
            status: true,
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
        const result = await userService.loginUserIntoDB(email, password);
        const { accessToken } = result;
        res.cookie("accessToken", accessToken, {
            secure:false,
            httpOnly: true,
            sameSite: "lax"
        });
        sendResponse(res, {
            statusCode: 200,
            status: true,
            message: "Login successful",
            data: { 
                token: accessToken,
                user: result.user
                
             }
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