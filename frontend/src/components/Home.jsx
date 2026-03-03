import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteEditor } from "./NoteEditor";
import { DeletePopUp } from "./pop ups/DeletePop";
import { EmptyNotes } from "./empty note/EmptyNotes";
import { NonEmptyNote } from "./non empty notes/NonEmptyNotes";
import axios from "axios";

const responsiveStyles = `
  /* ── Sidebar overlay (mobile only) ── */
  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .sidebar-overlay.open {
    display: block;
  }

  /* ── Hamburger button ── */
  .hamburger-btn {
    display: none;
    background: none;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 18px;
    cursor: pointer;
    line-height: 1;
  }

  /* ── Mobile (<= 768px) ── */
  @media (max-width: 768px) {
    .app-container {
      flex-direction: column !important;
    }

    .sidebar {
      position: fixed !important;
      top: 0;
      left: 0;
      bottom: 0;
      width: 260px !important;
      z-index: 100;
      transform: translateX(-100%);
      transition: transform 0.25s ease;
      overflow-y: auto;
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .main-content {
      margin-left: 0 !important;
      width: 100% !important;
    }

    .top-bar {
      flex-wrap: wrap;
      gap: 8px;
    }

    .search-box {
      flex: 1;
      min-width: 140px;
    }

    .search-box input {
      width: 100%;
    }

    .hamburger-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  /* ── Tablet (769px - 1024px) ── */
  @media (min-width: 769px) and (max-width: 1024px) {
    .sidebar {
      width: 200px !important;
      min-width: 200px !important;
    }

    .app-name {
      font-size: 18px !important;
    }

    .main-content {
      padding: 16px !important;
    }

    .search-box input {
      width: 100% !important;
    }
  }

  /* ── Desktop (>1024px) ── */
  @media (min-width: 1025px) {
    .main-content {
      flex: 1;
      overflow-y: auto;
    }
  }

  /* ── Top bar always flex ── */
  .top-bar {
    display: flex;
    align-items: center;
  }
`;

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
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const getNotes = async () => {
            const response = await axios.get(`https://note-taking-app-backend-yunc.onrender.com/api/notes/get-notes?userId=${userData.id}`);
            setNotes(response.data);
        }
        getNotes();
    }, [isOpenModal, isDeleteOpen]);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        window.location.href = "/login";
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
        setSidebarOpen(false);
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
            <style>{responsiveStyles}</style>

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

            {/* Overlay — closes sidebar when tapping outside on mobile */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
                onClick={() => setSidebarOpen(false)}
            />

            <div className="app-container" id="mainApp">
                <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                    <div className="sidebar-header">
                        <h1 className="app-name">📝 <span>Mi</span>mi </h1>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">
                            {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <div className="user-name">{userData.name}</div>
                            <div className="user-email">{userData.email}</div>
                        </div>
                    </div>
                    <button className="new-note-btn" onClick={addNote}>+ New Note</button>
                    <nav className="sidebar-menu">
                        <div className="menu-item active">📋 All Notes</div>
                        <div className="menu-item">⭐ Favorites</div>
                        <div className="menu-item">📌 Pinned</div>
                        <div className="menu-item">🗑️ Trash</div>
                        <div className="menu-item">🏷️ Tags</div>
                        <div className="menu-item">📊 Archive</div>
                    </nav>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </aside>

                <main className="main-content">
                    <div className="top-bar">
                        {/* Hamburger — only visible on mobile via CSS */}
                        <button
                            className="hamburger-btn"
                            onClick={() => setSidebarOpen(o => !o)}
                            aria-label="Toggle sidebar"
                        >
                            ☰
                        </button>
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
                        ) : (
                            <EmptyNotes addNote={addNote} />
                        )
                    }
                </main>
            </div>
        </>
    )
}