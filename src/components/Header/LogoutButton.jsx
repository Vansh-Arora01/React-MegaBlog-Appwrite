import React from 'react';
import authservice from '../../appwrite/auth'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'



function LogoutButton(){
    const dispatch = useDispatch();
    const  logoutHandler =()=>{
        authservice.logout().then(()=>{
            dispatch(logout())
        })
    }
    return(
        <button
         className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
         onClick={logoutHandler}> Logout </button>
    )
}
export default LogoutButton;