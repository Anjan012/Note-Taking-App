import express from "express";
import { createNote, getNotes } from "../controllers/noteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/create-notes").post(createNote);
router.route("/get-notes").get(getNotes); 

export default router;