import React from 'react'
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import AddPostForm from '../Post/AddPostForm';

const NewPostModal = ({setOpen}) => {

    return ReactDOM.createPortal(
        <div className='fixed z-[200] inset-0 w-full h-screen min-w-[350px] overflow-auto bg-[rgba(0,0,0,0.4)] flex justify-center'>
            <div className='w-full h-full bg-white flex flex-col pt-[4px] pb-[10px] px-[8px] overflow-scroll 480px:mt-[120px] 480px:w-[90%] 480px:max-w-[600px] 480px:h-max 480px:max-h-[650px] 480px:rounded-[16px] 480px:px-[16px] 480px:overflow-visible'>
                <div className='w-full flex items-center gap-[20px] py-[5px]'>
                    <div onClick={() => setOpen(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex cursor-pointer transition-colors duration-200 ease-out hover:bg-mernBorder'>
                        <CloseIcon fontSize='medium'/>
                    </div>
                    <h1 className='font-[500] text-[20px]'>创作新动态</h1>
                </div>
               
                <div>
                    <AddPostForm 
                        minH={100} 
                        autoFocus={true} 
                        optionStyles='!flex-col 480px:!px-[8px] 480px:!pt-[8px]'
                        handleAfterSuccess={() => setOpen(false)} />
                </div>

            </div>
        </div>,  
        document.getElementById('portal')
    );
}

export default NewPostModal