import dotenv from "dotenv";

dotenv.config();
const envConfig ={
    port: process.env.PORT as string,
    db_url: process.env.DB_URL as string,
    jwt_secret: process.env.JWT_SECRET as string
}

export default envConfig;