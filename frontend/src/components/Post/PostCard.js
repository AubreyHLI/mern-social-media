import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserCollects } from '../../redux/features/authSlice';
import { setAPost, setPosts } from '../../redux/features/postsSlice';
import { AppContext } from '../../context/appContext';
import { calendarFormat, calendarFormatBrif } from '../../helpers/dayjsHelper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TooltipBox from '../atoms/TooltipBox';
import LikedBtn from '../atoms/LikedBtn';
import CollectedBtn from '../atoms/CollectedBtn';
import AvatarOrNameBox from '../atoms/AvatarOrNameBox';
import axios from 'axios';
import CommentModal from '../Comment/CommentModal';
import { toast } from 'react-toastify';


const PostCard = ({post, isPage, navToProfile=true }) => {
	const { socket } = useContext(AppContext);
	const [open, setOpen] = useState(false);
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();	

	useEffect(() => {
        if(open) {
            document.body.style.overflow = 'hidden';  // lock the scroll of home page
        } else {
            document.body.style.overflow = 'unset';  // unlock the scroll of home page
        }
    }, [open]);


	const handleClickPost = () => {
		if(!isPage) {
			navigate(`/post/${post._id}`)
		}
	}

	const handleOpenComment = (e) => {
		e.stopPropagation();
		setOpen(true);
	}

	const handleDeletePost = async (e) => {
		e.stopPropagation();
		try{
			const answer = window.confirm('确认删除此内容？');
			if(!answer) return
			const response = await axios.delete(`post/${post?._id}/delete`);
			if(isPage) {
				navigate('/');
			} else {
				dispatch( setPosts(
					{ posts: response.data.posts }
				) );
			}
		} catch(error) {
			const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'delete-error' });
		}
	}

	const handleLikePost = async (e, type) => {
        e.stopPropagation();  //prevent click event pass to the parent
        try{
            const response = await axios.patch(`post/${post?._id}/like`);
			dispatch( setAPost(
				{ post: response.data.updatedPost }
			) );
			if(type === 'like') {
				socket.emit('send-notification', {
					senderId: user._id,
					receiverId: post?.author?._id,
					type: 'likePost',
					targetPost: {
						id: post?._id,
						text: post?.postText?.slice(0,30),
						thumbnail: post?.postPicture?.thumbnail,
					},
				});
			}
        } catch(error) {
			const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'like-error' });
        }
    }

	const handleCollectPost = async (e) => {
        e.stopPropagation();  //prevent click event pass to the parent
        try{
            const response = await axios.patch(`post/${post?._id}/collect`);
            dispatch( setUserCollects(
				{ updatedCollects: response.data.updatedCollects }
			) );
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'collect-error' });
        }
    }	

	return (
	<>
		<div onClick={handleClickPost} className={`sectionWrapper borderBottom ${isPage ? '' : 'transition-colors ease-out cursor-pointer hover:bg-[rgb(0,0,0,0.025)]'}`}>
			
			<div className='section-left'>
				<div className='relative userInfoBox'>
					<AvatarOrNameBox avatarUrl={post?.author?.imageUrl?.url} userId={post?.author?._id} navToProfile={navToProfile}/>
					{/* <div className='profileCard shadow-double'>
                		<ProfileCard postUser={post?.author} />
            		</div>  */}
				</div>
			</div>
			
			<div className='section-right'>
				{/* post user */}
				<div className='flex justify-between'>
					<div className={`h-[50px] flex flex-col items-start ${isPage ? 'gap-[4px]' : '480px:flex-row 480px:h-[36px] 480px:items-center' }`}>
						<div className='relative userInfoBox'>
							<AvatarOrNameBox username={post?.author?.username} userId={post?.author?._id} navToProfile={navToProfile}/>
						</div>
			
						<div className='text-[13px] text-mernLightGray'>
							{ isPage 
							? <span>{calendarFormat(post?.createdAt)}</span> 
							: <div className='mt-[2px]'>
								<span className='hidden 480px:inline-block'>·</span>
								<span>{calendarFormatBrif(post?.createdAt)}</span>
							</div>
							}
						</div>
					</div>
					{ post?.author?._id === user._id &&
					<TooltipBox tip='删除' handleOnClick={(e) => handleDeletePost(e)} Icon={DeleteOutlineIcon} iconStyle='!text-[18px]' option='text-mernLightGray hover-div:text-[#00ba7c] hover-div:bg-[#e9fbf5]'/>
					}
				</div>

				{/* post content */}
				<div className={`${isPage ? 'ml-[-54px] mt-[20px]' : 'mt-[4px] 480px:mt-0'}`}>
					<p className={`mt-[2px] mb-[10px] 480px:mt-0 ${isPage ? 'text-[17px]' : 'text-[15px]' }`}>{post?.postText}</p>
					
					{ post?.postPicture &&
					<div className='inline-block overflow-hidden'>
						<img src={post?.postPicture?.url} alt='' className={`rounded-[20px] border border-gray-100
						${isPage ? 'w-auto h-auto max-w-[95%] max-h-[900px]' : 'w-auto h-auto max-w-[85%] max-h-[600px]'}`}/> 
					</div>}

					{ isPage &&
					<span className="block w-full mt-[20px] mb-[12px] pb-[12px] text-[15px] text-mernLightGray borderBottom">
						<LocationOnOutlinedIcon className='!text-[20px]'/>
						{post?.location}
					</span> }
					
					<div className={`flex items-center mt-[4px] ml-[-8px] !text-mernDarkGray ${!isPage ? 'justify-between max-w-[380px]' : 'justify-around w-full' }`}>
						{/* like */}
						<LikedBtn likes={post?.likes} handleLike={handleLikePost}/>

						{/* comment */}
						<TooltipBox tip='评论' stati={post?.comments?.length} Icon={SmsOutlinedIcon} 
							iconStyle='!text-[18px]' statiHover='hover-span:text-mernBlue' 
							handleOnClick={(e) => handleOpenComment(e)}
						/>

						{/* collect */}
						<CollectedBtn postId={post?._id} collects={user?.collects} handleCollect={handleCollectPost}/>

						{/* share */}
						<TooltipBox tip='分享' Icon={ShareOutlinedIcon} iconStyle='!text-[17px]'
							handleOnClick={() => console.log('share')}
						/>
					</div>
				</div>
			</div>
		</div>

		{open && 
		<CommentModal postId={post._id} setOpen={setOpen} withComments={!isPage} />}
	</>
	
	)
}

export default PostCard