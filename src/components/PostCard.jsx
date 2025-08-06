import React from 'react';
import {Link} from 'react-router-dom'
// STILL HAVE TO FIGURE ABOUT THIS APPWRITESERVICE IMPORT STATEMENT 
import appwriteService from "../appwrite/conf"


function PostCard ({ 
    $id,title,featuredImage
}){
    // console.log('PostCard - featuredImage:', featuredImage);
    // console.log("Preview URL:", appwriteService.getFileView(featuredImage));

    return(
       <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl '>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFileView(featuredImage)} alt={title} className='rounded-xl' />

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>



        </div>
       </Link>
    )
}
export default PostCard
