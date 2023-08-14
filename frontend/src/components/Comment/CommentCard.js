import React, { useContext } from 'react'
import AvatarOrNameBox from '../atoms/AvatarOrNameBox'
import LikedBtn from '../atoms/LikedBtn';
import axios from 'axios';
import { calendarFormatBrif } from '../../helpers/dayjsHelper';
import { useDispatch, useSelector } from 'react-redux';
import { setPostComments } from '../../redux/features/postsSlice';
import { AppContext } from '../../context/appContext';


const CommentCard = ({comment, postId, setComments}) => {
	const { socket } = useContext(AppContext);
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();

	const handleDeleteComment = async () => {
		try{
			const response = await axios.delete(`post/${postId}/${comment?._id}/delete`);
			if(response.data.success) {
				dispatch(setPostComments({
					comments: response.data.updatedComments,
					postId
				}));
			}
		} catch(error) {
			if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
        	else console.log('error:', error.message);
		}
	}

	const handleLikeComment = async (e, type) => {
		e.preventDefault();
        try{
            const response = await axios.patch(`post/${postId}/${comment?._id}/like`,
                { userId: user._id.toString() }
            );
            if(response.data.success) {
				const { updatedComment } = response.data;
				setComments(prev => prev.map(c => {
					if(c._id === updatedComment._id) return updatedComment
					else return c
				}));

				if(type === 'like') {
					socket.emit('send-notification', {
						senderId: user._id,
						receiverId: comment?.author?._id,
						type: 'likeComment',
						targetPost: {
							id: postId,
						},
						targetComment: {
							id: comment?._id,
							text: comment?.commentText?.slice(0,30),
							thumbnail: comment?.commentPicture?.thumbnail,
						},
					});
				}
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
    }


	return (
		<div key={postId} id={`comment-${comment?._id}`} className='sectionWrapper borderBottom focus:bg-[#cccccc]'>
			<div className='section-left'>
				<AvatarOrNameBox avatarUrl={comment?.author?.imageUrl?.url} userId={comment?.author?._id} />
			</div>

			<div className='section-right'>
				<div className='h-[50px] flex flex-col items-start 480px:flex-row 480px:h-[25px] 480px:items-center'>
					<AvatarOrNameBox username={comment?.author?.username} userId={comment?.author?._id} />
					<div className='mt-[1px] text-[13px] text-mernLightGray'>
						<span className='hidden 480px:inline-block'>·</span>
						<span>{calendarFormatBrif(comment?.createdAt)}</span>
					</div>
				</div>

				<div className="flex justify-between">
					<div className='mt-[10px]'>
						{ comment?.commentText &&
						<p className='mt-[2px] mb-[10px] 480px:mt-0 text-[15px]'>{comment?.commentText}</p>}
					
						{ comment?.commentPicture &&
						<img src={comment?.commentPicture?.url} alt='' className='h-[120px] object-cover rounded-[5px] border mb-[10px]'/> }
					</div>

					<div className='flex justify-between !text-mernDarkGray'>
						<LikedBtn likes={comment?.likes} handleLike={handleLikeComment} />
					</div>
				</div>

				<div className='text-mernDarkGray text-[13px] flex gap-[20px]'>
					{ user?._id === comment?.author?._id &&
					<span onClick={() => handleDeleteComment()} className='cursor-pointer transition-colors ease-in hover:text-marnBlue'>
						删除
					</span>}
				</div>

			</div>
		</div>
	)
}

export default CommentCard