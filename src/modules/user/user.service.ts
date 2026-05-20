import { pool } from "../../db";
import type { IUSER } from "./user.interface";

const registerUserIntoDB = async(userData: IUSER) => {
    try {
        const { name, email, password, role } = userData;
        const result = await pool.query(`
            INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, COALESCE(NULLIF($4, ''), 'contributor'))
            RETURNING *
        `,[name, email, password, role]);
        console.log(result)
            
        if(result?.rows?.length === 0){
            throw new Error("User creation failed")
        }

        return result;
        console.log(userData)
    } catch (error) {
        console.log(error)
    }
}

export const userService = {
    registerUserIntoDB
}