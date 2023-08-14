import React, {useEffect, useState} from 'react';
import logo from "../assets/mern-social-media-high-resolution-logo-color-on-transparent-background.png";
import axios from 'axios';
import Input from '../components/atoms/Input';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/features/authSlice';


const loginSchema = yup.object().shape({
    email: yup.string().email("邮箱格式填写错误").required("请填写电子邮箱"),
    password: yup.string().required("请输入密码").min(6, "密码不能少于6个字符")
})


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const handleLogin = async () => {
        try{
            // check validity
            const validValuesObj = await loginSchema.validate({
                email: email,
                password: password
            });
            const loginResponse = await axios.post(`user/login`,
                validValuesObj
            );
            if(loginResponse.data.success) {
                dispatch( setLogin({ token: loginResponse.data.token }) );
                navigate('/');
            }
        } catch(error) {
            if(error.name === 'AxiosError') console.log('error:', error.response.data.message);
            else console.log('error:', error.message);
        }
    }


    return (
        <div className='normalFlex flex-col w-full h-full min-w-[350px] max-w-[500px] mx-auto bg-[white] overflow-scroll'>
            <div className="my-[30px] mx-auto">
                <Link to='/'><img className='w-[300px]' src={logo} alt=''/></Link>
            </div>
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
        </div>
    )
}

export default Login;