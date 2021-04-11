import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/login-form/login-form';
import RegisterForm from '../../components/register-form/register-form';
import { AuthService } from '../../services/auth';
import css from './login.module.css';

/**
 * Home Page component for displaying user's todolist data
 * and importing relevant filters, toggles, etc..
 *
 * @param {Object} props
 * @return {JSX.Element}
 * @constructor
 */
export const LoginPage = (props) => {
    const [loginBox, setLoginBox] = React.useState(true)
    const [registerBox, setRegisterBox] = React.useState(false);

    /**
     * callback for authentication
     *
     * @param email
     * @param password
     * @return {Promise<void>}
     */
    const handleLogin = async (email, password) => {
        try {
            // loginUser(dispatch, { email, password })
            const token = await AuthService.login(email, password)

            if (token) {
                props.history.push('/home')
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * callback handler for registration
     *
     * @param email
     * @param password
     * @return {Promise<void>}
     */
    const handleRegister = async (email, password) => {
        try {
            // loginUser(dispatch, { email, password })
            const response = await AuthService.register(email, password)

            if (response) {
                await handleLogin(email, password);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showLoginBox = () => {
        setLoginBox(true);
        setRegisterBox(false);
    }

    const showRegisterBox = () => {
        setLoginBox(false);
        setRegisterBox(true);
    }

    return (
        <>
            <section className={`login-page-controller`}>
                <div
                    className={'controller ' + (loginBox
                        ? 'selected-controller'
                        : '')}
                    onClick={showLoginBox}
                >
                    Login
                </div>
                <div
                    className={'controller ' + (registerBox
                        ? 'selected-controller'
                        : '')}
                    onClick={showRegisterBox}
                >
                    Register
                </div>
            </section>

            <section className={'login-page-container'}>
                {loginBox && <LoginForm handleLogin={handleLogin} />}
                {registerBox && <RegisterForm handleRegister={handleRegister} />}
            </section>
        </>
    );
}

LoginPage.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.any,
};

export default LoginPage;
