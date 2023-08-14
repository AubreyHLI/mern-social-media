import React from 'react'
import NotificationCard from './NotificationCard'

const NotificationSection = ({title, notifs}) => {
    return (
        <div>
            <h2 className='text-[18px] font-[500] text-mernFont px-[16px] pt-[12px] pb-[8px]'>{title}</h2>
            <div>
                { notifs && notifs.length > 0 
                && notifs?.map(notif => <NotificationCard key={notif?._id} notification={notif} />)} 
            </div>
        </div>
    )
}

export default NotificationSection