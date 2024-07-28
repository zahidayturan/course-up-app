import React from 'react';
import Header from './components/Header';
import '../../assets/css/Main.module.css';
import '../../assets/css/Text.module.css';
import {useNavigate} from "react-router-dom";

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

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
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
