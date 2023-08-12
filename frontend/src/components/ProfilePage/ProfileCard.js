import React from 'react'
import AvatarOrNameBox from '../atoms/AvatarOrNameBox';

const ProfileCard = ({postUser}) => {

    return (
        <div className='flex'>
            <AvatarOrNameBox avatarUrl={postUser?.imageUrl?.url} userId={postUser?._id} />
            <AvatarOrNameBox username={postUser?.username} userId={postUser?._id} />
        </div>
    )
}

export default ProfileCard