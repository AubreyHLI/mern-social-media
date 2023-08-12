import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Moment from 'react-moment';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Cover from '../atoms/Cover';
import EditProfileInfo from './EditProfileInfo';
import FollowBtn from '../Follows/FollowBtn';


const ProfileInfo = ({profile}) => {
    const user = useSelector(state => state.auth.user);
    const [open, setOpen] = useState(false);

    return (
    <div className='w-full'>
        <div className='h-[120px] 600px:h-[200px]'>
            { profile && <Cover coverImg={profile?.coverImage?.url} />}
        </div>

        <div className='flex justify-between px-3 600px:px-5'>
            <div className='relative'> 
                <div className='absolute -top-[45px] 600px:-top-14 border-2 border-[#fff] rounded-full bg-white'>
                    <Avatar src={profile?.imageUrl?.url} alt='' className='border !w-[90px] !h-[90px] 600px:!w-28 600px:!h-28'/>
                </div>
            </div>
            
            <div className='mt-[12px]'>
                {user?._id === profile?._id
                ? <div>
                        <button onClick={() => setOpen(true)} className='btn-secondary hover:!bg-mernBorder'>
                            设置个人资料
                        </button>
                        {open && 
                        <EditProfileInfo setOpen={setOpen} />}
                    </div>
                : <FollowBtn postUserId={profile?._id} /> 
                }
            </div>
        </div>

        <div className='px-[16px] 1200px:px-[24px] mt-1 mb-2 600px:my-4 flex flex-col gap-[8px] 600px:gap-[10px]'>
            <h2 className='font-bold text-xl leading-5'>{profile?.username}</h2>
            <p className='text-sm mt-1'>{profile?.bio}</p>
            <div className="flex gap-[10px] w-full text-sm text-mernDarkGray">
                <div className='ml-[-4px] flex items-center'>
                    <LocationOnOutlinedIcon className='!text-[20px] !mr-[2px]'/>
                    {profile?.location}
                </div>
                <div className='flex items-center'>
                    <CalendarMonthIcon className='!text-[18px] !mr-[4px]'/>
                    <span>
                        <Moment format="YYYY">{profile?.createdAt}</Moment>
                        年
                        <Moment format="MM">{profile?.createdAt}</Moment>
                        月
                        <span className='ml-[3px]'>加入</span>
                    </span>
                </div>
            </div>
            <div className='flex gap-[20px] w-full text-[15px]'>
                <Link to={`/profile/${profile?._id}/followings`} className='hover:underline hover:underline-offset-2'>
                    <span className='font-[600]'>{profile?.followings?.length}  </span>
                    <span className='text-mernDarkGray'>正在关注</span>
                </Link>
                <Link to={`/profile/${profile?._id}/followers`} className='hover:underline hover:underline-offset-2'>
                    <span className='font-[600]'>{profile?.followers?.length}  </span>
                    <span className='text-mernDarkGray'>关注者</span>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default ProfileInfo