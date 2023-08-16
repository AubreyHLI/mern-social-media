import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import NotificationsFeed from '../components/NotificationsPage/NotificationsFeed';

const NotificationPage = () => {
    const {setActive, setIsUser} = useOutletContext();

    useEffect(() => {
        setActive(3);
        window.scrollTo(0,0);
        setIsUser(false);
    }, [])

    return(
        <><NotificationsFeed /></>
    )
}

export default NotificationPage