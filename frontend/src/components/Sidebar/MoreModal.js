import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../redux/features/authSlice';
import { resetColloctedPosts } from '../../redux/features/postsSlice';
import { AppContext } from '../../context/appContext';

const MoreModal = () => {
    const { socket, resetContext } = useContext(AppContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setLogout());
        dispatch(resetColloctedPosts());
        resetContext();
        socket.emit('remove-conUser');
        navigate('/login');
    }

    return (
        <div className='absolute bottom-[75px] left-[10px] z-[101] bg-white rounded-[16px] shadow-double
            after:content-[""] after:absolute after:top-[97%] after:left-[25px] after:h-[8px] after:w-[8px] after:bg-white after:-rotate-45 after:shadow-small'>
            <div className='w-[56px] 600px:w-[135px] flex flex-col py-[12px] px-0 text-[16px] font-[500] 1200px:w-[220px] select-none'>
                <span onClick={() => console.log('settings')} className='py-[12px] px-[16px] transition-colors ease-out duration-200 cursor-pointer hover:bg-[#212e3b12]'>
                    <SettingsIcon className='!mr-[10px]'/>
                    <span className='hidden 600px:inline-block'>设置</span> 
                </span>
                <span onClick={handleLogout} className='py-[12px] px-[16px] transition-colors ease-out duration-200 cursor-pointer hover:bg-[#212e3b12]'>
                    <LogoutIcon className='!mr-[10px]'/>
                    <span className='hidden 600px:inline-block'>退出登陆</span> 
                </span>
            </div>
        </div>
    )
}

export default MoreModal