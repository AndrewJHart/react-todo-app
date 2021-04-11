import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple Login form - no validation
 *
 * @param {Object} props
 * @return {JSX.Element}
 * @constructor
 */
export const LoginForm = (props) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleLogin = e => {
        e.preventDefault();

        if (email.trim() !== '' && password.trim() !== '') {
            props.handleLogin(email, password);
        }
    }

    return (
        <div className='inner-container'>
            <div className='header'>
                Login
            </div>

            <div className='box'>

                <div className='input-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='login-input'
                        placeholder='Username'
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

                <button
                    type='button'
                    className='login-btn'
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
}

export default LoginForm;
