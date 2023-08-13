import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TooltipBox from '../atoms/TooltipBox'

const Header = ({heading, withBackward, subHeading = null, subText='篇内容', children}) => {
    return (
        <div className={`sticky top-0 w-full z-[100] ${children ? 'h-[100px]' : 'h-[60px]'} bg-[#f6f8f8d9] backdrop-blur-[10px] flex flex-col justify-between  480px:bg-[#ffffffd9]`}>
            <div className={`flex h-[60px] items-center w-full px-[16px] ${withBackward && 'gap-[10px]'}`}>
                { withBackward && 
                <TooltipBox tip='返回' Icon={KeyboardBackspaceIcon} option={'hover-div:bg-mernBorder'}
                    handleOnClick={() => window.history.back()}/>
                }

                { subHeading !== null
                ? <div className='1200px:px-[10px] '>
                    <h2 className='text-[20px] font-[500] h-[30px] line-clamp-1'>{heading}</h2>
                    <p className='text-[15px] text-mernLightGray ml-[3px]'>{subHeading} <span className='ml-[4px]'>{subText}</span></p>
                </div>
                : <h2 className='text-[22px] font-[500] 1200px:px-[10px] line-clamp-1'>{heading}</h2>
                }
            </div>

            { children }

        </div>
    )
}

export default Header