import React, { useState, useEffect } from "react";
import ForgotPassword from "./ForgotPassword";
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [username, setUsername] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    useEffect(() => {
        // ✅ Read user ID cookie
        const getCookie = (name) => {
            const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
            return match ? match[2] : "";
        };

        const storedUserId = getCookie("user_id");
        if (storedUserId) {
            console.log("User ID from cookie:", storedUserId); // Debugging
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(!showForgotPassword); // Toggle visibility of Forgot Password component   
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("https://alex-suciu.homebuddy.ro/cutiuta-cu-de-toate/php/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setSuccess(`Welcome, ${data.username}!`);
                setUsername(data.username); // Update state

                // ✅ Store user ID in a JavaScript cookie manually
                document.cookie = `user_id=${data.user_id}; path=/; max-age=${7 * 24 * 60 * 60};`; 
                document.cookie = `username=${data.username}; path=/; max-age=${7 * 24 * 60 * 60};`; // Store username in cookie
                window.location.reload();
            }
        } catch (error) {
            setError("Error occurred during login.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="text-center">Login</h2>

                {username && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="password" className="form-label">Parola</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-link mb-2 mt-0 d-flex" onClick={handleForgotPasswordClick}>Am uitat parola</button>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    

                </form>
            </div>
            
            {showForgotPassword && <ForgotPassword />}
        </div>
    );
};

export default Login;
