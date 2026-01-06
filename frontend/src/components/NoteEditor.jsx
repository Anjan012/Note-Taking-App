import { useState } from "react";
import axios from "axios";

const URL = "http://localhost:8000/api/notes/create-notes";

export const NoteEditor = ({ isOpenModal, setIsOpenModal, userData }) => {

    const [errors, setErrors] = useState({});

    const [newNote, setNewNote] = useState({
        title: "",
        content: "",
        tags: "",
        userId: userData.id
    });

    const handleInput = (event) => {
        const { name, value } = event.target;

        setNewNote(prev => { // prev is a safe way React gives you to always get the latest, most up-to-date state.
            return {
                ...prev,
                [name]: value
            };
        });
    }

    const validateNoteInput = () => {

        const newErrors = {};

        const title = newNote.title.trim();
        const content = newNote.content.trim();
        const tags = newNote.tags;

        if (!title) {
            newErrors.title = "Content with no title woof boring 🥱";
        }
        if (!content && title) {
            newErrors.content = "You can create title but no content 🥹";
        } else if (!content) {
            newErrors.content = "Babes, 💋 you can't create note without content ";
        }
        if (!tags) {
            newErrors.tags = "Hey dear you miss tags 🫣"
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }


    const handleSubmit = async () => {
        try {
            const isValid = validateNoteInput();
            if (isValid) {


                const response = await axios.post(URL,
                    {
                        title: newNote.title,
                        content: newNote.content,
                        tags: newNote.tags,
                        userId: newNote.userId
                    },
                    {
                        withCredentials: true // for future
                    }
                );


                setNewNote({
                    title: "",
                    content: "",
                    tags: "",
                    userId: userData.id
                });
                setIsOpenModal(false);
            }

        }
        catch (error) {
            console.error("Error creating note:", error);
        }
    }

    const closeEditor = () => {
        setIsOpenModal(false);
    }


    return (
        <div className="modal" style={{ display: isOpenModal ? 'flex' : 'none' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>New Note</h3>
                    <button className="close-btn" onClick={() => closeEditor()}>×</button>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        className="editor-title"
                        placeholder="Note title..."
                        onChange={handleInput}
                        name="title"
                        value={newNote.title}
                    />
                    {
                        errors.title && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.title}</span>
                    }
                    <textarea
                        className="editor-content"
                        placeholder="Start writing your note..."
                        onChange={handleInput}
                        name="content"
                        value={newNote.content}
                    >


                    </textarea>
                    {
                        errors.content && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.content}</span>
                    }
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label>Tags</label>
                        <input
                            type="text"
                            placeholder="Add tags (comma separated)"
                            onChange={handleInput}
                            name="tags"
                            value={newNote.tags}
                        />
                        {
                            errors.tags && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.tags}</span>
                        }
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={() => closeEditor()}>Cancel</button>
                    <button className="btn-primary" onClick={handleSubmit}>Save Note</button>
                </div>
            </div>
        </div>
    );
}