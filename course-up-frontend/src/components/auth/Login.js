import axios from 'axios';
import Endpoints from '../../constants/Endpoints';
import '../../assets/css/Login.css';
import {useState} from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(Endpoints.LOGIN, { email, password });

            // Fetch user details only if necessary
            const userResponse = await axios.get(`${Endpoints.USER_EMAIL}/${email}`);
            const user = userResponse.data;
            localStorage.setItem('user', JSON.stringify(user));
            console.log('Login successful', response.data);
            window.location.href = '/home';
        } catch (error) {
            setLoginError('Invalid email or password: ' + error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {loginError && <p className="error">{loginError}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
