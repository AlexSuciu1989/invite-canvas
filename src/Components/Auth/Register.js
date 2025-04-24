import React, { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous error
        setSuccess(""); // Clear previous success message
    
        try {
            const response = await fetch("https://alex-suciu.homebuddy.ro/cutiuta-cu-de-toate/php/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (data.error) {  // If PHP returns an error
                setError(data.error);
            } else if (data.message) { // If PHP returns success
                setSuccess(data.message);
                setFormData({ username: "", email: "", password: "", confirmPassword: "" });
            } else {
                setError("Unexpected response from server.");
            }
        } catch (error) {
            setError("Error occurred during registration.");
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="text-center">Register</h2>

                {/* Success message */}
                {success && <div className="alert alert-success">{success}</div>}

                {/* Error message */}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
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
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
