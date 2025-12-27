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
         className='px-5 py-2 rounded-full
                                            text-white text-sm font-medium
                                            transition-all duration-300
                                            hover:bg-white/20
                                            hover:shadow-md
                                            active:scale-95'
         onClick={logoutHandler}> Logout </button>
    )
}
export default LogoutButton;