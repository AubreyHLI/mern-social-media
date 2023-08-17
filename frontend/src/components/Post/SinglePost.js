import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import Header from '../Layout/Header';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAPost } from '../../redux/features/postsSlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Comments from '../Comment/Comments';


const SinglePost = ({postId}) => {
    const [commentsLoading, setCommentsLoading] = useState(true);
    const posts = useSelector(state => state.posts.posts);
    const post = posts.find(p => p._id === postId);

    const dispatch = useDispatch();
    const location  = useLocation();
    const commentId = new URLSearchParams(location.search).get('commentId');

    useEffect(() => {
        if (commentId) {
            // Scroll to the comment section using DOM manipulation
            const commentSection = document.getElementById(`comment-${commentId}`);
            if (commentSection) {
                commentSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [commentId, commentsLoading]);

    useEffect(() => {
        fetchSinglePost();
    }, [])


    const fetchSinglePost = async () => {
        try {
            const response = await axios.get(`post/${postId}`);
            dispatch( setAPost(
                { post: response.data.post }
            ) );
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchPost-error' });
		}
    }

    
    if(!post) {
        return <LoadingSpinner styleOption='mt-[100px]'/>
    }

    return (
        <div className='mainWrapper'>
            <Header withBackward={true} heading='内容' />

            {/* Post */}
            <div className='w-full'>
                <PostCard post={post} isPage={true} />
            </div>

            {/* Comments */}
            <Comments postId={postId} post={post} setCommentsLoading={setCommentsLoading} commentsLoading={commentsLoading} />
        </div>
    )
}

export default SinglePost