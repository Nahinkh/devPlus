import app from "./app";
import envConfig from "./config/dotEnv.config";
import initDB from "./db";

const main = () => {
    initDB()
  app.listen(envConfig.port, () => {
    console.log(`Server is running at http://localhost:${envConfig.port}`);
  });
};
main();
