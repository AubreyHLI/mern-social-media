import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import logo from '../../assets/mern-social-media-high-resolution-logo-color-on-transparent-background.png';
import logoSm from '../../assets/logo-sm.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import SidebarOption from '../Sidebar/SidebarOption';
import NewPostModal from '../Sidebar/NewPostModal';
import MoreModal from '../Sidebar/MoreModal';
import { setUserNotifs } from '../../redux/features/authSlice';


const Sidebar = ({active}) => {
    const { socket } = useContext(AppContext);
    const [openMore, setOpenMore] = useState(false);
    const [openNewPost, setOpenNewPost] = useState(false);
    const user = useSelector(state => state.auth.user);
    const menuRef = useRef();
    const dispatch = useDispatch();


    useEffect(() => {
        if(openNewPost) {
            document.body.style.overflow = 'hidden';  // lock the scroll of home page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of home page
        }
    }, [openNewPost]);


    socket.off('new-notification').on('new-notification', (payload) => {
		dispatch(setUserNotifs(payload));
    });

    const fetchNewNotifications = async () => {
        
    }


  return (
    <>
    <div className='w-full p-[4px] flex flex-col items-center bg-[rgba(246,248,248)] backdrop-blur-[10px] 
        480px:bg-[#fff] 480px:mt-[20px] 480px:backdrop-blur-none 480px:h-full 480px:min-h-[580px] 480px:w-[80px] 480px:py-[12px] 480px:px-[8px]
        600px:w-[150px] 1200px:w-[270px] 1200px:items-start'>
        
        <Link to='/'>
            <img className='hidden 480px:block 1200px:hidden w-[50px]' src={logoSm} alt=''/>
            <img className='hidden 1200px:block 1200px:px-[10px]' src={logo} alt=''/>
        </Link>
        
        <nav className='w-full flex justify-around 480px:flex-col 480px:gap-[2px] 480px:items-center 480px:mt-[20px] 600px:items-start 1200px:w-[220px] 1200px:ml-[12px] 1200px:mr-[20px]'>
            <SidebarOption label='首页' Icon={HomeOutlinedIcon} isActive={active === 1} path='/' />
            <SidebarOption label='探索' Icon={SearchOutlinedIcon} isActive={active === 2} path='/Explore' />
            <SidebarOption label='通知' Icon={NotificationsNoneIcon} isActive={active === 3} isHidden={true} path='/notifications' notif={user?.newNotifications?.length}/>
            <button onClick={() => setOpenNewPost(true)} className='btn-post 480px:!hidden'>
                <AddIcon />
                <span className='hidden 600px:block'>发布动态</span>
            </button>
            <SidebarOption label='私信' Icon={MailOutlineIcon} isActive={active === 4} path='#'/>
            <SidebarOption label='收藏夹' Icon={BookmarkBorderIcon} isActive={active === 5} isHidden={true} path='/bookmarks'/>
            <SidebarOption label='我' avatar={user.imageUrl?.url} isActive={active === 6} path={`/profile/${user._id}`}/>
        </nav>
    
        <button onClick={() => setOpenNewPost(true)} className='btn-post !hidden 480px:!flex 480px:!mt-[25px] 480px:!mx-auto 1200px:!ml-[10px] '>
            <AddIcon fontSize='medium'/>
            <span className='hidden 1200px:block'>发布动态</span>
        </button>
        

        <div ref={menuRef} className='hidden cursor-pointer 480px:block 480px:relative 480px:mt-auto 480px:mb-8px 600px:w-full 1200px:w-[220px] 1200px:ml-[12px] 1200px:mr-[20px]'>
            <div onClick={() => setOpenMore(prev => !prev)} className='w-fit p-[8px] transition-all ease-out rounded-[30px] mb-[2px] hover:bg-[#212e3b12] 480px:p-[12px] 480px:w-full'>
                <div className="flex items-center justify-start">
                    <MoreHorizIcon className="icon"/>
                    <h2 className='ml-[12px] text-[18px] font-[500] hidden transition-all duration-200 ease-out 600px:inline'>
                        更多
                    </h2>
                </div>
            </div>
        </div>
    </div>

    {openMore && <MoreModal />}

    {openNewPost && <NewPostModal setOpen={setOpenNewPost}/>}
    </>
  )
}

export default Sidebar