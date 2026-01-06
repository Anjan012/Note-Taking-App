import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import authRoutes from "./router/authRoutes.js";
import noteRoutes from "./router/noteRoutes.js";
import helmet from "helmet";

dotenv.config({});

const app = express();

app.use(helmet()); // security header
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json(
        {
            message: "Something went wrong!"
        }
    );
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try{
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        })
    }
    catch (error) {
        console.log(`Failed to connect to database: ${error}`);
    }
};

startServer();
