import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FollowCard from './FollowCard';
import { useSelector } from 'react-redux';
import FollowerCard from './FollowerCard';

const FollowersList = ({setProfileName}) => {
	const {profileId} = useParams();
    const [followers, setFollowers] = useState([]);
    const user = useSelector(state => state.auth.user);

    const getFollowers = async () => {
        try{
            const response = await axios.get(`user/${profileId}/followers`);
            if(response.data.success) {
                setFollowers([...response.data.followers]);
                setProfileName(response.data.profilename);
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
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