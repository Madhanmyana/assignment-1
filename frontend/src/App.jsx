import { useState } from "react";
import "./index.css";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Notes from "./components/Notes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [page, setPage] = useState("login");

  function handleLogin(newToken) {
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setPage("login");
  }

  if (token) {
    return <Notes token={token} onLogout={handleLogout} />;
  }

  if (page === "register") {
    return <Register onSwitch={() => setPage("login")} />;
  }

  return <Login onSwitch={() => setPage("register")} onLogin={handleLogin} />;
}

export default App;
