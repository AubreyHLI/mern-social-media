import React from 'react'

const Cover = ({coverImg}) => {
    return (
     <>
        { coverImg 
        ? <img src={coverImg} alt='' className='object-cover w-full h-full'/>
        : <div className='bg-[#e5e5e5] w-full h-full'></div> 
        }
    </>
    )
}

export default Cover