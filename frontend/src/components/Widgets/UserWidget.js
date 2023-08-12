import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const UserWidget = () => {
	const user = useSelector(state => state.auth.user);
    return (
		<div className='rounded-[20px] mt-[8px] flex flex-col items-center bg-mernBgLight p-[16px] pb-[20px]'>
			<Avatar src={user?.imageUrl?.url} alt='' sx={{width:80, height:80}} className='border bg-white'/>
			<h2 className='font-bold text-xl mt-[1px] break-all line-clamp-1'>{user?.username}</h2>
            <p className='text-[14px] mt-[2px] line-clamp-4 break-all'>{user?.bio}</p>
			<div className='flex justify-center gap-[20px] w-full text-[15px] mt-[8px]'>
               <div>
                    <span className='font-[600]'>{user?.followings?.length}  </span>
                    <span className='text-mernDarkGray'>正在关注</span>
                </div>
                <div>
                    <span className='font-[600]'>{user?.followers?.length}  </span>
                    <span className='text-mernDarkGray'>关注者</span>
                </div>
            </div>
		</div>
    )
}

export default UserWidget