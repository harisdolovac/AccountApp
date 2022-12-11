import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./SignIn.css"

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate form inputs and submit form data
    };

    return (
        <div className='SignUpWrapper' >
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit">Sign In</button>
            </form>
            <Link to="/signup">
                <p>  You are not registered?Click here to register</p>
            </Link>
        </div>
    );
}


export default SignIn