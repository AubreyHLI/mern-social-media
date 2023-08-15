import React, { useEffect } from 'react';
import logo from "../assets/mern-social-media-high-resolution-logo-color-on-transparent-background.png";
import { Link } from 'react-router-dom';
import LoginForm from '../components/UserAuth/LoginForm';


const Login = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return (
        <div className='normalFlex flex-col w-full h-full min-w-[350px] max-w-[500px] mx-auto bg-[white] overflow-scroll'>
            <div className="my-[30px] mx-auto">
                <Link to='/'><img className='w-[300px]' src={logo} alt=''/></Link>
            </div>
            <LoginForm />
        </div>
    )
}

export default Login;