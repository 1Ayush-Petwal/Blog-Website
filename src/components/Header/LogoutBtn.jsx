import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import authService from '../../services/auth'
import {Button}  from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        //Returns us a promise
        authService.logout()
        .then(() => {
            dispatch(logout());
        }).catch((error) => {
          console.error('Logout failed', error);
        })
        .finally(() => {
          navigate('/');
          window.location.reload();
          console.log('Current User Data in the store, ', useSelector((state) => state.auth.userData));
        });
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