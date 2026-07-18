import express from "express";
import cors from "cors";

import cafesRoutes from "./routes/cafes.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/cafes", cafesRoutes);

export default app;
