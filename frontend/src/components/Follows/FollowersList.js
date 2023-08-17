import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FollowCard from './FollowCard';
import { useSelector } from 'react-redux';
import FollowerCard from './FollowerCard';
import { toast } from 'react-toastify';

const FollowersList = ({setProfileName}) => {
	const {profileId} = useParams();
    const [followers, setFollowers] = useState([]);
    const user = useSelector(state => state.auth.user);

    const getFollowers = async () => {
        try{
            const response = await axios.get(`user/${profileId}/followers`);
            setFollowers([...response.data.followers]);
            setProfileName(response.data.profilename);
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchFollowers-error' });
        }
    }

    useEffect(() => {
        getFollowers();
    }, [])


    return (
        <div>
            {profileId === user?._id  && followers?.length > 0 && 
            followers?.map(f => <FollowerCard key={f?._id} profile={f} />) }

            {profileId !== user?._id  && followers?.length > 0 && 
            followers?.map(f => <FollowCard key={f?._id} profile={f} />) }
        </div>
    )
}

export default FollowersList