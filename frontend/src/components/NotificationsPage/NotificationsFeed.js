import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/appContext'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Layout/Header';
import NotificationCard from './NotificationCard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
// import { setUserNotifs } from '../../redux/features/authSlice';

const NotificationsFeed = () => {
    const { notifications, setNotifications } = useContext(AppContext);
    const { _id, newNotifyCount} = useSelector(state => state.auth.user);
    const [active, setActive] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchNewNotifications();
        // dispatch(setUserNotifs({
        //     followType: [],
        //     commentOrLikeType: []
        // }));
    }, [_id])
 
    const fetchNewNotifications = async () => {
        try {
            const response = await axios.get(`user/newNotifications`);
            if(response.data.success) {
                setNotifications(response.data.newNotifications);
            }
        } catch(error) {
            console.error('Error fetching notifications:', error);
        }
    }

    return (
        <div className='mainWrapper'>
            <Header withBackward={true} heading='消息通知' subHeading={newNotifyCount} subText='条新消息'>
                <div className='grid w-full grid-cols-2 h-[40px] cursor-pointer justify-items-center borderBottom'>
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
            <div className='w-full mt-[4px]'>
                { notifications?.commentOrLikeType?.length > 0 
                ? notifications?.commentOrLikeType?.map(notif => <NotificationCard key={notif?._id} notification={notif}/>)
                : <div className='normalFlex py-[100px]'>无新消息</div>
                }
            </div>
            }

            {active === 2 &&
            <div className='w-full mt-[4px]'>
                { notifications?.followType?.length > 0 
                ? notifications?.followType?.map(notif => <NotificationCard key={notif?._id} notification={notif}/>)
                : <div className='normalFlex py-[100px]'>无新消息</div>
                }
            </div>
            }

            <button onClick={() => console.log(notifications)}>click me</button>
        </div>
    )
}

export default NotificationsFeed