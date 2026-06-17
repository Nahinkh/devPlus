import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUSER } from "./auth.interface";
import jwt from "jsonwebtoken";
import envConfig from "../../config/dotEnv.config";

// Register a new user into the database
const registerUserIntoDB = async (userData: IUSER) => {
  try {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 12); 

    const result = await pool.query(
      `
            INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, COALESCE(NULLIF($4, ''), 'contributor'))
            RETURNING *
        `,
      [name, email, hashedPassword, role],
    );
    delete result.rows[0].password;
    if (result?.rows?.length === 0) {
      throw new Error("User creation failed");
    }

    return result;
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
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,

  }
  const accessToken = await jwt.sign(jwtPayload,envConfig.jwt_secret as string,{expiresIn: "1d"});
  return {accessToken, user: jwtPayload};
  
};

export const userService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
