import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Tweetbox from '../atoms/Tweetbox';
import { setPosts } from '../../redux/features/postsSlice';
import { toast } from 'react-toastify';

const AddPostForm = ({ minH=80, optionStyles, autoFocus=false, handleAfterSuccess=()=>{}}) => {
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.auth.user);
    const postFormRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if(autoFocus) {
            postFormRef.current.focusTextarea();
        }
    }, [])

    const handleSendPost = async (postText, postImgBase64) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("postText", postText);
        formData.append("location", user?.location);
        if(postImgBase64) formData.append("picture", postImgBase64);
        try{
            const response = await axios.post('post/createPost', formData);
            dispatch( setPosts(
                { posts: [...response.data.posts] }
            ) );
            postFormRef.current.resetPostInput();
            handleAfterSuccess();
            toast.success('动态发布成功', { toastId: 'sendPost-success' });
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'sendPost-error' });
        } finally {
            setIsLoading(false)
        }      
    }

    return (
        <>
            <Tweetbox placeholder='有什么新鲜事？!' ref={postFormRef} userAvatar={user?.imageUrl?.url} isLoading={isLoading} setIsLoading={setIsLoading}
                sendForm={handleSendPost} chooseAudience={true} submitBtnText='发布'  wordLimit={600} minH={minH} optionStyles={optionStyles}
            />
        </>
    )
}

export default AddPostForm