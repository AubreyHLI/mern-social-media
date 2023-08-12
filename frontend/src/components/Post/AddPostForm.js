import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Tweetbox from '../atoms/Tweetbox';
import { setPosts } from '../../redux/features/postsSlice';

const AddPostForm = ({ minH=80, optionStyles, autoFocus=false, handleAfterSuccess=()=>{}}) => {
    const user = useSelector(state => state.auth.user);
    const postFormRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if(autoFocus) {
            postFormRef.current.focusTextarea();
        }
    }, [])

    const handleSendPost = async (postText, postImg) => {
        const formData = new FormData();
        formData.append("postText", postText);
        formData.append("location", user?.location);
        if(postImg) formData.append("picture", postImg);
        try{
            const response = await axios.post('post/createPost', formData );
            if(response.data.success) {
                dispatch( setPosts({ posts: [...response.data.posts] }) );
                postFormRef.current.resetPostInput();
                handleAfterSuccess();
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }        
    }

    return (
        <>
            <Tweetbox placeholder='有什么新鲜事？!' ref={postFormRef} userAvatar={user?.imageUrl?.url}
                sendForm={handleSendPost} chooseAudience={true} submitBtnText='发布'  wordLimit={600} minH={minH} optionStyles={optionStyles}
            />
        </>
    )
}

export default AddPostForm