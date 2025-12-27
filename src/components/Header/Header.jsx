// import React from 'react';
// import {Container , Logo,LogoutButton} from '../index' 
// import {Link } from 'react-router-dom'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// function Header(){
//     const authStatus = useSelector((state)=>state.auth.status)
//     const navigate = useNavigate()
//     const navitems =[
//          {
//       name: 'Home',
//       slug: "/",
//       active: true
//     }, 
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//   },
//   {
//     // DID A NORMAL CHANGE TO SEE
//       name: "All Post",
//       slug: "/all-posts",
//       active: authStatus,
//   },
//   {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//   },
//     ]
    
//     return(
//        <header className='py-3 shadow bg-cyan-900'>
//         <Container>
//             <nav className='flex'>
//                 <div className='mr-4'>
//                     <Link to='/'>
//                     <Logo width='70px'/>
//                     </Link>

//                 </div>
//                 <ul className='flex ml-auto'> 
//                     {navitems.map((item)=> 
//                     item.active ? (
//                         <li key ={item.name}>
//                             <button
//                             onClick={()=> navigate(item.slug)}
                            
//                             className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
//                                 {item.name}</button>
//                         </li>
//                     ): null)}
//                     {authStatus && (
//                         <li>
//                             <LogoutButton />
//                         </li>
//                     )}
//                 </ul>
//             </nav>
//         </Container>
//        </header>
//     )
// }
// export default Header;


import React from 'react';
import { Container, Logo, LogoutButton } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navitems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "My-posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="
            sticky top-0 z-50
            backdrop-blur-lg
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
            shadow-lg
        ">
            <Container>
                <nav className="flex items-center py-3">
                    {/* Logo */}
                    <div className="mr-6 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo width="70px" />
                            <span className="hidden sm:block text-white font-bold text-lg tracking-wide">
                                MegaBlog
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <ul className="ml-auto flex items-center gap-2">
                        {navitems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="
                                            px-5 py-2 rounded-full
                                            text-white text-sm font-medium
                                            transition-all duration-300
                                            hover:bg-white/20
                                            hover:shadow-md
                                            active:scale-95
                                        "
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {/* Logout */}
                        {authStatus && (
                            <li className="ml-2">
                                <LogoutButton />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
