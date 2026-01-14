export const NonEmptyNote = ({notes, handleDeleteNote}) => {


    return (
        <div className="notes-container">
            <div className="notes-grid">

                {
                    notes.map((note) => {
                        return (
                            <div className="note-card" key={note._id}>
                                <div className="note-header">
                                    <div>
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

            </div>
        </div>
    )
}