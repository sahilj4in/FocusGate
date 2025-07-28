import { useState } from "react";
import API from "../api/api";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!username || !email || !password) {
            return alert("All fields are required");
        }

        try {
            const response = await API.post(`/users/register`, {
                name: username,
                email,
                password,
            });

            const data = response.data;
            if (data.token) {
                alert("New user registered");
                localStorage.setItem("token", "Bearer "+data.token);
                window.location.href = "/dashboard";
            }
        } catch (err) {
            console.error("Registration Error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="login-block">
            <h2 className="login-title">Register</h2>

            <input
                type="text"
                className="login-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br /><br />

            <input
                type="text"
                className="login-input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
                type="password"
                className="login-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            <button onClick={handleRegister}>Submit</button>
        </div>
    );
}

export default Register;
