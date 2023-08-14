import React, {useEffect, useRef, useState } from 'react';
import logo from "../assets/mern-social-media-high-resolution-logo-color-on-transparent-background.png";
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import axios from "axios";
import Input from '../components/atoms/Input';

const registerSchema = yup.object().shape({
    username: yup.string().required("用户名不能为空"),
    email: yup.string().email("邮箱格式填写错误").required("请填写电子邮箱"),
    password: yup.string().required("密码不能为空").min(6, "密码不能少于6个字符"),
    location: yup.string().required("请填写所在地"),
    picture: yup.string().required("请上传头像图片"),
})


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPW, setConfirmedPw] = useState('');
    const [avatar, setAvatar] = useState();
    const [location, setLocation] = useState("");
    const filePickerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const addUserImage = e => {
        const file = e.target.files[0];
        setAvatar(file);
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
            alert('Passwords does not match 密码不一致')
          }
        }
        return isValid;
    }


    const handleSignup = async () => {
        if(validatePassword()){
            try {
                const validValuesObj = await registerSchema.validate({
                    username: username,
                    email: email,
                    password: password,
                    location: location,
                    picture: avatar
                });
                const newFormData = new FormData();
                for(let value in validValuesObj) {
                    if(value === 'picture') newFormData.append(value, avatar);
                    else newFormData.append(value, validValuesObj[value]);
                }

                const signupResponse = await axios.post(`user/register`, newFormData );
                if(signupResponse.data.success) {
                    navigate('/login');
                }
            } catch(error) {
                if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
                else console.log('error:', error.message);
            }
        }
    }


    return (
       <div className='normalFlex flex-col w-full h-full min-w-[350px] bg-[white] overflow-scroll'>
            <div className="my-[30px] mx-auto">
                <Link to='/'><img className='w-[300px]' src={logo} alt=''/></Link>
            </div>
            <div className='my-0 mx-auto px-[32px] h-full min-w-[350px] max-w-[800px]'>                
                <h1 className="text-[24px] my-[16px]">注册新账号</h1>
                <form className='flex flex-col gap-[4px] 600px:flex-row 600px:gap-[30px]'>
                    <div className='flex items-end 600px:flex-col my-[12px] gap-[12px]'>
                        <Avatar alt='' src={`${avatar ? URL.createObjectURL(avatar) : ''}`} sx={{ width: 100, height: 100 }} className='border-2'/>
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
                <button className='btn-primary' onClick={handleSignup}>注册</button>
                <div className='text-center py-[16px] text-[rgb(147,145,145)]'>
                    <p>Already have an account ?<Link to='/login' className='switch-link'>登陆已有账号</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;