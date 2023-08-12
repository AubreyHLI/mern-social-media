import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import Header from '../components/Layout/Header';
import AddPostForm from '../components/Post/AddPostForm';
import Posts from '../components/Post/Posts';
import { useSelector } from 'react-redux';

const Home = () => {
    const user = useSelector(state => state.auth.user);
    const {setActive, setIsUser} = useOutletContext();

    useEffect(() => {
        setActive(1);
        window.scrollTo(0,0);
        setIsUser(false);
    }, [])

    return (
        <div className='mainWrapper'>
            <Header heading='首页' />

            {/* TweetBox */}
            <div className='w-full hidden borderBottom 480px:flex 480px:justify-center'>
               <AddPostForm />
            </div>

            {/* Posts */}
            <div className='w-full border-t-[1.5px] border-t-mernBorder'>
                <Posts userId={user?._id} />
            </div>
        </div>
    )
}

export default Home