import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import { setCollectedPosts } from '../../redux/features/postsSlice';
import { setUserCollects } from '../../redux/features/authSlice';
import axios from 'axios';
import PostCard from '../Post/PostCard';
import { toast } from 'react-toastify';
import LoadingSpinner from '../atoms/LoadingSpinner';

const BookmarksFeed = () => {
    const collectedPosts = useSelector(state => state.posts.collectedPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        getCollectedPosts()
    }, [])

    const getCollectedPosts = async () => {
        try {
            const response = await axios.get(`user/collectedPosts`);
            if(response.data.success) {
                dispatch( setCollectedPosts({ collectedPosts: response.data.collectedPosts }) );
                dispatch( setUserCollects({ updatedCollects: response.data.collects }) );
            }
        } catch(error) {
            const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.message;
            toast.error(errorMsg, { toastId: 'collects-error' });
        }
    }

    return (
        <div className='mainWrapper'>
            <Header withBackward={true} heading='收藏夹' subHeading={collectedPosts?.length} />

            {collectedPosts ? 
            <div className='w-full'>
                { collectedPosts?.length > 0 
                ? collectedPosts?.map(p => 
                <PostCard key={p?._id} post={p} postId={p?._id}/>)
                : <div className='normalFlex py-[100px]'>无收藏内容</div>
                }
            </div>
            : <LoadingSpinner styleOption='mt-[100px]'/>}
        </div>
    )
}

export default BookmarksFeed