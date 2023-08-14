import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/appContext'
import { useDispatch, useSelector } from 'react-redux';
import { clearUserNotif } from '../../redux/features/authSlice';
import axios from 'axios';
import Header from '../Layout/Header';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import NotificationSection from './NotificationSection';


const NotificationsFeed = () => {
    const { socket, notifications, setNotifications } = useContext(AppContext);
    const user = useSelector(state => state.auth.user);
    const [active, setActive] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        socket.emit('read-newNotifications', user?._id);
        dispatch(clearUserNotif());
    }, [])

    useEffect(() => {
        fetchUserNotifications();
    }, [user._id])
 
    const fetchUserNotifications = async () => {
        try {
            const response = await axios.get(`user/notifications`);
            if(response.data.success) {
                setNotifications(response.data.categorizedNotifs);
            }
        } catch(error) {
            console.error('Error fetching notifications:', error);
        }
    }

    return (
        <div className='mainWrapper'>
            <Header withBackward={true} heading='消息通知' >
                <div className='grid w-full grid-cols-2 h-[40px] mt-[-10px] cursor-pointer justify-items-center borderBottom'>
                    <div onClick={() => setActive(1)} className={`w-full normalFlex ${active === 1 ? 'text-mernBlue' : 'text-mernDarkGray'}`}>
                        <span className={`w-[60%] text-[17px] min-w-[140px] h-full normalFlex border-b-2 pb-[2px] transition-colors ease-in ${active === 1 ? 'border-b-mernBlue' : 'border-b-transparent'}`}>
                            <SmsOutlinedIcon className='!text-[18px] !mb-[-2px] !mr-[2px]'/>评论和赞
                        </span>
                    </div>
                    <div onClick={() => setActive(2)} className={`w-full text-center normalFlex ${active === 2 ? 'text-mernBlue' : 'text-mernDarkGray'}`}>
                        <span className={`w-[60%] text-[17px] min-w-[140px] h-full normalFlex border-b-2 pb-[2px] transition-colors ease-in ${active === 2 ? 'border-b-mernBlue' : 'border-b-transparent'}`}>
                            <PersonOutlineIcon className='!text-[21px] !mb-[-1px]'/>新增关注
                        </span>
                    </div>
                </div>
            </Header>

            {active === 1 &&
                <div className='w-full'>
                { notifications?.commentOrLikeType?.newNotifs?.length > 0 && 
                <NotificationSection title='最新' notifs={notifications?.commentOrLikeType?.newNotifs} />
                }
                <NotificationSection title='近7天' notifs={notifications?.commentOrLikeType?.sevenDays} />
                <NotificationSection title='近30天' notifs={notifications?.commentOrLikeType?.thirtyDays} />
            </div>
            }

            {active === 2 &&
            <div className='w-full'>
                { notifications?.followType?.newNotifs?.length > 0 && 
                <NotificationSection title='最新' notifs={notifications?.followType?.newNotifs} />
                }
                <NotificationSection title='近7天' notifs={notifications?.followType?.sevenDays} />
                <NotificationSection title='近30天' notifs={notifications?.followType?.thirtyDays} />
            </div>
            }

        </div>
    )
}

export default NotificationsFeed