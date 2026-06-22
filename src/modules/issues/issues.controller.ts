import type { Request, Response } from "express";
import { issueService } from "./issues.service";
import { sendResponse } from "../../utils/sendResponse";

const createIssues = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user?.id;
    const { title, description, type } = req.body;
    // Validate the input data
    if (!title || !description || !type) {
      return res.status(400).json({
        status: false,
        message: "Title, description, and type are required.",
      });
    }
    // Call the service function to create the issue
    const newIssue = await issueService.createIssues(req.body, reporter_id);
    sendResponse(res, {
      statusCode: 201,
      status: true,
      message: "Issue created successfully",
      data: newIssue,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      status: "error",
      message: "An error occurred while creating the issue.",
      error: error.message,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { sort = "newest", type, status } = req.query;
    const issues = await issueService.getAllIssues(
      sort as string,
      type as string,
      status as string,
    );
    sendResponse(res, {
      statusCode: 200,
      status: true,
      message: "Issues retrieved successfully",
      data: issues,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching the issues.",
    });
  }
};

const getIssueById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await issueService.getSingleIssue(id);
    sendResponse(res, {
      statusCode: 200,
      status: true,
      message: "Issue retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching issue by ID:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching the issue.",
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body;
    const user = req.user as { id: number; role: string };
    const result = await issueService.updateIssue(id, payload, user);
    sendResponse(res, {
      statusCode: 200,
      status: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      status: "error",
      message: "An error occurred while updating the issue.",
      error: (error as Error).message,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = req.user as { id: number; role: string };
    await issueService.deleteIssue(id, user.role);
    sendResponse(res, {
      statusCode: 200,
      status: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      status: "error",
      message: "An error occurred while deleting the issue.",
      error: (error as Error).message,
    });
  }
};

export const issueController = {
  createIssues,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
