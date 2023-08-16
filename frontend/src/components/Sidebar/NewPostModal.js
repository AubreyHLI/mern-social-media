import React from 'react'
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import AddPostForm from '../Post/AddPostForm';
import ModalLayout from '../Layout/ModalLayout';


const NewPostModal = ({setOpen}) => {

    return ReactDOM.createPortal(
        <ModalLayout optionStyle='480px:mt-[120px] 480px:max-w-[600px]  480px:max-h-[650px] '>
            <div className='w-full h-[60px] px-[10px] flex items-center gap-[10px] 480px:h-[44px] 480px:px-[2px]'>
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
        </ModalLayout>,  
        document.getElementById('portal')
    );
}

export default NewPostModal