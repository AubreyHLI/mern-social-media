import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from './PostCard';
import CommentCard from '../Comment/CommentCard'
import Header from '../Layout/Header';
import axios from 'axios';


const SinglePost = ({postId}) => {
    const [comments, setComments] = useState();
    const [post, setPost] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchSinglePost();
    }, [])

    useEffect(() => {
        fetchPostComments();
    }, [post?.comments])


    const fetchSinglePost = async () => {
        try {
            const response = await axios.get(`post/${postId}`);
            if(response.data.success) {
                setPost(response.data.post);
            }
        } catch(error) {
			if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
		}
    }

    const fetchPostComments = async () => {
        try {
            const response = await axios.get(`post/${postId}/comments`);
            if(response.data.success) {
                setComments(response.data.comments);
            }
        } catch(error) {
			if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
		}
    }
    
    if(!post) {
        return <div>Loading...</div>
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
            : <div>Loading...</div>
            }
        </div>
    )
}

export default SinglePost