import React, { useEffect, useRef, useState } from 'react'
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/features/authSlice';
import { setSomePosts } from '../../redux/features/postsSlice';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import Cover from '../atoms/Cover';
import TooltipBox from '../atoms/TooltipBox';
import Input from '../atoms/Input';
import * as yup from "yup";
import axios from 'axios';


const editSchema = yup.object().shape({
    username: yup.string().required("用户名不能为空"),
    location: yup.string().required("请填写地区"),
})


const EditProfileInfo = ({setOpen}) => {
    const [cover, setCover] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const coverFilePickerRef = useRef();
    const avatarFilePickerRef = useRef();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setUsername(user?.username);
        setLocation(user?.location);
        setBio(user?.bio);
        setEmail(user?.email);
    }, [])

    const clickUploadCover = e => {
        e.preventDefault();
        coverFilePickerRef.current.click();
    }

    const addCover = e => {
        const file = e.target.files[0];
        setCover(file);
    }

    const clickUploadAvatar = e => {
        e.preventDefault();
        avatarFilePickerRef.current.click();
    }

    const addUserAvatar = e => {
        const file = e.target.files[0];
        setAvatar(file);
    }

    const handleChangeProfile = async (e) => {
        e.preventDefault();
        try {
            const validValuesObj = await editSchema.validate({
                username: username,
                location: location,
            });
            const newFormData = new FormData();
            for(let value in validValuesObj) {
                newFormData.append(value, validValuesObj[value])
            }
            newFormData.append('bio', bio);
            if(cover) newFormData.append('cover', cover);
            if(avatar) newFormData.append('avatar', avatar);

            const response = await axios.patch(`user/editProfileInfo`,
                newFormData
            );
            if(response.data.success) {
                dispatch( setUser({ user: response.data.updatedUser }) );
                dispatch( setSomePosts({ profile: response.data.updatedUser }) );
                setOpen(false);
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
    }
   

    return (
        <div className='fixed z-[200] inset-0 w-full h-screen min-w-[350px] overflow-auto bg-[rgba(0,0,0,0.4)] flex justify-center'>
            <div className='w-full h-full bg-white flex flex-col pt-[4px] pb-[24px] px-[8px] overflow-scroll 480px:mt-[40px] 480px:w-[90%] 480px:max-w-[600px] 480px:h-max 480px:max-h-[650px] 480px:rounded-[16px] 480px:px-[16px] 480px:overflow-visible'>
                <div className='w-full py-[5px] flex justify-between items-center'>
                    <div className='flex items-center gap-[20px]'>
                        <div onClick={() => setOpen(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex cursor-pointer transition-colors duration-200 ease-out hover:bg-mernBorder'>
                            <CloseIcon fontSize='medium'/>
                        </div>
                        <h1 className='font-[500] text-[20px]'>编辑个人资料</h1>
                    </div>
                    <button onClick={(e) => handleChangeProfile(e)} className='btn-secondary !text-[#fff] !bg-mernFont'>
                        保存
                    </button>
                </div>

                
                <div>
                    <div className='relative mx-[-10px]'>
                        <div className='brightness-75'>
                            <div className='h-[120px] 600px:h-[200px] bg-[#e5e5e5]'>
                                <Cover coverImg={cover ? URL.createObjectURL(cover) : user?.coverImage?.url} />
                            </div>
                        </div>
                        <input type='file' name='cover' ref={coverFilePickerRef} onChange={addCover} className='hidden'/>
                        <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                            <TooltipBox Icon={AddAPhotoIcon} handleOnClick={clickUploadCover} tip='修改封面图片' option='hover-div:bg-mernBorder child:bg-white child:opacity-80' iconStyle='!text-[19px]' />
                        </span>
                    </div>

                    
                    <div className='relative mb-[50px]'> 
                        <div className='absolute -top-[45px] 600px:-top-14 border-2 border-[#fff] rounded-full bg-white'>
                            <Avatar src={avatar ? URL.createObjectURL(avatar) : `${user?.imageUrl?.url}`} alt='' sx={{ width: 100, height: 100 }} className='border-2 brightness-90'/>
                            <input type='file' name='picture' ref={avatarFilePickerRef} onChange={addUserAvatar} className='hidden'/>
                            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                                <TooltipBox Icon={AddAPhotoIcon} handleOnClick={clickUploadAvatar} tip='修改头像' option='hover-div:bg-mernBorder child:bg-white child:opacity-80' iconStyle='!text-[19px]' />
                            </span>
                        </div>
                    </div>
                    
                    <div>
                        <Input type='email' id={email} placeholder='Email' inputValue={email} setInputValue={setEmail} disabled={true}/>
                    </div>
                    <div>
                        <Input type='text' id={username} placeholder='用户名' inputValue={username} setInputValue={setUsername} wordLimit={30}/>
                    </div>
                    <div>
                        <Input type='text' id={bio} placeholder='个性签名' inputValue={bio} setInputValue={setBio} wordLimit={160}/>
                    </div>
                    <div>
                        <Input type='text' id={location} placeholder='地区' inputValue={location} setInputValue={setLocation} wordLimit={30}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileInfo