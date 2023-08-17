import React, { useRef, useState } from 'react'
import * as yup from "yup";
import { Avatar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import Input from '../atoms/Input';
import LoadingSpinner from '../atoms/LoadingSpinner';
import axios from 'axios';
import { converBase64 } from '../../helpers/imageUploadHelper';

const registerSchema = yup.object().shape({
    picture: yup.string().required("请上传头像图片"),
    location: yup.string().required("请填写所在地"),
    password: yup.string().required("密码不能为空").min(6, "密码不能少于6个字符"),
    email: yup.string().email("邮箱格式填写错误").required("请填写电子邮箱"),
    username: yup.string().required("用户名不能为空"),
})


const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPW, setConfirmedPw] = useState('');
    const [avatar, setAvatar] = useState();
    const [location, setLocation] = useState("");
    const filePickerRef = useRef();
    const navigate = useNavigate();

    const addUserImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await converBase64(file);
        setAvatar(base64);
    }

    const clickUploadPicture = e => {
        e.preventDefault();
        filePickerRef.current.click();
    }

    const validatePassword = () => {
        let isValid = true;
        if (password !== '' && confirmedPW !== ''){
          if (password !== confirmedPW ) {
            isValid = false;
            toast.error('密码与确认密码不一致，请重新填写');
          }
        }
        return isValid;
    }

    const handleSignup = async () => {
        if(validatePassword()){
            try {
                setIsLoading(true);
                const validValuesObj = await registerSchema.validate({
                    picture: avatar,
                    location: location,
                    password: password,
                    email: email,
                    username: username,
                });
                const newFormData = new FormData();
                for(let value in validValuesObj) {
                    newFormData.append(value, validValuesObj[value]);
                }

                await axios.post(`user/register`, newFormData );
                toast.success('注册成功，请登录', { toastId: 'signup-success' });
                setIsLoading(false);
                navigate('/login');
            } catch(error) {
                const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
                toast.error(errorMsg, { toastId: 'signup-error' });
                setIsLoading(false);
            }
        }
    }

    return (
        <div className='my-0 mx-auto px-[32px] h-full min-w-[350px] max-w-[800px]'>                
            <h1 className="text-[24px] my-[16px]">注册新账号</h1>
            <form className='flex flex-col gap-[4px] 600px:flex-row 600px:gap-[30px]'>
                <div className='flex items-end 600px:flex-col my-[12px] gap-[12px]'>
                    <Avatar alt='' src={avatar ? avatar : ''} sx={{ width: 100, height: 100 }} className='border-2'/>
                    <input type='file' name='picture' ref={filePickerRef} onChange={addUserImage} className='hidden'/>
                    <button onClick={clickUploadPicture} className="normalFlex rounded-[8px] py-[6px] pl-[8px] pr-[10px] text-white text-[14px] bg-emerald-500">
                        <AddIcon fontSize='medium'/>上传头像
                    </button> 
                </div>
                <div>
                    <Input type='text' id='username' inputName='username' placeholder='用户名' inputValue={username} setInputValue={setUsername} wordLimit={30}/>
                    <Input type='email' id='email' inputName='email' placeholder='Email' inputValue={email} setInputValue={setEmail} wordLimit={50}/>
                    <Input type='password' id='password' inputName='password' placeholder='密码' inputValue={password} setInputValue={setPassword} wordLimit={20}/>
                    <Input type='password' id='confirmPassword' inputName='confirmedPW' placeholder='确认密码' inputValue={confirmedPW} setInputValue={setConfirmedPw} />
                    <Input type='text' id='location' inputName='location' placeholder='地区' inputValue={location} setInputValue={setLocation} wordLimit={50}/>
                </div>
            </form>
            <button className='btn-primary' onClick={handleSignup} disabled={isLoading}>
                {isLoading 
                ? <div className='normalFlex gap-[5px]'><LoadingSpinner styleOption='!w-[16px] !h-[16px]' />注册中</div>
                : '注册' }
            </button>
        
            <div className='text-center py-[16px] mb-[16px] text-[rgb(147,145,145)]'>
                <p>Already have an account ?<Link to='/login' className='switch-link'>登陆已有账号</Link></p>
            </div>
        </div>
    )
}

export default SignupForm