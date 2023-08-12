import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FollowCard from './FollowCard';

const FollowingsList = ({setProfileName}) => {
    const {profileId} = useParams();
    const [followings, setFollowings] = useState([]);

    const getFollowings = async () => {
        try{
            const response = await axios.get(`user/${profileId}/followings`);
            if(response.data.success) {
                setFollowings([...response.data.followings]);
                setProfileName(response.data.profilename);
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
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