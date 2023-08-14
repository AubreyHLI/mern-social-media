import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import CommentCard from '../Comment/CommentCard'
import Header from '../Layout/Header';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAPost } from '../../redux/features/postsSlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../atoms/LoadingSpinner';


const SinglePost = ({postId}) => {
    const [comments, setComments] = useState();
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

    useEffect(() => {
        fetchPostComments();
    }, [post?.comments, post?.like])


    const fetchSinglePost = async () => {
        try {
            const response = await axios.get(`post/${postId}`);
            if(response.data.success) {
                dispatch( setAPost({ post: response.data.post }) );
            }
        } catch(error) {
            const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchPost-error' });
		}
    }

    const fetchPostComments = async () => {
        try {
            const response = await axios.get(`post/${postId}/comments`);
            if(response.data.success) {
                setComments(response.data.comments);
                setCommentsLoading(false);
            }
        } catch(error) {
            const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchComment-error' });
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
                <PostCard post={post} isPage={true} setComments={setComments}/>
            </div>

            {/* Comments */}
            { comments ? 
            <div className='w-full border-t-[1px] border-t-mernBorder'>
                <div className='sectionWrapper text-[17px] font-[500] !pt-[12px]'>
                    <h4>{`评论 : ${comments?.length}`}</h4>
                </div>
                <div className='w-full min-h-[100px]'>
                    {comments?.length > 0 && comments?.map(c => 
                    <CommentCard key={c?._id} comment={c} postId={postId} setComments={setComments}/> 
                    )}
                </div>
            </div> 
            : <LoadingSpinner styleOption='mt-[100px]'/>
            }
        </div>
    )
}

export default SinglePost