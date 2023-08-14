import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/features/authSlice';
import { AppContext } from '../context/appContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingCover from '../components/atoms/LoadingCover';


const AuthProtectedRoute = ({children}) => {
    const {socket} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            setIsLoading(true);
            getCurrentUser();
        }
    }, [])

    const getCurrentUser = async () => {
        try {
            const response = await axios.get('user/currentUser');
            if(response.data.success) {
                dispatch( setUser({ user: response.data.user }) );
                socket.emit('new-conUser', response.data.user._id);
            }
        } catch(error) {
            const errorMsg = error.name === 'AxiosError' ? error.response.data.message : error.message;
            toast.error(errorMsg, { toastId: 'fetchUser-error' });
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    }

    if(!token) {
        return <Navigate to="/login" replace={true} /> 
    }
    
    return (
        isLoading 
        ? <LoadingCover />
        : children       
    );

}

export default AuthProtectedRoute