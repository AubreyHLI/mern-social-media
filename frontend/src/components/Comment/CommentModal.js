import React, { useState } from 'react'
import Comments from './Comments'
import AddCommentForm from './AddCommentForm'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const CommentModal = ({postId, setOpen, withComments}) => {
    const [commentsLoading, setCommentsLoading] = useState(true);
    const posts = useSelector(state => state.posts.posts);
    const post = posts.find(p => p._id === postId);
    

    return (
        <div className='fixed z-[200] inset-0 w-full h-screen min-w-[350px] overflow-auto bg-[rgba(0,0,0,0.4)] flex justify-center'>            
            <div className='w-full h-full bg-white flex flex-col pt-[4px] pb-[24px] px-[8px] overflow-scroll 480px:my-[100px] 480px:w-[90%] 480px:max-w-[700px] 480px:h-max 480px:rounded-[16px] 480px:px-[16px] 480px:overflow-visible'>
                <div className='w-full flex items-center gap-[20px] py-[5px]'>
                    <div onClick={() => setOpen(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex cursor-pointer transition-colors duration-200 ease-out hover:bg-mernBorder'>
                        <CloseIcon fontSize='medium'/>
                    </div>
                    <h1 className='font-[500] text-[20px]'>发表评论</h1>
                </div>

                {/* Add Comment Form */}
                <div className='w-full'>
                    <AddCommentForm post={post} postId={postId} setOpen={setOpen} />
                </div>

                {/* Comments */}
                {withComments && 
                <div className='w-full'>
                    <Comments postId={postId} post={post} commentsLoading={commentsLoading} setCommentsLoading={setCommentsLoading} />
                </div>}
            </div>
        </div>
    )
}

export default CommentModal