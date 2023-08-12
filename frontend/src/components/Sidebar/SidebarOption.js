import React from 'react'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'

const SidebarOption = ({isActive, label, Icon, isHidden, path, avatar, notif}) => {
    const currentTab = window.location.pathname === path;
    
    return (
        <div className={`w-fit p-[8px] rounded-[30px] mb-[2px] hover:bg-[#212e3b12] 480px:p-[12px] 600px:px-[16px] 600px:w-full ${isActive && 'text-mernBlue'} ${isHidden && 'hidden 480px:block'}`} >
            <Link to={path}>
                <div className="relative flex items-center justify-start">
                    {Icon && <Icon className="!text-[28px] 600px:mr-[12px] 1200px:!text-[30px] 1200px:mr-[16px]"/>}
                    {avatar && <Avatar src={avatar} alt='profile' sx={{width:36, height:36}} className={`border ${isActive ? 'border-mernBlue' : ''} mt-[-4px] 480px:mt-0 600px:ml-[-5px] 600px:mr-[10px] 1200px:mr-[14px]`}/>}
                    <h2 className={`text-[19px] font-[400] hidden 600px:inline 1200px:text-[20px] ${isActive && 'font-[600]'}`}>
                        {label}
                    </h2>
                    {notif > 0 && <span className='absolute top-[-4px] left-[16px] w-fit h-fit min-w-[18px] px-[5px] rounded-[10px] bg-[#ff3040] text-white text-[12px] font-[500] flex justify-center'>{notif}</span>}                    
                </div>
            </Link>  
        </div>
    )
}

export default SidebarOption