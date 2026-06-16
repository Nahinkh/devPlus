import express from "express";
import { userRoute } from "./modules/auth/auth.route";
import { issuesRoute } from "./modules/issues/issues.route";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth',userRoute)
app.use('/api/issues', issuesRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World from DevPlus Backends!" });
});

export default app;
