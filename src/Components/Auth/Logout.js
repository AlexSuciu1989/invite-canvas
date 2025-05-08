import React, { useEffect } from "react";

const Logout = ({ onLogout }) => {
    useEffect(() => {
        // ✅ Remove user_id and username cookies
        document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        
        // ✅ Trigger logout state update
        if (onLogout) onLogout();
    }, [onLogout]);

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow text-center">
                <h2>Logged Out Successfully</h2>
                <p>You have been logged out.</p>
                <a href="/" className="btn btn-primary">Go to Home</a>
            </div>
        </div>
    );
};

export default Logout;
