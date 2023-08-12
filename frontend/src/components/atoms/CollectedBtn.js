import React from 'react'
import TooltipBox from './TooltipBox';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

const CollectedBtn = ({postId, collects, handleCollect}) => {
	const isCollected = collects?.includes(postId);

	return (
		<>
			<TooltipBox tip={isCollected ? '取消收藏' : '收藏'} Icon={isCollected ? StarOutlinedIcon : StarOutlineOutlinedIcon} 
				iconStyle={`!text-[21px] ${isCollected && '!text-[#ffc823]'}`} option='hover-div:text-[#ffbb00] hover-div:bg-[#fff3da]'
				handleOnClick={(e) => handleCollect(e)}
			/>
		</>
	)
}

export default CollectedBtn