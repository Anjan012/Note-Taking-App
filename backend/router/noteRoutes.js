import express from "express";
import { createNote } from "../controllers/noteController.js";

const router = express.Router();

router.route("/create-notes").post(createNote);

export default router;