import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CommentCard from './CommentCard';
import axios from 'axios';
import LoadingSpinner from '../atoms/LoadingSpinner';

const Comments = ({ isPage, setCommentsLoading, commentsLoading, postId, post }) => {
    const [comments, setComments] = useState();

    useEffect(() => {
        if (isPage)  
            fetchPostComments();
    }, [post?.comments?.length])

    useEffect(() => {
        if (!isPage)  
            fetchPostComments();
    }, [])

    const fetchPostComments = async () => {
        console.log('fetch comments');
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
    
    if(commentsLoading) {
        return (
            <div className='w-full text-center'>
                <LoadingSpinner styleOption='mt-[100px]'/>
            </div>
        )
    }

    return (
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
    )
}

export default Comments