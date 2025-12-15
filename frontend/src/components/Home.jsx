export const Home = () => {
    return (
        <div className="app-container" id="mainApp">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1>📝 Notes</h1>
                </div>
                <div className="user-info">
                    <div className="user-avatar">JD</div>
                    <div className="user-details">
                        <div className="user-name">John Doe</div>
                        <div className="user-email">john@example.com</div>
                    </div>
                </div>
                <button className="new-note-btn" >+ New Note</button>
                <nav className="sidebar-menu">
                    <div className="menu-item active">📋 All Notes</div>
                    <div className="menu-item">⭐ Favorites</div>
                    <div className="menu-item">📌 Pinned</div>
                    <div className="menu-item">🗑️ Trash</div>
                    <div className="menu-item">🏷️ Tags</div>
                    <div className="menu-item">📊 Archive</div>
                </nav>
                <button className="logout-btn" >Logout</button>
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
                        <div className="note-card" >
                            <div className="note-header">
                                <div>
                                    <div className="note-title">Meeting Notes</div>
                                    <div className="note-date">2 hours ago</div>
                                </div>
                                <div className="note-actions">
                                    <button className="action-btn">⭐</button>
                                    <button className="action-btn">📌</button>
                                </div>
                            </div>
                            <div className="note-content">
                                Discussed project timeline and deliverables. Team members assigned their tasks. Next meeting scheduled for Friday.
                            </div>
                            <div className="note-tags">
                                <span className="tag">Work</span>
                                <span className="tag">Important</span>
                            </div>
                        </div>

                        <div className="note-card" >
                            <div className="note-header">
                                <div>
                                    <div className="note-title">Shopping List</div>
                                    <div className="note-date">1 day ago</div>
                                </div>
                                <div className="note-actions">
                                    <button className="action-btn">⭐</button>
                                    <button className="action-btn">📌</button>
                                </div>
                            </div>
                            <div className="note-content">
                                Milk, Eggs, Bread, Butter, Coffee, Fresh vegetables, Fruits
                            </div>
                            <div className="note-tags">
                                <span className="tag">Personal</span>
                            </div>
                        </div>

                        <div className="note-card" >
                            <div className="note-header">
                                <div>
                                    <div className="note-title">Project Ideas</div>
                                    <div className="note-date">3 days ago</div>
                                </div>
                                <div className="note-actions">
                                    <button className="action-btn">⭐</button>
                                    <button className="action-btn">📌</button>
                                </div>
                            </div>
                            <div className="note-content">
                                1. Build a note-taking app
                                2. Create a task manager
                                3. Develop a weather app
                                4. Make a recipe organizer
                            </div>
                            <div className="note-tags">
                                <span className="tag">Ideas</span>
                                <span className="tag">Dev</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}