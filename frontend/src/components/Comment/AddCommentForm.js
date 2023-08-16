import React, { useContext, useEffect, useRef } from 'react';
import Tweetbox from '../atoms/Tweetbox';
import axios from 'axios';
import { calendarFormat } from '../../helpers/dayjsHelper';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAPost } from '../../redux/features/postsSlice';
import { AppContext } from '../../context/appContext';
import { toast } from 'react-toastify';


const AddCommentForm = ({postId, setOpen, post}) => {
    const { socket } = useContext(AppContext);
    const commentFormRef = useRef();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        commentFormRef.current.focusTextarea();
    }, [])

    const handleSendComment = async (commentText, commentImg) => {
        const formData = new FormData();
        formData.append("postId", postId)
        formData.append("commentText", commentText);
        if(commentImg) formData.append("picture", commentImg);
        try{
            const response = await axios.post(`post/${postId}/createComment`, formData);
            if(response.data.success) {
                dispatch( setAPost({ post: response.data.updatedPost }) );
                socket.emit('send-notification', {
                    senderId: user._id,
                    receiverId: post?.author?._id,
                    type: 'commentPost',
					targetPost: {
                        id: post?._id,
                        text: post?.postText?.slice(0,30),
                        thumbnail: post?.postPicture?.thumbnail,
                    },
                    commentContent: response.data.newComment,
                });
                toast.success('评论发表成功', { toastId: 'comment-success' });
                setOpen(false);
            }
        } catch(error) {
            const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.message;
            toast.error(errorMsg, { toastId: 'comment-error' });
        }
    }


    return (
        <div className='w-full'>
            {/* post */}
            <div className='sectionWrapper !pb-0'>
                {/* postUserAvatar */}
                <div className='section-left flex flex-col'>
                    <Avatar alt='' src={post?.author?.imageUrl?.url} className='avatar !w-[50px] !h-[50px]' />
                    <div className="w-full h-full mb-[6px] flex-1">
                        <span className='inline-block bg-[#cfd9de] w-[2px] h-full relative left-[45%] mt-[3px]'></span>
                    </div>
                </div>

                <div className='section-right pb-[20px]'>
                    {/* postUserInfo */}
                    <div className='flex items-center h-[25px]'>
                        <h3 className='font-[600] text-[16px] flex items-center'>{post?.author?.username}</h3>
                        <div className='text-[14px] text-mernLightGray'>
                            <span>·</span>
                            <span>{calendarFormat(post?.createdAt)}</span>
                        </div>
                    </div>
                    
                    {/* postContent */}
                    <div className='mt-[8px]'>
                        <p className='text-[15px] mt-[2px] mb-[12px] 480px:mt-0'>{post?.postText}</p>
                        { post?.postPicture &&
                        <img src={post?.postPicture?.url} alt='' className='w-auto h-auto max-w-[150px] max-h-[150px] object-cover mt-[4px]'/> 
                        }
                    </div>
                </div>
            </div>

            {/* make comment */}
            <div className='mt-[-16px]'>
                <Tweetbox placeholder='发表你的评论！' ref={commentFormRef} userAvatar={user?.imageUrl?.url}
                    sendForm={handleSendComment} chooseAudience={false} submitBtnText='发布评论' minH={100} wordLimit={300}
                />
            </div>
        </div>
    )
}

export default AddCommentForm