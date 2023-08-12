import React, {useState, useEffect} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Input =  ({type, id, placeholder, inputName, inputValue, setInputValue, wordLimit, disabled=false}) => {
    const [isInputActive, setIsInputActive] = useState(false);
    const [pwVisible, setPsVisible] = useState(false);

    useEffect(() => {
        if(inputValue) {
            setIsInputActive(true);
        } else {
            setIsInputActive(false);
        }
    },[inputValue])

    // Update specific input field
    const handleInputChange = e => {
        e.preventDefault();
        setInputValue(e.target.value);
    }
    
    let inputType = type !=='password' ? type : (pwVisible ? 'text' : 'password');


    return (
        <label className='my-[24px] relative'> 
            
            <input type={inputType} id={id} name={inputName} onChange={handleInputChange} value={inputValue} maxLength={wordLimit} disabled={disabled}
                className='w-full h-[56px] outline-none text-[16px] pt-[20px] pb-[4px] px-[10px] my-[12px] border-[#cccccc] border rounded-[4px] 
                focus:border-mernBlue focus:border-2 focus:px-[9px] focus:pb-[4px] peer'
            />
            <span className={`placeholder absolute left-[10px] text-[rgb(147,145,145)] transition-all duration-200 
                ${isInputActive ? 'top-[-20px] text-[14px]' : 'top-[-10px] text-[18px]'}`}>
                {placeholder}
            </span>
            
            { type === 'password' && (
            <span className='absolute right-[15px] bottom-[2px]' onClick={() => setPsVisible(prev => !prev)}>
                {!pwVisible 
                ? <VisibilityIcon className='text-[20px] text-[#abaaaa]'/> 
                : <VisibilityOffIcon className='text-[20px] text-[#abaaaa]'/>}
            </span>
            )}

            { wordLimit &&
            <span className={`absolute right-[12px] top-[-90%] text-[rgb(147,145,145)] text-[14px] hidden peer-focus:block`} >
                {`${inputValue.length}/${wordLimit}`}
            </span>
            }
        </label>
    )
};

export default Input;