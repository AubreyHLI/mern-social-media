import React, { useImperativeHandle, useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import { converBase64 } from '../../helpers/imageUploadHelper';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CloseIcon from '@mui/icons-material/Close';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import i18n from '@emoji-mart/data/i18n/zh.json';
import TooltipBox from './TooltipBox';


const Tweetbox = ({sendForm, chooseAudience, submitBtnText, placeholder, userAvatar, wordLimit, minH=80, optionStyles}, formRef) => {
    const [userInput, setUserInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const filePickerRef = useRef(null);
    const textareaRef = useRef();

    const resetPostInput = () => {
        setIsLoading(false);
        setUserInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    }

    useImperativeHandle(formRef, () => {
        return {
            focusTextarea: () => textareaRef.current.focus(),
            resetPostInput,
        }
    }, []);

    const handleKeyup = () => {
        let prevH =  textareaRef.current.style.height;
        textareaRef.current.style.height ='auto';
        let scHeight = textareaRef.current.scrollHeight;
        if(prevH !== scHeight) {
            textareaRef.current.style.height = `${scHeight}px`;
        }
    }

    const addEmoji = e => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach( el => codesArray.push("0x" + el) );
        let emoji = String.fromCodePoint(...codesArray);
        setUserInput(prevInput => prevInput + emoji);
    }
    
    const addImg = async (e) => {
        const file = e.target.files[0];
        const base64 = await converBase64(file);
        setSelectedFile(base64);
    }

    const removeImg = () => {
        setSelectedFile(null);
        filePickerRef.current.value = null;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(isLoading) return;
        else setIsLoading(true);

        sendForm(userInput.trim(), selectedFile);
    }


    return (
        <div className={`sectionWrapper ${isLoading && 'disabled'} ${optionStyles}`} >
            <div className='section-left'>
                <Avatar alt='' src={userAvatar} className='avatar !w-[50px] !h-[50px] !cursor-auto hover:!brightness-100' />
            </div>
            <form ref={formRef} className='section-right'>
                <div>
                    {/* text */}
                    <div className='flex'>
                        <textarea maxLength={wordLimit} required placeholder={placeholder} ref={textareaRef} value={userInput}  onChange={ e => setUserInput(e.target.value)} onKeyUp={handleKeyup}
                            className={`!min-h-[${minH}px] flex-grow break-words text-[18px] font-[400] placeholder:text-[20px] leading-[24px] mt-[10px] mx-[2px] pb-[24px] outline-none border-none resize-none overflow-y-hidden text-mernFont`}
                        />
                    </div>

                    {/* image */}
                    { selectedFile && 
                    <div className='relative'>
                        <div onClick={removeImg} className='btn-close'><CloseIcon fontSize='sm' /></div>
                        <img src={selectedFile ? selectedFile : ''} alt="" className='rounded-[20px] max-h-[80px] object-contain'/>
                    </div> }
                    
                    {/* private or public */}
                    { chooseAudience && 
                    <div className='pb-[12px] borderBottom'>
                        <div className='ml-[-4px] px-[10px] py-[4px] normalFlex w-fit text-mernBlue rounded-[50px] transition-colors duration-200 ease-out hover:bg-[#e7f5fe]'>
                            <PublicOutlinedIcon fontSize='sm'/>
                            <span className='text-[12px] font-[600] ml-[2px] cursor-pointer'>所有人可见</span>
                        </div>
                    </div>}
                </div>

                { !isLoading &&
                <div className="flex justify-between mt-[12px] ml-[-4px] text-mernBlue">
                    <ul className="list-none flex items-center gap-[8px]">
                        <li>
                            <TooltipBox tip='图片' Icon={ImageOutlinedIcon} iconStyle='!text-[22px]' handleOnClick={() => filePickerRef.current.click()}/>
                            <input type='file' ref={filePickerRef} onChange={addImg} className='hidden' />
                        </li>
                        {/* <li>
                            <TooltipBox tip='GIF' Icon={GifBoxOutlinedIcon} iconStyle='!text-[22px]' handleOnClick={() => console.log('gif')} />
                        </li> */}
                        <li className='relative'>
                            <TooltipBox tip='Emoji' Icon={EmojiEmotionsOutlinedIcon} iconStyle='!text-[22px]' isActive={showEmojis} handleOnClick={() => setShowEmojis(!showEmojis)} />
                            { showEmojis && 
                            <div className='absolute select-none top-[100%] mt-[2px] ml-[-40px] w-fit z-[10] border-2 rounded-[10px]'>
                                <Picker data={data} i18n={i18n} searchPosition='none' onEmojiSelect={addEmoji} previewPosition='none' navPosition='top' maxFrequentRows='2' perLine='8'/>
                            </div>}
                        </li>
                        <li>
                            <TooltipBox tip='地点' Icon={LocationOnOutlinedIcon} iconStyle='!text-[22px]' handleOnClick={() => console.log('location')} />
                        </li>
                    </ul>
                    <button type="submit" onClick={handleSubmit} className={`btn-submit ${!userInput.trim() && !selectedFile ? 'disabled' : null}`}>
                        { submitBtnText }
                    </button>
                </div>
                }
            </form>
        </div>
    )

};

export default React.forwardRef(Tweetbox);