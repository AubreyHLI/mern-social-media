import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AvatarOrNameBox from '../atoms/AvatarOrNameBox'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setUserFollowers } from '../../redux/features/authSlice'
import { toast } from 'react-toastify'

const FollowerCard = ({profile}) => {
    const [isRemoved, setIsRemoved] = useState(false);
	const dispatch = useDispatch();

	const removeFollower = async(e) => {
		e.stopPropagation();  //prevent click event pass to the parent
        e.preventDefault();
        try{
            const response = await axios.patch(`user/followers/remove/${profile?._id}`);
			dispatch( setUserFollowers(
				{ followers: [...response.data.followers] }
			) );
			setIsRemoved(true)
        } catch(error) {
			const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'follow-error' });
        }
	}

	if(isRemoved) {
		return
	}

    return (
		<div key={profile?._id}>
			<Link to={`/profile/${profile?._id}`}>
				<div className='sectionWrapper !py-[12px] !px-[16px] cursor-pointer transition-colors ease-in hover:bg-[rgb(0,0,0,0.03)]'>
					<div className='section-left'>
						<AvatarOrNameBox avatarUrl={profile?.imageUrl?.url} userId={profile?._id} />
					</div>
					<div className='section-right flex justify-between items-center'>
						<div>
							<AvatarOrNameBox username={profile?.username} userId={profile?._id} />
							<p className='text-[14px] text-mernLightGray line-clamp-1'>{profile?.bio}</p>
						</div>
						<button onClick={(e) => removeFollower(e)} className='btn-secondary hover:text-mernDarkGray w-fit'>
							移除粉丝
						</button>
					</div>
				</div>
			</Link>
		</div>
    )
}

export default FollowerCard