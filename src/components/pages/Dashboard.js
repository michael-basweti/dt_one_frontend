import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    
    return (
        <div>
            <h1>dashboard</h1>
            
        </div>
    )
}

export default Dashboard
