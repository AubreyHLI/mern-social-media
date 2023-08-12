import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileFeed from '../components/ProfilePage/ProfileFeed';

const ProfilePage = () => {
	const {profileId} = useParams();
	const {setActive, setIsUser} = useOutletContext();
	const [open, setOpen] = useState(false);
	const user = useSelector(state => state.auth.user);
	const location = useLocation();

	useEffect(() => {
        if(open) {
            document.body.style.overflow = 'hidden';  // lock the scroll of profile page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of profile page
        }
    }, [open])

	useEffect(() => {
		if(location.pathname === `/profile/${profileId}`) {
			setOpen(false);
		}
	}, [location])


	useEffect(() => {
		window.scrollTo(0,0);
		if(profileId === user._id.toString()){
			setActive(6);
			setIsUser(true);
		} else {
			setActive(0)
			setIsUser(false);
		}
	}, [profileId])

  
	return (
	<>
		<ProfileFeed />
		<div>
			<Outlet context={{setOpen}} />
		</div> 
	</>
	)
}

export default ProfilePage