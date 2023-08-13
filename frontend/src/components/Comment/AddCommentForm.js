import React, { useContext, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Tweetbox from '../atoms/Tweetbox';
import axios from 'axios';
import { calendarFormat } from '../../helpers/dayjsHelper';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAPost } from '../../redux/features/postsSlice';
import { AppContext } from '../../context/appContext';

const AddCommentForm = ({postId, setOpen}) => {
    const commentFormRef = useRef();
    const { socket } = useContext(AppContext);
    const user = useSelector(state => state.auth.user);
    const posts = useSelector(state => state.posts.posts);
    const post = posts.find(p => p._id === postId);
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
            const response = await axios.post(`post/${postId}/createComment`, 
                formData
            );
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
                setOpen(false);
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
    }


    return (
        <div className='fixed z-[200] inset-0 w-full h-screen min-w-[350px] overflow-auto bg-[rgba(0,0,0,0.4)] flex justify-center'>
            <div className='w-full h-full bg-white flex flex-col pt-[4px] pb-[24px] px-[8px] overflow-scroll 480px:mt-[100px] 480px:w-[90%] 480px:max-w-[700px] 480px:h-max 480px:max-h-[650px] 480px:rounded-[16px] 480px:px-[16px] 480px:overflow-visible'>
                
                <div className='w-full flex items-center gap-[20px] py-[5px]'>
                    <div onClick={() => setOpen(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex cursor-pointer transition-colors duration-200 ease-out hover:bg-mernBorder'>
                        <CloseIcon fontSize='medium'/>
                    </div>
                    <h1 className='font-[500] text-[20px]'>发表评论</h1>
                </div>

                {/* post */}
                <div className='sectionWrapper !pb-0'>
                    {/* postUserAvatar */}
                    <div className='section-left flex flex-col'>
                        <Avatar alt='' src={post?.author?.imageUrl?.url} className='avatar' />
                        <div className="w-full h-full mb-[6px] flex-1">
                            <span className='inline-block bg-[#cfd9de] w-[2px] h-full relative left-[45%] mt-[3px]'></span>
                        </div>
                    </div>

                    <div className='section-right pb-[36px]'>
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
                            <img src={post?.postPicture?.url} alt='' className='w-auto h-[100px] object-cover mt-[4px]'/> 
                            }
                        </div>
                    </div>
                </div>

                {/* comment */}
                <div className='mt-[-16px]'>
                    <Tweetbox placeholder='发表你的评论！' ref={commentFormRef} userAvatar={user?.imageUrl?.url}
                        sendForm={handleSendComment} chooseAudience={false} submitBtnText='发布评论' minH={100} wordLimit={300}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddCommentForm