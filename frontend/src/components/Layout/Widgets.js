import React from 'react'
import SuggestedWidget from '../Widgets/SuggestedWidget'
import SearchWidget from '../Widgets/SearchWidget'
import UserWidget from '../Widgets/UserWidget'

const Widgets = ({isUser=false}) => {
	
	return (
		<div className='w-full'>
			<SearchWidget />
			{!isUser && <UserWidget />}
			<SuggestedWidget />
		</div>
	)
}

export default Widgets