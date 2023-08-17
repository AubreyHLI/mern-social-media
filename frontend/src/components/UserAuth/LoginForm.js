import React, { useState } from 'react'
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from '../atoms/Input'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setLogin } from '../../redux/features/authSlice';

const loginSchema = yup.object().shape({
    email: yup.string().email("邮箱格式填写错误").required("请填写电子邮箱"),
    password: yup.string().required("请输入密码"),
})


const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try{
            setIsLoading(true);
            // check validity
            const validValuesObj = await loginSchema.validate({
                email: email,
                password: password
            });
            const loginResponse = await axios.post(`user/login`,
                validValuesObj
            );
            dispatch( setLogin(
                { token: loginResponse.data.token }
            ) );
            setIsLoading(false);
            toast.success('登录成功！', { toastId: 'login-success' });
            navigate('/');
        } catch(error) {
            const errorMsg = axios.isAxiosError(error) ? error.response?.data?.message : error.message;
            setIsLoading(false);
            toast.error(errorMsg, { toastId: 'login-error' });
        }
    }

    return (
        <div className='my-0 mx-auto px-[32px] h-full min-w-[350px] max-w-[800px]'>                
            <h1 className="text-[24px] my-[16px]">请通过电子邮箱登陆账号</h1>
            <form>
                <Input type='email' id='email' inputName='email' placeholder='Email' inputValue={email} setInputValue={setEmail}/>
                <Input type='password' id='password' inputName='password' placeholder='密码' inputValue={password} setInputValue={setPassword}/>
            </form>
            <button className='btn-primary' onClick={handleLogin}>登陆</button>
            <div className='text-center py-[16px] text-[rgb(147,145,145)]'>
                <p>Don't have an account ?<Link to='/signup' className='switch-link'>立即注册</Link></p>
            </div>
        </div>
    )
}

export default LoginForm