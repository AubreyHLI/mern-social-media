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
import { toast } from 'react-toastify';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { converBase64 } from '../../helpers/imageUploadHelper';
import ModalLayout from '../Layout/ModalLayout';


const editSchema = yup.object().shape({
    username: yup.string().required("用户名不能为空"),
    location: yup.string().required("请填写地区"),
})


const EditProfileInfo = ({setOpen}) => {
    const [isLoading, setIsLoading] = useState(false);
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

    const addCover = async (e) => {
        const file = e.target.files[0];      
        const base64 = await converBase64(file);
        setCover(base64);
    }

    const clickUploadAvatar = e => {
        e.preventDefault();
        avatarFilePickerRef.current.click();
    }

    const addUserAvatar = async (e) => {
        const file = e.target.files[0];
        const base64 = await converBase64(file);
        setAvatar(base64);
    }

    const handleChangeProfile = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
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
            dispatch( setUser(
                { user: response.data.updatedUser }
            ) );
            dispatch( setSomePosts(
                { profile: response.data.updatedUser }
            ) );
            setIsLoading(false);
            toast.success('资料更新成功', { toastId: 'editProfile-success' });
            setOpen(false);
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            setIsLoading(false);
            toast.error(errorMsg, { toastId: 'editProfile-error' });
        }
    }
   

    return (
        <ModalLayout optionStyle='480px:mt-[40px] 480px:max-w-[600px] 480px:max-h-[650px]'>
            <div className='w-full h-[60px] px-[10px] flex justify-between items-center 480px:h-[44px] 480px:px-[2px]'>
                <div className='flex items-center gap-[10px]'>
                    <div onClick={() => setOpen(false)} className='w-[34px] h-[34px] rounded-[50%] normalFlex cursor-pointer transition-colors duration-200 ease-out hover:bg-mernBorder'>
                        <CloseIcon fontSize='medium'/>
                    </div>
                    <h1 className='font-[500] text-[20px]'>编辑个人资料</h1>
                </div>
                <button onClick={(e) => handleChangeProfile(e)} className='btn-secondary !text-[#fff] !bg-mernFont' disabled={isLoading}>
                    {isLoading ? <><LoadingSpinner styleOption='!w-[12px] !h-[12px] mr-[4px] border-[2px]'/>保存中</> : <>保存</> }
                </button>
            </div>

            
            <div>
                <div className='relative mx-[-10px]'>
                    <div className='brightness-75'>
                        <div className='h-[150px] 480px:h-[200px] bg-[#e5e5e5]'>
                            <Cover coverImg={cover ? cover : (user?.coverImage?.url)} />
                        </div>
                    </div>
                    <input type='file' name='cover' ref={coverFilePickerRef} onChange={addCover} className='hidden'/>
                    <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        <TooltipBox Icon={AddAPhotoIcon} handleOnClick={clickUploadCover} tip='修改封面图片' option='hover-div:bg-mernBorder child:bg-white child:opacity-80' iconStyle='!text-[19px]' />
                    </span>
                </div>

                
                <div className='relative mb-[50px]'> 
                    <div className='absolute -top-[45px] 600px:-top-14 border-2 border-[#fff] rounded-full bg-white'>
                        <Avatar src={avatar ? avatar : (user?.imageUrl?.url) } alt='' sx={{ width: 100, height: 100 }} className='border-2 brightness-90'/>
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
                    <Input type='text' id={bio} placeholder='个性签名' inputValue={bio} setInputValue={setBio} wordLimit={200}/>
                </div>
                <div>
                    <Input type='text' id={location} placeholder='地区' inputValue={location} setInputValue={setLocation} wordLimit={50}/>
                </div>
            </div>
        </ModalLayout>
    )
}

export default EditProfileInfo