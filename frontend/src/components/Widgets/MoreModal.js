import React, { useContext } from 'react'
import { AppContext } from '../../context/appContext';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../redux/features/authSlice';
import { resetColloctedPosts } from '../../redux/features/postsSlice';
import ModalLayout from '../Layout/ModalLayout'
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


const MoreModal = ({setOpen}) => {
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
        <ModalLayout optionStyle='!mt-auto !mb-0 !h-fit !rounded-t-[16px] '>
            <div className='w-full flex items-center gap-[20px] pt-[10px] pb-[6px]'>
                <div onClick={() => setOpen(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex cursor-pointer transition-colors duration-200 ease-out hover:bg-mernBorder'>
                    <CloseIcon fontSize='medium'/>
                </div>
            </div>

            <div className='pb-[50px]'>
                <div className='h-fit flex items-center gap-[12px] text-[18px] px-[5px] cursor-pointer' onClick={() => console.log('message')}>
                    <MailOutlineIcon className='!text-[26px]'/>
                    <span className='borderBottom h-[60px] w-full flex items-center'>私信</span>
                </div>
                <div className='h-fit flex items-center gap-[12px] text-[18px] px-[5px] cursor-pointer' onClick={() => navigate('/bookmarks')}>
                    <BookmarkBorderIcon className='!text-[26px]'/>
                    <span className='borderBottom h-[60px] w-full flex items-center'>已收藏</span>
                </div>
                <div className='h-fit flex items-center gap-[12px] text-[18px] px-[5px] cursor-pointer' onClick={handleLogout} >
                    <LogoutIcon className='!text-[26px]'/>
                    <span className='borderBottom h-[60px] w-full flex items-center'>退出登录</span>
                </div>
                <div className='h-fit flex items-center gap-[12px] text-[18px] px-[5px] cursor-pointer' onClick={() => console.log('settings')}>
                    <SettingsIcon className='!text-[26px]'/>
                    <span className='borderBottom h-[60px] w-full flex items-center'>设置</span>
                </div>
            </div>

        </ModalLayout>
    )
}

export default MoreModal