import React, { useEffect } from 'react'
import BookmarksFeed from '../components/BookmarksPage/BookmarksFeed';
import { useOutletContext } from 'react-router-dom';

const BookmarksPage = () => {
	const {setActive, setIsUser} = useOutletContext();

	useEffect(() => {
		setActive(5);
		window.scrollTo(0,0);
		setIsUser(false);
	}, [])
  
	return (
		<BookmarksFeed />
	)
}

export default BookmarksPage