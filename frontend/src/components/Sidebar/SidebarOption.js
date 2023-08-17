import React from 'react'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'

const SidebarOption = ({isActive, label, Icon, isHidden, path, avatar, notif}) => {
    const currentTab = window.location.pathname === path;
    
    return (
        <div className={`select-none w-[50px] h-[50px] flex justify-center items-center rounded-[30px] mb-[2px] hover:bg-mernBgDark 600px:px-[16px] 600px:w-full 600px:justify-start ${isActive && 'text-mernBlue'} ${isHidden && 'hidden 480px:flex'}`} >
            <Link to={path} className='w-full'>
                <div className="relative normalFlex 600px:justify-start">
                    {Icon && <Icon className="!text-[28px] 600px:mr-[12px] 1200px:!text-[30px] 1200px:mr-[16px]"/>}
                    {avatar && <Avatar src={avatar} alt='profile' sx={{width:36, height:36}} className={`border ${isActive ? 'border-mernBlue' : ''}  480px:mt-0 600px:ml-[-5px] 600px:mr-[10px] 1200px:mr-[14px]`}/>}
                    <h2 className={`text-[19px] font-[400] hidden 600px:inline 1200px:text-[20px] ${isActive && 'font-[600]'}`}>
                        {label}
                    </h2>
                    {notif > 0 && <span className='absolute top-[-4px] left-[16px] w-fit h-[18px] min-w-[18px] px-[4px] rounded-[10px] bg-[#ff3040] text-white text-[12px] font-[500] text-center'>{notif < 100 ? notif : '99+'}</span>}                    
                </div>
            </Link>  
        </div>
    )
}

export default SidebarOption