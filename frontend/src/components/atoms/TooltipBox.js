import React from 'react'

const TooltipBox = ({Icon, iconStyle, stati, tip, handleOnClick, option, statiHover, isActive}) => {
    return (
        <div onClick={handleOnClick} className={`relative flex items-center cursor-pointer child:transition-all child:ease-in 
            hover-div-span:visible hover-div-span:transition-visibility hover-div-span:duration-100 hover-div-span:delay-[0.9s]
            ${option ? option : 'hover-div:text-mernBlue hover-div:bg-[#e7f5fe]'} ${statiHover}`} >

            <div className={`normalFlex flex-col w-[36px] h-[36px] rounded-[50%]  ${isActive ? 'text-mernBlue bg-[#e7f5fe]': ''}`}>
                <Icon className={iconStyle}/>
                <span className='text-[#fff] bg-[rgb(90,96,100,0.7)] text-[11px] w-max py-[2px] px-[4px] rounded-[2px] text-center absolute top-[105%] z-1 invisible transition-visibility duration-100'>
                    {tip}
                </span>
            </div>
            { stati >= 0 &&
            <span className='py-0 px-[4px] text-[15px]'>{stati}</span>
            }
        </div>
    )
}

export default TooltipBox