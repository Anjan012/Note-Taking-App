import { Note } from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    console.log(req.body);

    const { title, content, tags, userId } = req.body;

    const noteCreate = await Note.create({
      title,
      content,
      tags,
      userId,
    });

    res.status(201).json({
      id: noteCreate._id,
      title: noteCreate.title,
      content: noteCreate.content,
      tags: noteCreate.tags,
      userId: noteCreate.userId,
    });
  } catch (error) {
    console.log(`Create Note: ${error}`);
  }
};

export const getNotes = async (req, res) => {
  try {
    // Get userId from query string (e.g., ?userId=123)
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    console.log("Fetching notes for userId:", userId); // Debug

    const result = await Note.find({ userId });

    res.status(200).json(result);
  } catch (error) {
    console.log("Get Notes Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        message: "note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted sucessfully",
    });
  } catch (error) {
    res.status(500).json({
        message: "Internal server error"
    })
  }
};
