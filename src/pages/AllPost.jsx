// import React,{useState,useEffect} from 'react';
// import appwriteservice from '../appwrite/conf'
// import { Container,PostCard } from '../components';

// // function AllPost(){
// //     // CHANGING IT BUT NOT THINK IT IS CORRECT CHANGING 
// //     const [posts,setPosts]= useState([])
// //     useEffect(()=>{
// //         appwriteService.getPosts([]).then((posts)=>{
// //             if(posts){
// //                 setPosts(posts.documents)
// //             }
// //         })

// //     },[])

// function AllPost() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
// appwriteservice.getPosts([]).then((posts) => {
//         if (posts) {
//             setPosts(posts.documents)
//         }
//     })
//     }, [])
    



//     return(
//         <div className='w-full py-8'> 
//         <Container>

//             <div className='flex flex-wrap'>
//                 {posts.map((post)=>(
//                    <div key={post.$id} className='p-2 w-1/4'>
//                     {/* A UPDATE KIYA HA IDHAR  */}
//                     {/* <PostCard  $id={post.$id} 
//   title={post.title} 
//   featuredImage={post.featuredImage}/>  */}
//                         <PostCard{...post}/>


//                     </div>

//                 ))}
//             </div>
//         </Container>

//         </div>
//     )
// }

// export default AllPost

// import React, { useState, useEffect } from 'react';
// import appwriteservice from '../appwrite/conf';
// import { Container, PostCard } from '../components';
// import { useSelector } from 'react-redux';
// import { Query } from 'appwrite';

// function AllPost() {
//     const [posts, setPosts] = useState([]);
//     const userData = useSelector((state) => state.auth.userData);

//     useEffect(() => {
//         if (!userData) return;

//         // 🔐 ONLY logged-in user's posts (active + inactive)
//         appwriteservice.getPosts([
//             Query.equal("userId", userData.$id)
//         ]).then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents);
//             }
//         });
//     }, [userData]);

//     return (
//         <div className="w-full py-8">
//             <Container>
//                 <div className="flex flex-wrap">
//                     {posts.map((post) => (
//                         <div key={post.$id} className="p-2 w-1/4">
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     );
// }

// export default AllPost;


import React, { useState, useEffect } from 'react';
import appwriteservice from '../appwrite/conf';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

function AllPost() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData) return;

        appwriteservice.getPosts([
            Query.equal("userId", userData.$id)
        ]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, [userData]);

    return (
        // 🔑 Key fix: min-h-screen + flex-grow
        <div className="w-full py-8 min-h-screen flex-grow">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
