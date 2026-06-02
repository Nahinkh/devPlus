import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUSER } from "./auth.interface";

// Register a new user into the database
const registerUserIntoDB = async (userData: IUSER) => {
  try {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 12); // Replace with actual hashing logic

    const result = await pool.query(
      `
            INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, COALESCE(NULLIF($4, ''), 'contributor'))
            RETURNING *
        `,
      [name, email, hashedPassword, role],
    );
    console.log(result);

    if (result?.rows?.length === 0) {
      throw new Error("User creation failed");
    }

    return result;
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

// Login user by checking email and password
const loginUserIntoDB = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
`,
    [email],
  );

  if (result?.rows?.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0];
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    throw new Error("Invalid password");
  }
  return result;
};

export const userService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
