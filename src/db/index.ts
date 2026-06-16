import { Pool } from "@neondatabase/serverless";
import envConfig from "../config/dotEnv.config";

export const pool = new Pool({
    connectionString: envConfig.db_url
})

const initDB = async()=>{
    try {
        

        // Create Table for Users
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'contributor',
            created_at TIMESTAMP DEFAULT NOW(),            
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
            // Create Table for Issues
            await pool.query(`
            CREATE TABLE IF NOT EXISTS issues (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            type VARCHAR(50) NOT NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'open',
            reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT NOW(),            
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
            console.log("\n=======Server Connected to DevPlus NEONdb===========\n")

    } catch (error) {
        console.log(error)
    }
}

export default initDB;