import React from 'react'
import AvatarOrNameBox from '../atoms/AvatarOrNameBox'
import FollowBtn from './FollowBtn'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FollowCard = ({profile, smallBtn}) => {
    const user = useSelector(state => state.auth.user);

    return (
        <div key={profile?._id}>
            <Link to={`/profile/${profile?._id}`} >
                <div className='sectionWrapper !py-[8px] !px-[16px] cursor-pointer transition-colors ease-in hover:bg-[rgb(0,0,0,0.03)]'>                
                    <div className='section-left'>
                        <AvatarOrNameBox avatarUrl={profile?.imageUrl?.url} userId={profile?._id} />
                    </div>
                    <div className='section-right flex justify-between items-center'>
                        <div className='flex-1'>
                            <AvatarOrNameBox username={profile?.username} userId={profile?._id} />
                            <p className='text-[14px] text-mernLightGray line-clamp-1'>{profile?.bio}</p>
                        </div>
                        {profile?._id !== user?._id && 
                        <div className='w-fit'>
                            <FollowBtn postUserId={profile?._id} isSmall={smallBtn}/>
                        </div>
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default FollowCard