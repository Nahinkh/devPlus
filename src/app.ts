import express from "express";
import { userRoute } from "./modules/auth/auth.route";


const app = express();
app.use(express.json());


app.use('/api/auth',userRoute)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World from DevPlus Backends!" });
});

export default app;
