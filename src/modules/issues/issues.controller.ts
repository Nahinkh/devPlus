import type { Request, Response } from "express";
import { issueService } from "./issues.service";


const createIssues=async(req:Request,res:Response)=>{
    try {
        const reporterId = req.user?.id; // Assuming you have user authentication and the user ID is available in req.user
        const { title, description, type } = req.body;
        // Validate the input data
        if (!title || !description || !type) {
            return res.status(400).json({
                status: false,
                message: "Title, description, and type are required.",
            });
        }
        // Call the service function to create the issue
        const newIssue = await issueService.createIssues(req.body, reporterId);
        return res.status(201).json({
            status: true,
            message: "Issue created successfully.",
            data: newIssue
        });
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "An error occurred while creating the issue.",
            error: error.message
        });
    }
}

const getAllIssues = async (req:Request,res:Response)=>{
    try {
        const { sort="newest", type, status } = req.query;
        const issues = await issueService.getAllIssues(sort as string, type as string, status as string);
        return res.status(200).json(issues);
    } catch (error) {
        console.error("Error fetching issues:", error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching the issues.",
        });
    }
}

const getIssueById = async (req:Request,res:Response)=>{
    try {
        const id = Number(req.params.id);
        const result = await issueService.getSingleIssue(id);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching issue by ID:", error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching the issue.",
        });

    }
}

const updateIssue = async (req:Request,res:Response)=>{
    try {
        const id = Number(req.params.id);
        const payload = req.body;
        const user = req.user as { id: number; role: string };
        const result = await issueService.updateIssue(id, payload, user);
        return res.status(200).json(result);
    } catch (error) {
      console.log(error)  
        return res.status(500).json({
            status: false,
            message: "An error occurred while updating the issue.",
            error: (error as Error).message
        })
    }
}

const deleteIssue = async (req:Request,res:Response)=>{
    try {
        const id = Number(req.params.id);
        const user = req.user as { id: number; role: string };
        const result = await issueService.deleteIssue(id, user.role);
        console.log(result)
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error deleting issue:", error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while deleting the issue.",
            error: (error as Error).message
        });
    }
}

export const issueController = {
    createIssues
    ,getAllIssues
    ,getIssueById
    ,updateIssue
    ,deleteIssue
}