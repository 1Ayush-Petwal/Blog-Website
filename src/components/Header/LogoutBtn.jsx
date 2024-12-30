import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import authService from '../../services/auth'
import {Button}  from '../index'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        //Returns us a promise
        authService.logout()
        .then(() => {
            dispatch(logout());
        })
        navigate('/');
    }
  return (
    <Button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}>
        Logout
    </Button>
  )
}

export default LogoutBtn