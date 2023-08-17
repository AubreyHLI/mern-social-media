import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setPosts } from '../../redux/features/postsSlice';
import Header from '../Layout/Header';
import ProfileInfo from './ProfileInfo';
import PostCard from '../Post/PostCard';
import axios from 'axios';
import { setUserFollowers, setUserFollowings } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import LoadingSpinner from '../atoms/LoadingSpinner';


const ProfileFeed = () => {
    const { profileId } = useParams();
    const [isUser, setIsUser] = useState(false);
    const [profile, setProfile] = useState();
    const user = useSelector(state => state.auth.user);
    const posts = useSelector(state => state.posts.posts);
	const profilePosts = posts.filter(p => p.author._id === profileId);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllPosts();
        getProfileInfo();
    }, [profileId])


    const fetchAllPosts = async () => {
        console.log('fetch all posts')
        try {
            const response = await axios.get(`post/allPosts`);
            dispatch( setPosts(
                { posts: [...response.data.posts] }
            ) );
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchPosts-error' });
        }
    }

    const getProfileInfo = async () => {
        try {
            const {data} = await axios.get(`user/${profileId}/profileInfo`);
            setProfile(data.profile);
            setIsUser(profileId === user._id);
            if(profileId === user._id) {
                dispatch(setUserFollowers(
                    {followers: data.profile.followers}
                ));
                dispatch(setUserFollowings(
                    {followings: data.profile.followings}
                ));
            }
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchProfile-error' });
        }
    }


    return (
        <div className='mainWrapper'>
            <Header withBackward={true} 
                heading={isUser ? user?.username : profile?.username} 
                subHeading={profilePosts?.length} />
            
            {profile ? 
            <>
                <ProfileInfo profile={isUser ? user : profile} />
                
                <div className='w-full'>
                    <h1 className='w-full border-b-[2px] border-b-mernBorder px-[16px] 1200px:px-[24px] font-[500] text-[18px] pb-[10px]'>
                        全部内容
                    </h1>
                    { profilePosts?.map(p => 
                    <PostCard key={p?._id} post={p} postId={p?._id} navToProfile={false}/>
                    )} 
                </div>
            </> 
            : <LoadingSpinner styleOption='mt-[100px]'/>
            } 
        </div>
    )
}

export default ProfileFeed