import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FollowCard from './FollowCard';
import { toast } from 'react-toastify';

const FollowingsList = ({setProfileName}) => {
    const {profileId} = useParams();
    const [followings, setFollowings] = useState([]);

    const getFollowings = async () => {
        try{
            const response = await axios.get(`user/${profileId}/followings`);
            setFollowings([...response.data.followings]);
            setProfileName(response.data.profilename);
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchFollowings-error' });
        }
    }

    useEffect(() => {
        getFollowings();
    }, [])


    return (
        <div>
            {followings?.length > 0 &&
            followings?.map(f => <FollowCard key={f?._id} profile={f} />)
            }
        </div>
    )
}

export default FollowingsList