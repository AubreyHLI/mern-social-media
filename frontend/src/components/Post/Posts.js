import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../redux/features/postsSlice';
import PostCard from './PostCard';

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
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
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