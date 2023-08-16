import React from 'react'

const ModalLayout = ({children, optionStyle}) => {
    return (
        <div className='fixed z-[200] inset-0 w-full h-screen min-w-[350px] overflow-auto bg-[rgba(0,0,0,0.4)] flex justify-center'>
            <div className={`w-full h-full bg-white flex flex-col  px-[8px] overflow-scroll 480px:w-[90%] 480px:h-max 480px:rounded-[16px] 480px:px-[16px] 480px:pt-[4px] 480px:pb-[10px] 480px:overflow-visible 
                ${optionStyle}`}>
                
                {children}
                
            </div>
        </div>
    )
}

export default ModalLayout