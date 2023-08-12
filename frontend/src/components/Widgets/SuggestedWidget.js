import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import FollowCard from '../Follows/FollowCard';
import { AppContext } from '../../context/appContext';

const SuggestedWidget = () => {
	const { suggestedUsers, setSuggestedUsers } = useContext(AppContext);
	
	useEffect(() => {
		fetchSuggestedUsers();
	}, [])

	const fetchSuggestedUsers = async () => {
        try {
            const response = await axios.get('user/suggestedUsers');
            if(response.data.success) {
				setSuggestedUsers(response.data.suggestedUsers);
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
	}

	if(suggestedUsers.length < 1) {
		return
	}

	return (
		<div className='mt-[8px]'>
			<h2 className='text-[18px] font-[500] text-mernFont px-[16px] pt-[12px] pb-[8px]'>推荐关注</h2>
			
			<div>
				{suggestedUsers?.map(u => 
					<FollowCard key={u._id} profile={u} smallBtn={true}/>
				)}
			</div>
			<div className='text-left mt-[12px]'> 
				<button onClick={() => fetchSuggestedUsers()} className='outline-none border-none rounded-b-[20px] hover:underline hover:underline-offset-2 text-mernBlue text-[15px] px-[16px]'>
					加载更多
				</button>
			</div>
		</div>
	)
}

export default SuggestedWidget