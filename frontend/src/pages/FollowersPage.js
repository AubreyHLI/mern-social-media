import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import FollowersList from '../components/Follows/FollowersList';

const FollowersPage = () => {
    const {setOpen} = useOutletContext();
    const [profileName, setProfileName] = useState('')

    useEffect(() => {
        setOpen(true);
    }, [])

    const closeModal = () => {
        setOpen(false);
        window.history.back();
    }

    return (
    <div className='fixed z-[200] inset-0 w-full h-full min-w-[350px] overflow-auto bg-mernModalBg flex justify-center 480px:h-screen'>
        <div className='w-full h-full bg-white flex flex-col pt-[4px] pb-[24px] px-[8px] overflow-scroll 480px:mt-[100px] 480px:w-[90%] 480px:max-w-[550px] 480px:h-max 480px:max-h-[90%] 480px:min-h-[300px] 480px:rounded-[16px] 480px:px-[16px] 480px:overflow-visible'>
            
            <div className='w-full pt-[5px] pb-[8px] relative'>
                <div onClick={closeModal} className='absolute w-[34px] h-[34px] rounded-[50%] normalFlex cursor-pointer transition-colors duration-200 ease-out hover:bg-mernBorder'>
                    <CloseIcon fontSize='medium'/>
                </div>
                <div className='w-full text-center'>
                    <h1 className='font-[500] text-[20px]'>关注 {profileName} 的用户</h1>
                </div>
            </div>

            <div className='border-t border-t-[rgb(219,219,219)] mx-[-16px]'>
               <FollowersList setProfileName={setProfileName} />
            </div>
        </div>
    </div>
    )
}

export default FollowersPage