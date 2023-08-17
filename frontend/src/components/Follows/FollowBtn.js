import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../context/appContext';
import { setUserFollowings } from '../../redux/features/authSlice';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import axios from 'axios';
import TooltipBox from '../atoms/TooltipBox';
import { toast } from 'react-toastify';

const FollowBtn = ({postUserId, isSmall}) => {
    const { socket } = useContext(AppContext);
    const { _id, followings } = useSelector(state => state.auth.user);
    const hasFollowing = followings.includes(postUserId);
    const dispatch = useDispatch();

    const addRemoveFollowing = async (e, type) => {
        e.stopPropagation();  //prevent click event pass to the parent
        e.preventDefault();
        try{
            const response = await axios.patch(`user/followings/${postUserId}`);
            dispatch( setUserFollowings(
                { followings: [...response.data.followings] }
            ) );
            if(type === 'follow'){
                socket.emit('send-notification', {
                    senderId: _id,
                    receiverId: postUserId,
                    type: type
                });
            }
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            toast.error(errorMsg, { toastId: 'follow-error' });
        }
    }
    

    if(isSmall) {
        return (
            <div>
                {hasFollowing 
                ? <TooltipBox tip='取消关注' Icon={PersonRemoveAlt1OutlinedIcon} iconStyle='!text-[20px] !text-mernDarkGray' option='hover-div:bg-[white] hover-div:border'  handleOnClick={(e) => addRemoveFollowing(e, 'unfollow')}/>
                : <TooltipBox tip='关注' Icon={PersonAddAltIcon} iconStyle='!text-[20px] !text-mernBlue'  handleOnClick={(e) => addRemoveFollowing(e, 'follow')}/>
                }
            </div>
        )
    }


    return (
        <div>
            {hasFollowing 
            ? <button onClick={(e) => addRemoveFollowing(e, 'unfollow')} className='btn-secondary hover:!text-[rgb(244,33,46)] hover:!border-[rgb(253,201,206)] hover:!bg-[rgb(254,239,240)] hover-span:inline hover-div:hidden !text-[14px]'>
                <div>已关注</div>
                <span className='hidden w-fit'>取消关注</span>
            </button>
            : <button onClick={(e) => addRemoveFollowing(e, 'follow')} className='btn-secondary !text-[#fff] !bg-mernFont !text-[14px]'>
                关注
            </button>
            }
        </div>
    )
}

export default FollowBtn