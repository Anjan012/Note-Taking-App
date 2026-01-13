
import axios from "axios";

export const DeletePopUp = ({ isDeleteOpen, setIsDeleteOpen, deleteNoteStatus, deleteNoteId }) => {

    const handleDeleteNote = async () => {

        try {

            if (deleteNoteStatus && deleteNoteId) {
                const response = await axios.delete(`http://localhost:8000/api/notes/deleteNote/${deleteNoteId}`);
                if (response.status === 200) {
                    console.log("note deleted");
                }
            }

            setIsDeleteOpen(false);

        } catch (error) {
            console.log("Error while deleting note: ", error);
        }

    }


    return (
        <div id="deleteModal" className="deletemodal" style={{ display: isDeleteOpen ? "flex" : "none" }}>
            <div className="deletemodal-content">
                <h3>Delete Note</h3>
                <p>Are you sure you want to delete this note? <br />
                    This action cannot be undone.</p>

                <div className="modal-buttons">
                    <button id="cancelBtn" className="btn cancel" onClick={() => { setIsDeleteOpen(false) }}>Cancel</button>
                    <button id="confirmBtn" className="btn delete" onClick={handleDeleteNote}>Yes, Delete</button>
                </div>
            </div>
        </div>
    )
}
