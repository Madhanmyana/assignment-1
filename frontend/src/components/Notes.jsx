import { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../api";

function Notes({ token, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  // for editing
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const data = await getNotes(token);
    if (Array.isArray(data)) {
      setNotes(data);
    } else {
      setNotes([]);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    setMsg("");

    const data = await createNote(token, title, content);

    if (data.detail) {
      // 422 returns detail as an array of validation errors
      if (Array.isArray(data.detail)) {
        setError(data.detail.map((d) => d.msg).join(", "));
      } else {
        setError(data.detail);
      }
    } else {
      setMsg("Note created!");
      setTitle("");
      setContent("");
      fetchNotes();
    }
  }

  async function handleDelete(id) {
    await deleteNote(token, id);
    fetchNotes();
  }

  function startEdit(note) {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await updateNote(token, editId, editTitle, editContent);
    setEditId(null);
    setEditTitle("");
    setEditContent("");
    fetchNotes();
  }

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <span>Notes App</span>
        <div>
          <button className="outline" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="page">

        {/* Create Note Form */}
        <div className="note-form">
          <h3>Add New Note</h3>
          {error && <p className="error">{String(error)}</p>}
          {msg && <p className="success">{msg}</p>}
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Title (min 3 chars)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              rows="3"
              placeholder="Content (min 10 chars)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button type="submit">Add Note</button>
          </form>
        </div>

        {/* Notes List */}
        <h2>My Notes</h2>

        {notes.length === 0 && <p style={{ fontSize: "13px", color: "#555" }}>No notes yet.</p>}

        {notes.map((note) => (
          <div key={note.id} className="note-card">

            {/* Edit mode */}
            {editId === note.id ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
                <textarea
                  rows="3"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  required
                />
                <div className="note-actions">
                  <button type="submit">Save</button>
                  <button type="button" className="outline" onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <div className="note-actions">
                  <button className="outline" onClick={() => startEdit(note)}>Edit</button>
                  <button onClick={() => handleDelete(note.id)}>Delete</button>
                </div>
              </>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Notes;
