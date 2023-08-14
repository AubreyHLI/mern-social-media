import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Tweetbox from '../atoms/Tweetbox';
import { setPosts } from '../../redux/features/postsSlice';
import { toast } from 'react-toastify';

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
                toast.success('动态发布成功', { toastId: 'sendPost-success' });
            }
        } catch(error) {
            const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.message;
            toast.error(errorMsg, { toastId: 'sendPost-error' });
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