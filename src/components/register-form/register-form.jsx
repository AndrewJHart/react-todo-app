import React from 'react';
import PropTypes from 'prop-types';

export const RegisterForm = (props) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleRegister = e => {
        e.preventDefault();

        if (email.trim() !== '' && password.trim() !== '') {
            props.handleRegister(email, password);
        }
    }

    const handleChange = e => {
        const { value } = e.target;

        // take email prefix and auto-gen username
        setUsername(value.split('@')[0]);

        setEmail(value);
    }

    return (
        <div className='inner-container'>
            <div className='header'>
                Register
            </div>

            <div className='box'>
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        value={email}
                        onChange={handleChange}
                        type='text'
                        name='email'
                        className='login-input'
                        placeholder='Email'
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name='password'
                        className='login-input'
                        placeholder='Password'
                    />
                </div>

                <label htmlFor='email'>Generated Username</label>
                <input
                    value={username}
                    type='text'
                    name='username'
                    className='username-input'
                    disabled
                    placeholder='Generated Username'
                />

                <button
                    type='button'
                    className='login-btn'
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
}

RegisterForm.propTypes = {
    handleRegister: PropTypes.func.isRequired
}

export default RegisterForm;
