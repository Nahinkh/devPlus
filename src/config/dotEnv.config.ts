import dotenv from "dotenv";

dotenv.config();
const envConfig ={
    port: process.env.PORT as string,
    db_url: process.env.DB_URL as string
}

export default envConfig;