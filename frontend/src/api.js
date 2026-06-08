const API = import.meta.env.VITE_API_URL;

export async function registerUser(username, email, password) {
  const res = await fetch(`${API}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getNotes(token) {
  const res = await fetch(`${API}/notes/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createNote(token, title, content) {
  const res = await fetch(`${API}/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function updateNote(token, id, title, content) {
  const res = await fetch(`${API}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function deleteNote(token, id) {
  const res = await fetch(`${API}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
