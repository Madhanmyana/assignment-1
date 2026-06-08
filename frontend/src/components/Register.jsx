import { useState } from "react";
import { registerUser } from "../api";

function Register({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setError("");

    const data = await registerUser(username, email, password);

    if (data.message) {
      setMsg(data.message);
    } else {
      setError(data.detail || "Something went wrong");
    }
  }

  return (
    <div className="page">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}
      {msg && <p className="success">{msg}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p className="switch-link">
        Already have an account?{" "}
        <a onClick={onSwitch}>Login</a>
      </p>
    </div>
  );
}

export default Register;
