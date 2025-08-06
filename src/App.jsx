import React from 'react';

import { useState ,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authservice from  './appwrite/auth'
import {login,logout} from "./store/authSlice"
import {Header ,Footer} from "./components"
import { Outlet } from 'react-router-dom'


import './App.css'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);

   const [loading,setloading] = useState(true);
   const dispatch = useDispatch()

   useEffect(()=>{
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })//Now we have to do loading false so we do it in finally block  
    .finally(()=>setloading(false))
   },[])



   return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className=' w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>

      </div>
    </div>
   ):null

}

export default App
