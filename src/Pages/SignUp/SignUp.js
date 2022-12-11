import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./SignUp.css"

const SignUp = () => {
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

                <button type="submit">Sign Up</button>
            </form>

            <Link to="/signin">
                <p>      Already registered user?Clcik here to login</p>
            </Link>
        </div >
    );
}

export default SignUp