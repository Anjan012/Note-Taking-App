import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteEditor } from "./NoteEditor";
import { DeletePopUp } from "./pop ups/DeletePop";
import { EmptyNotes } from "./empty note/EmptyNotes";
import { NonEmptyNote } from "./non empty notes/NonEmptyNotes";
import axios from "axios";


export const Home = () => {

    const jwtToken = localStorage.getItem("jwt");
    const userData = JSON.parse(localStorage.getItem("userData"));

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState({
        status: false,
        note_id: null
    });


    useEffect(() => {
        const getNotes = async () => {
            const response = await axios.get(`http://localhost:8000/api/notes/get-notes?userId=${userData.id}`);
            setNotes(response.data);
        }

        getNotes();

    }, [isOpenModal, isDeleteOpen]);


    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        window.location.href = "/login"; // or use navigate
    };



    const navigate = useNavigate();

    useEffect(() => {
        if (!jwtToken && !userData) {
            navigate("/login");
            return;
        }

    }, []);

    const addNote = () => {
        setIsOpenModal(true);
    }



    async function handleDeleteNote(noteId) {
        try {
            setIsConfirmDelete({
                status: true,
                note_id: noteId
            })
            setIsDeleteOpen(true);
        } catch (error) {
            console.log(error);
        }

    }

    const deleteNoteStatus = isConfirmDelete.status;
    const deleteNoteId = isConfirmDelete.note_id;

    return (
        <>
            <DeletePopUp
                isDeleteOpen={isDeleteOpen}
                setIsDeleteOpen={setIsDeleteOpen}
                deleteNoteStatus={deleteNoteStatus}
                deleteNoteId={deleteNoteId}
            />
            <NoteEditor
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                userData={userData}
            />
            <div className="app-container" id="mainApp">
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h1 className="app-name">📝 <span>Mi</span>mi </h1>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">
                            {
                                userData.name.charAt(0).toUpperCase()
                            }
                        </div>
                        <div className="user-details">
                            <div className="user-name">
                                {
                                    userData.name
                                }
                            </div>
                            <div className="user-email">
                                {
                                    userData.email
                                }
                            </div>
                        </div>
                    </div>
                    <button className="new-note-btn" onClick={addNote} >+ New Note</button>
                    <nav className="sidebar-menu">
                        <div className="menu-item active">📋 All Notes</div>
                        <div className="menu-item">⭐ Favorites</div>
                        <div className="menu-item">📌 Pinned</div>
                        <div className="menu-item">🗑️ Trash</div>
                        <div className="menu-item">🏷️ Tags</div>
                        <div className="menu-item">📊 Archive</div>
                    </nav>
                    <button className="logout-btn" onClick={handleLogout} >Logout</button>
                </aside>

                <main className="main-content">
                    <div className="top-bar">
                        <div className="search-box">
                            <input type="text" placeholder="Search notes..." />
                        </div>
                        <div className="view-toggle">
                            <button className="view-btn active">Grid</button>
                            <button className="view-btn">List</button>
                        </div>
                    </div>


                    {
                        notes[0] ? (
                            <NonEmptyNote notes={notes} handleDeleteNote={handleDeleteNote} />
                        )
                            :
                            <EmptyNotes addNote={addNote} />

                    }
                </main>
            </div>
        </>
    )
}