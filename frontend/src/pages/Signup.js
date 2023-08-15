import React, { useEffect } from 'react';
import logo from "../assets/mern-social-media-high-resolution-logo-color-on-transparent-background.png";
import { Link } from 'react-router-dom';
import SignupForm from '../components/UserAuth/SignupForm';


const Signup = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return (
        <div className='normalFlex flex-col w-full h-full min-w-[350px] bg-[white] overflow-scroll'>
            <div className="my-[30px] mx-auto">
                <Link to='/'><img className='w-[300px]' src={logo} alt=''/></Link>
            </div>
            <SignupForm />
        </div>
    )
}

export default Signup;