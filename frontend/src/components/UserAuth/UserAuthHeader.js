import React from 'react'
import logo from "../../assets/mern-social-media-high-resolution-logo-color-on-transparent-background.png";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UserAuthHeader = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const handleClickLogo = () => {
        if(token) navigate('/');
    }

   
    return (
        <div className="my-[30px] mx-auto">
            <div onClick={handleClickLogo} className='cursor-pointer'>
                <img className='w-[300px]' src={logo} alt=''/>
            </div>
        </div>
    )
}

export default UserAuthHeader