import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import FollowCard from '../Follows/FollowCard';
import { AppContext } from '../../context/appContext';
import { toast } from 'react-toastify';

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
            const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchSuggest-error' });
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