import React from 'react'
import { useSelector } from 'react-redux';
import TooltipBox from './TooltipBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const LikedBtn = ({likes, handleLike}) => {
	const user = useSelector(state => state.auth.user);
	const isLiked = likes[user?._id];
	let type = isLiked ? 'unlike' : 'like';

    return (
        <>
			<TooltipBox tip={isLiked ? '取消点赞' : '点赞'} stati={Object.keys(likes).length} 
				Icon={isLiked ? FavoriteIcon : FavoriteBorderIcon} iconStyle={`!text-[18px] ${isLiked && '!text-[rgb(249,24,128)]' }`} 
				option='hover-div:text-[#f91880] hover-div:bg-[#ffe9f3]' statiHover='hover-span:text-[#f91880]'
				handleOnClick={(e) => handleLike(e, type)}
			/>
        </>
    )
}

export default LikedBtn