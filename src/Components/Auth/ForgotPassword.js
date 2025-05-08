import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        // ✅ Basic validation before sending request
        if (!email.includes("@") || email.trim() === "") {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true); // ✅ Set loading state while sending request

        try {
            const response = await fetch("https://alex-suciu.homebuddy.ro/cutiuta-cu-de-toate/php/forgot-password.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setMessage(data.message);
                setEmail(""); // ✅ Clear input field after successful request
            }
        } catch (error) {
            setError("Error occurred while sending password reset request.");
        } finally {
            setLoading(false); // ✅ Remove loading state after completion
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="text-center">Forgot Password</h2>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email-recovery" className="form-label">Enter your email</label>
                        <input
                            type="email"
                            id="email-recovery"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
