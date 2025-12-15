import {Note} from "../models/note.model.js"

export const createNote = async (req, res) => {
    try {

        console.log(req.body);

        const {title, content, tags, userId} = req.body;

        const noteCreate = await Note.create({
            title,
            content,
            tags,
            userId
        });

        res.status(201).json({
            id: noteCreate._id,
            title: noteCreate.title,
            content: noteCreate.content,
            tags: noteCreate.tags,
            userId: noteCreate.userId
        })
        
    } catch (error) {
        console.log(`Create Note: ${error}`);
    }
}