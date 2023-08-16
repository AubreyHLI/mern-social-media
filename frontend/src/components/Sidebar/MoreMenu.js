import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../redux/features/authSlice';
import { resetColloctedPosts } from '../../redux/features/postsSlice';
import { AppContext } from '../../context/appContext';

const MoreMenu = () => {
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
        <div className='absolute bottom-[75px] left-[10px] z-[101] w-[56px] 600px:w-[135px] 1200px:w-[200px] 1200px:left-[22px]'>
            <div className='w-full bg-white rounded-[16px] shadow-double after:content-[""] after:absolute after:top-[97%] after:left-[25px] after:h-[8px] after:w-[8px] after:bg-white after:-rotate-45 after:shadow-small'>
                <div className='w-full flex flex-col py-[9px] font-[500] select-none'>
                    <div className='py-[9px] px-[16px] transition-colors ease-out duration-200 cursor-pointer hover:bg-mernBgDark flex items-center gap-[10px]'>
                        <SettingsIcon /><span className='hidden 600px:inline-block'>设置</span> 
                    </div>
                    <span className='py-[8px] px-[16px] transition-colors ease-out duration-200 cursor-pointer hover:bg-mernBgDark flex items-center gap-[10px]' onClick={handleLogout} >
                        <LogoutIcon /><span className='hidden 600px:inline-block'>退出登陆</span> 
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MoreMenu