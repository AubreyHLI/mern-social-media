import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'

const AvatarOrNameBox = ({userId, avatarUrl, username, navToProfile=true, usernameStyle, avatarStyle='!w-[50px] !h-[50px]'}) => {
    const navigate = useNavigate();
    
    const handleOnClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(navToProfile) {
            navigate(`/profile/${userId}`);
        }
    }

    return (
        <>
            {avatarUrl && 
            <Avatar onClick={handleOnClick} alt='' src={avatarUrl} className={`avatar hover:backdrop-opacity-10 ${avatarStyle}`} />
            }
            {username && 
            <h3 onClick={handleOnClick} className={`break-all line-clamp-1 font-[600] text-[16px] cursor-pointer hover:underline ${usernameStyle}`}>
                {username}
            </h3>
            }
        </>
    )
}

export default AvatarOrNameBox