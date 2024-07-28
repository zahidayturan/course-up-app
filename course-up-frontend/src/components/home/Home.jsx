import React from 'react';
import Header from './components/Header';
import '../../assets/css/Main.module.css';
import '../../assets/css/Text.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Endpoints from "../../constants/Endpoints";

const Home = () => {
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();


    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            console.log('No user data found in localStorage');
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get(Endpoints.LOGOUT);
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <div>
            <Header />
            <br/>
            {user ? (
                <div>
                    <p>Welcome, {user.name}!</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Home;
