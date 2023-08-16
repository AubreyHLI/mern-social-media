import React, { useState } from 'react'
import Comments from './Comments'
import AddCommentForm from './AddCommentForm'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import ModalLayout from '../Layout/ModalLayout';

const CommentModal = ({postId, setOpen, withComments}) => {
    const [commentsLoading, setCommentsLoading] = useState(true);
    const posts = useSelector(state => state.posts.posts);
    const post = posts.find(p => p._id === postId);
    

    return (
        <ModalLayout optionStyle='480px:my-[100px] 480px:max-w-[700px]'>
            <div className='w-full h-[60px] px-[10px] flex items-center gap-[10px] 480px:h-[44px] 480px:px-[2px]'>
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
        </ModalLayout>
    )
}

export default CommentModal