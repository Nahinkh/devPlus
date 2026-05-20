import app from "./app";
import envConfig from "./config/dotEnv.config";

const main = () => {
  app.listen(envConfig.port, () => {
    console.log(`Server is running at http://localhost:${envConfig.port}`);
  });
};
main();
