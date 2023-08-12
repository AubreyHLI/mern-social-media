import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import Moment from 'react-moment';


const NotificationCard = ({notification}) => {
    const {from, notifyType, targetPost, targetComment, commentContent, isRead, createdAt} = notification;
    const navigate = useNavigate();

    const clickName = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/profile/${from._id}`);
    }
    
    return (
        <div className='borderBottom flex'>
            <div>
                <Avatar src={from?.imageUrl.url} onClick={clickName} className='cursor-pointer hover:brightness-95 transition-all'/> 
            </div>
            <div className='w-full'>
                <div className='w-full'>
                    {notifyType === 'follow' && <FollowNotify from={from} />}
                    {notifyType === 'likePost' && <LikePostNotify from={from} targetPost={targetPost} />}
                    {notifyType === 'commentPost' && <CommentPostNotify from={from} targetPost={targetPost} commentContent={commentContent} />}
                    {notifyType === 'likeComment' && <LikeCommentNotify from={from} targetComment={targetComment} />}
                </div>
                <span className='text-[14px]'><Moment fromNow>{createdAt}</Moment></span>
            </div>
           

           
        </div>
    )
}

export default NotificationCard

const FollowNotify = ({from}) => {
    return ( 
        <div className='flex gap-4 text-[15px]'>
            <span className='font-[600] cursor-pointer hover:underline'>{from?.username}</span> 
            <span>开始关注你.</span>
        </div>
    )
}

const LikePostNotify = ({from, targetPost}) => {
    return (
        <div className='flex justify-between w-full'>
            <div className='flex gap-4 text-[15px] flex-1'>
                <span className='font-[600] cursor-pointer hover:underline'>{from?.username}</span> 
                <span>赞了你的动态.</span>
            </div>
            <div>
                {targetPost?.thumbnail 
                ? <img src={targetPost?.thumbnail} alt='' className='w-[60px]'/> 
                : <span>{targetPost?.text}</span>
                }
            </div>
        </div>
    )
}

const CommentPostNotify = ({from, targetPost, commentContent}) => {
    return (
        <div className='flex justify-between w-full'>
            <div className='text-[15px] flex-1'>
                <span className='font-[600] cursor-pointer hover:underline mr-[10px]'>{from?.username}</span> 
                <span>评论了你的动态：{commentContent?.text}{commentContent?.thumbnail && '[图片]'}</span>
            </div>
            <span>
                {targetPost?.thumbnail 
                ? <img src={targetPost?.thumbnail} alt='' className='w-[60px]'/> 
                : <span>{targetPost?.text}</span>
                }
            </span>
        </div>
    )
}

const LikeCommentNotify = ({from, targetComment}) => {
    return (
        <div className='flex justify-between w-full'>
           <div className='flex gap-4 text-[15px] flex-1'>
                <span className='font-[600] cursor-pointer hover:underline'>{from?.username}</span> 
                <span>赞了你的评论.</span>
            </div>
            <span>
                {targetComment?.thumbnail 
                ? <img src={targetComment?.thumbnail} alt='' className='w-[60px]'/> 
                : <span>{targetComment?.text}</span>
                }
            </span>
        </div>
    )
}

