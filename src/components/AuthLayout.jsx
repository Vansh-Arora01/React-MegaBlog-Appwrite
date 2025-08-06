import { useState , useEffect} from "react";
import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// file name and function can be changedd 
// not manadatory to be same 
export default function Protected ({children , authentication = true}){
    const navigate = useNavigate()
    const [loader , setLoader]=useState(true)
    const authStatus =useSelector(state =>state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus !==authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)

    },[authStatus,navigate,authentication])



    return loader? <h1>Loading...</h1> : <>{children}</>
}