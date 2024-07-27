import React from 'react';
import Header from './components/Header';
import '../../assets/css/Main.css';
import '../../assets/css/Text.css';

const Home = () => {
    const [user, setUser] = React.useState(null);

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
        window.location.href = '/login';
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
