import React, { useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import SinglePost from '../components/Post/SinglePost';

const PostPage = () => {
	const { postId } = useParams();
	const { setIsUser } = useOutletContext();

	useEffect(() => {
        window.scrollTo(0,0);
		setIsUser(false);
    }, [])

	return (
		<SinglePost postId={postId} />
	)
}

export default PostPage