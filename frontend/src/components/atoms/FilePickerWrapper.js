import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const FilePickerWrapper = ({selectedFile, setSelectedFile}) => {
  return (
    <div className='relative'>
      <div onClick={() => setSelectedFile(null)} className='btn-close' >
          <CloseIcon fontSize='sm' />
      </div>
      <img src={`${selectedFile ? URL.createObjectURL(selectedFile) : ''}`} alt="" className='rounded-[20px] max-h-[80px] object-contain'/>
  </div> 
  )
}

export default FilePickerWrapper