import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../redux/features/postsSlice';
import PostCard from './PostCard';
import { toast } from 'react-toastify';

const Posts = () => {
    const posts = useSelector(state => state.posts.posts);   
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllPosts();
    }, [])

    const fetchAllPosts = async () => {
        console.log('fetch all posts')
        try {
            const response = await axios.get('post/allPosts');
            if(response.data.success) {
                dispatch( setPosts({ posts: [...response.data.posts] }) )
            }
        } catch(error) {
            const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchPosts-error' });
        }
    }

    return (
    <>   
        { posts?.map(p => 
            <PostCard key={p?._id} post={p} />
        )} 
    </>
    )
}

export default Posts