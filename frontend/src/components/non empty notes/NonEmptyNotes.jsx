import { useState } from "react";
import { ViewNote } from "../view note/ViewNote";
export const NonEmptyNote = ({notes, handleDeleteNote}) => {

    const [showSelectedNote, setShowSelectedNote] = useState(false);
    const [note, setNote] = useState("");


    return (
        <div className="notes-container">
            <div className="notes-grid">
                
                {
                    notes.map((note) => {
                        return (
                            <div className="note-card" key={note._id} >
                                <div className="note-header">
                                    <div onClick={() => {setShowSelectedNote(true); setNote(note)}}>
                                        <div className="note-title">
                                            {
                                                note.title
                                            }
                                        </div>
                                        <div className="note-date">
                                            {new Date(note.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="note-actions">
                                        <button className="action-btn">⭐</button>
                                        <button className="action-btn">📌</button>
                                        <button className="action-button" onClick={() => handleDeleteNote(note._id)}>🗑️</button>
                                    </div>
                                </div>
                                <div className="note-content">
                                    {note.content}
                                </div>
                                <div className="note-tags">
                                    <span className="tag">
                                        {
                                            note.tags.map(tag => `${tag} `)
                                        }
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    showSelectedNote && (
                        <ViewNote 
                            note={note}
                            showSelectedNote={showSelectedNote}
                            setShowSelectedNote={setShowSelectedNote}
                        /> 
                    )
                }

            </div>
        </div>
    )
}