import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import authRoutes from "./router/authRoutes.js"
import noteRoutes from "./router/noteRoutes.js"


dotenv.config({});

const app = express();


const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRoutes);
app.use("/api/auth", noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running ${PORT}`);
})
