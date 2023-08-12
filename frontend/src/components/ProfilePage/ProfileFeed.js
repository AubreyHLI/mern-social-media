import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setPosts } from '../../redux/features/postsSlice';
import Header from '../Layout/Header';
import ProfileInfo from './ProfileInfo';
import PostCard from '../Post/PostCard';
import axios from 'axios';


const ProfileFeed = () => {
    const { profileId } = useParams();
    const [profile, setProfile] = useState();
    const user = useSelector(state => state.auth.user);
    const { username, bio, location, followings, followers } = user;
    const posts = useSelector(state => state.posts.posts);
	const profilePosts = posts.filter(p => p.author._id === profileId);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllPosts();
        getProfileInfo();
    }, [profileId])


    useEffect(() => {
        getProfileInfo();
    }, [username, bio, location, followings, followers])

    const fetchAllPosts = async () => {
        console.log('fetch all posts')
        try {
            const response = await axios.get(`post/allPosts`);
            if(response.data.success) {
                dispatch( setPosts({ posts: [...response.data.posts] }) )
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
    }

    const getProfileInfo = async () => {
        try {
            const response = await axios.get(`user/${profileId}/profileInfo`);
            if(response.data.success) {
                setProfile(response.data.profile);
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
    }


    return (
        <div className='mainWrapper'>
            <Header withBackward={true} heading={profile?.username} subHeading={profilePosts?.length} />

			<ProfileInfo profile={profile} />
            
            <div className='w-full'>
                <h1 className='w-full border-b-[2px] border-b-mernBorder px-[16px] 1200px:px-[24px] font-[500] text-[18px] pb-[10px]'>
                    全部内容
                </h1>
                { profilePosts?.map(p => 
                <PostCard key={p?._id} post={p} postId={p?._id} navToProfile={false}/>
                )} 
            </div>
        </div>
    )
}

export default ProfileFeed