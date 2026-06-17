import { pool } from "../../db";

const createIssuesInDB = async (
  payload: {
    title: string;
    description: string;
    type: "bug" | "feature_request";
  },
  reporterId: number,
) => {
  try {
    const query = `
        INSERT INTO issues (title, description, type, status, reporter_id)
        VALUES ($1, $2, $3,'open', $4)
        RETURNING *
    `;
    const values = [
      payload.title,
      payload.description,
      payload.type,
      reporterId,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error creating issue:", error);
    throw new Error("Error creating issue: " + (error as Error).message);
  }
};

const getAllIssuesFromDB = async (
  sort: string = "newest",
  type?: string,
  status?: string,
) => {
  try {
    let query = `SELECT * FROM issues`;
    let conditions: string[] = [];
    let values: any[] = [];

    // Add conditions based on type and status
    if (type) {
      values.push(type);
      conditions.push(`type = $${conditions.length}`);
    }

    if (status) {
      values.push(status);
      conditions.push(`status = $${conditions.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    // Add sorting
    switch (sort) {
      case "newest":
        query += " ORDER BY created_at DESC";
        break;
      case "oldest":
        query += " ORDER BY created_at ASC";
        break;
      default:
        query += " ORDER BY created_at DESC";
    }

    const result = await pool.query(query, values);
    const issues = result.rows;
    if (issues.length === 0) {
      throw new Error("No issues found");
    }
    // Extract unique reporter IDs from the issues
    const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];
    const reporterResult = await pool.query(`SELECT id, name, email, role FROM users WHERE id = ANY($1)`, [reporterIds]);
    const reporters = reporterResult.rows;
    const issuesWithReporter = issues.map((issue) => {
      const reporter = reporters.find(
        (reporter) => reporter.id === issue.reporter_id,
      );
      return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: reporter ? { id: reporter.id, name: reporter.name, role: reporter.role } : null,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
      }
    });

    return issuesWithReporter;
  } catch (error) {
    console.error("Error fetching issues:", error);
  }
};

const getSingleIssueFromDB = async (issueId: number) => {
  try {
    const query = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
      issueId,
    ]);
    if (query.rows.length === 0) {
      throw new Error("Issue not found");
    }
    const issue = query.rows[0];
    const userIssueQuery = await pool.query(
      "SELECT id, name, role FROM users WHERE id = $1",
      [issue.reporter_id],
    );
    const result = userIssueQuery.rows[0];
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: result ? { id: result.id, name: result.name, role: result.role } : null,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  } catch (error) {
    throw new Error("Error fetching issue: " + (error as Error).message);
  }
};
const updateIssueInDB = async (
  issueId: number,
  payload: {
    title?: string;
    description?: string;
    type?: string;
    status?: string;
  },
  user: {
    id: number;
    role: string;
  },
) => {
  const queryResults = await pool.query("SELECT * FROM issues WHERE id = $1", [
    issueId,
  ]);
  if (queryResults.rows.length === 0) {
    throw new Error("Issue not found");
  }
  const issue = queryResults.rows[0];
  if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new Error("Unauthorized: You can only update your own issues.");
    }
    if (issue.status !== "open") {
      throw new Error("Unauthorized: You can only update open issues.");
    }
  }
  const result = await pool.query(
    `
    UPDATE issues
      SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type),
        updated_at = NOW()
    WHERE id = $4
    RETURNING *
    `,
    [payload.title, payload.description, payload.type, issueId],
  );
  return result.rows[0];
};

const deleteIssueFromDB = async (issueId: number, role: string) => {
  try {
    if(role !== "maintainer"){
      throw new Error("Unauthorized: Only maintainers can delete issues.");
    }
    const queryResults = await pool.query("DELETE FROM issues WHERE id = $1 RETURNING *", [
      issueId,
    ]);
    if (queryResults.rows.length === 0) {
      throw new Error("Issue not found");
    }
    console.log(queryResults)
    return queryResults.rows[0];
  } catch (error) {
    console.error("Error deleting issue:", error);
    throw new Error("Error deleting issue: " + (error as Error).message);
  }
}

export const issueService = {
  createIssues: createIssuesInDB,
  getAllIssues: getAllIssuesFromDB,
  getSingleIssue: getSingleIssueFromDB,
  updateIssue: updateIssueInDB,
  deleteIssue: deleteIssueFromDB
};
