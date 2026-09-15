@'
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";
import scholarRoutes from "./routes/scholar.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use("/api/scholar", scholarRoutes);

export default app;
'@ | Set-Content -Encoding UTF8 "src\app.ts"