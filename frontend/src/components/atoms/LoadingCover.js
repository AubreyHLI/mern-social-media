import React from 'react';
import logoS from '../../assets/logo-sm.png';

const LoadingCover = () => {
    return (
        <div className='w-full h-screen min-h-[600px] normalFlex flex-col pb-[80px]'>
            <img src={logoS} alt='' className='w-[200px]'/>
            <h1>Loading.....</h1>
        </div>
    )
}

export default LoadingCover