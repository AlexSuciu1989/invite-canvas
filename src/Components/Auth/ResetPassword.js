import React, { useState, useEffect } from "react";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        // ✅ Extract token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const resetToken = urlParams.get("token");
        if (!resetToken) {
            setError("Invalid reset link.");
        } else {
            setToken(resetToken);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("https://alex-suciu.homebuddy.ro/cutiuta-cu-de-toate/php/reset-password.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error); 
            } else {
                setMessage("Password reset successfully! You can now log in."); 
                window.location.href = "http://localhost:3000/";
            }
        } catch (error) {
            setError("Error occurred while resetting password.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="text-center">Reset Password</h2>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
