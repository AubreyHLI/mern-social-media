import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/appContext'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../Layout/Header';
import NotificationCard from './NotificationCard';
import PersonIcon from '@mui/icons-material/Person';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

const NotificationsFeed = () => {
    const { notifications, setNotifications } = useContext(AppContext);
    const { _id, newNotifications} = useSelector(state => state.auth.user);
    const [active, setActive] = useState(0);

    useEffect(() => {
        fetchNewNotifications();
    }, [_id, newNotifications])
 
    const fetchNewNotifications = async () => {
        console.log('fetchNewNotifications');
        try {
            const response = await axios.get(`user/newNotifications`);
            if(response.data.success) {
                const sortedNotifications = response.data.newNotifications.reverse();
                setNotifications([...sortedNotifications]);
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
    }

    return (
        <div className='mainWrapper'>
            <Header withBackward={true} heading='消息通知' subHeading={notifications?.length} subText='条新消息'>
                <div className='grid w-full grid-cols-2 h-[30px] cursor-pointer justify-items-center borderBottom'>
                    <div onClick={() => setActive(1)} className={`w-full text-center flex items-end justify-center `}>
                        <span className={`w-[60%] min-w-[140px] normalFlex border-b-2 pb-[2px] transition-colors ease-in ${active === 1 ? 'border-b-mernBlue' : 'border-b-transparent'}`}>
                            <PersonIcon className='!text-[19px] !mb-[-1px]'/>新增关注
                        </span>
                    </div>
                    <div onClick={() => setActive(2)} className='w-full text-center flex items-end justify-center'>
                        <span className={`w-[60%] min-w-[140px] normalFlex border-b-2 pb-[2px] transition-colors ease-in ${active === 2 ? 'border-b-mernBlue' : 'border-b-transparent'}`}>
                            <SmsOutlinedIcon className='!text-[16px] !mb-[-2px] !mr-[2px]'/>评论和赞
                        </span>
                    </div>
                </div>
            </Header>

            <button onClick={() => console.log(notifications)}>click me</button>
    
            <div className='w-full'>
                { notifications?.length > 0 
                ? notifications?.map(notif => <NotificationCard key={notif?._id} notification={notif}/>)
                : <div className='normalFlex py-[100px]'>无新消息</div>
                }
            </div>
        </div>
    )
}

export default NotificationsFeed