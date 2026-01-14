// EmptyNotes.jsx
import './EmptyNotes.css';

export const EmptyNotes = ({addNote}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">📝</div>
      
      <h1>Welcome To Mimi</h1>
      <h2>No notes yet</h2>
      <p>Start capturing your thoughts, ideas, and important information</p>
      
      <button className="create-first-btn" onClick={addNote}>
        + Create your first note
      </button>
    </div>
  );
};