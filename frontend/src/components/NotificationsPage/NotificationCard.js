import React from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from '../../helpers/dayjsHelper';
import AvatarOrNameBox from '../atoms/AvatarOrNameBox';


const NotificationCard = ({notification }) => {
    const {from, notifyType, targetPost, targetComment, commentContent, createdAt} = notification;
    const navigate = useNavigate();

    let content = null;
    let actionText = '';
    let actionComment = '';
    let image = null;
    let link = '';

    switch (notifyType) {
        case 'follow':
            actionText = '开始关注你.';
            link = `/profile/${from?._id}`;
            break;
        case 'likePost':
            actionText = '赞了你的动态.';
            image = targetPost?.thumbnail;
            content = targetPost?.text;
            link = `/post/${targetPost?.id}`;
            break;
        case 'commentPost':
            actionText = '评论了你：';
            actionComment = `${commentContent?.text}${commentContent?.withImage ? '[图片]' : ''}`;
            image = targetPost?.thumbnail;
            content = targetPost?.text;
            link = `/post/${targetPost?.id}?commentId=${commentContent?.id}`;
            break;
        case 'likeComment':
            actionText = '赞了你的评论.';
            image = targetComment?.thumbnail;
            content = targetComment?.text;
            link = `/post/${targetPost?.id}?commentId=${targetComment?.id}`;
            break;
        default:
            return null;
    }


    return (
        <div onClick={() => navigate(link)} className='sectionWrapper !py-[10px] flex gap-[8px] cursor-pointer transition-colors ease-out cursor-pointer hover:bg-[rgb(0,0,0,0.03)]'>
            <div>
                <AvatarOrNameBox userId={from?._id} avatarUrl={from?.imageUrl?.url} avatarStyle='!w-[40px] !h-[40px]'/>
            </div>
            <div className='w-full min-h-[50px]'>
                <div className='flex justify-between w-full'>
                    <div className='flex flex-col justify-between gap-[9px] text-[15px] flex-1 min-h-[50px]'>
                        <div>
                            <AvatarOrNameBox userId={from?._id} username={from?.username} usernameStyle='!text-[15px] w-fit inline mr-[8px]'/> 
                            <span className=''>{actionText}<span className='text-mernDarkGray text-[14px]'>{actionComment}</span></span>
                        </div>
                        <div className='text-[12px] text-mernLightGray'>
                            {dayjs(createdAt).fromNow()}
                        </div>
                    </div>

                    {(image || content) &&
                    <div className='w-[50px] h-[50px] border border-mernBorder px-[3px] py-[2px] text-mernLightGray ml-[16px] overflow-hidden'>
                        {image ? <img src={image} alt='' className='w-[45px] object-cover'/> 
                        : <p className='line-clamp-3 text-[10px] '>{content}</p>}
                    </div>
                    }
                </div>
            </div>           
        </div>
    )
}

export default NotificationCard
