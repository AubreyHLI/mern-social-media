import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';
import Widgets from './Widgets';

const CommonLayout = () => {
    const [active, setActive] = useState(0);
    const [isUser, setIsUser] = useState(false);

    return (
        <div className='w-full h-full flex'>
            {/* Sidebar */}
            <div className='sidebarContainer'>
                <Sidebar active={active} />
            </div>

            {/* Feed */}
            <div className='mainContainer'>
                <Outlet context={{setActive, setIsUser}} />
            </div>

            {/* Widgets */}
            <div className='widgetsContainer'>
                <Widgets isUser={isUser}/>
            </div>
        </div> 
    )
}

export default CommonLayout