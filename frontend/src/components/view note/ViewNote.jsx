
import './ViewNote.css';

export const ViewNote = ({ note, showSelectedNote, setShowSelectedNote }) => {
    if (!note) return null;

    return (
        <div className="note-view-overlay" style={{ display: showSelectedNote ? "flex" : "none" }} onClick={() => { setShowSelectedNote(false) }}>
            <div className="note-view-card" onClick={e => e.stopPropagation()}>

                {/* Cute little header with close button */}
                <div className="note-view-header">
                    <div className="cute-icon">✨</div>
                    <h1 className="note-view-title">{note.title || "Untitled Note"}</h1>
                    <button className="close-btn" onClick={() => { setShowSelectedNote(false) }}>×</button>
                </div>

                {/* Main content area */}
                <div className="note-view-content">
                    <p className="note-text">
                        {note.content || "This note is feeling a bit empty... 💭"}
                    </p>
                </div>

                {/* Tiny footer details */}
                <div className="note-view-footer">
                    <span className="note-date">
                        {new Date(note.createdAt).toLocaleDateString()}
                        {note.updatedAt && ` • Updated ${new Date(note.updatedAt).toLocaleTimeString()}`}
                    </span>
                </div>
            </div>
        </div>
    );
};