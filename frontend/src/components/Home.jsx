import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteEditor } from "./NoteEditor";
import axios from "axios";

const URL = "http://localhost:8000/api/auth/get-notes";

export const Home = () => {

    const jwtToken = localStorage.getItem("jwt");
    const userData = JSON.parse(localStorage.getItem("userData"));

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const getNotes = async () => {
            const response = await axios.get(`http://localhost:8000/api/auth/get-notes?userId=${userData.id}`);
            setNotes(response.data);
        }

        getNotes();

    }, [isOpenModal]);


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


    return (
        <>
            <NoteEditor
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                userData={userData}
            />
            <div className="app-container" id="mainApp">
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h1>📝 Notes</h1>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">JD</div>
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

                    <div className="notes-container">
                        <div className="notes-grid">



                            {
                                notes.map((note, index) => {
                                    return (
                                        <div className="note-card" key={index}>
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
                </main>
            </div>
        </>
    )
}