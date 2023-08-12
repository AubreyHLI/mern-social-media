import React, { useEffect } from 'react'
import Header from '../Layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import { setCollectedPosts } from '../../redux/features/postsSlice';
import { setUserCollects } from '../../redux/features/authSlice';
import axios from 'axios';
import PostCard from '../Post/PostCard';


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
                const sortedPosts = response.data.collectedPosts.reverse();
                dispatch( setCollectedPosts({ collectedPosts: sortedPosts }) );
                dispatch( setUserCollects({ updatedCollects: response.data.collects }) );
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
    }

    return (
        <div className='mainWrapper'>
            <Header withBackward={true} heading='收藏夹' subHeading={collectedPosts?.length} />
    
            <div className='w-full'>
                { collectedPosts?.length > 0 
                ? collectedPosts?.map(p => 
                <PostCard key={p?._id} post={p} postId={p?._id}/>)
                : <div className='normalFlex py-[100px]'>无收藏内容</div>
                }
            </div>
        </div>
    )
}

export default BookmarksFeed