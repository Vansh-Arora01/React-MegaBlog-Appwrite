// import React from 'react'
// import { Link } from 'react-router-dom'
// import Logo from '../Logo'

// function Footer() {
//     return (
//         <section className="relative overflow-hidden py-10 bg-cyan-900 border border-t-2 border-t-black">
//             <div className="relative z-10 mx-auto max-w-7xl px-4">
//                 <div className="-m-6 flex flex-wrap">
//                     <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//                         <div className="flex h-full flex-col justify-between">
//                             <div className="mb-4 inline-flex items-center">
//                                 <Logo width="100px" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-400">
//                                     &copy; Copyright 2025. All Rights Reserved by Vansh.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-400">
//                                 Company
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Features
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Pricing
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Affiliate Program
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Press Kit
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-400">
//                                 Support
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Account
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Help
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Contact Us
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Customer Support
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-400">
//                                 Legals
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Terms &amp; Conditions
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Privacy Policy
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Licensing
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Footer


import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
    return (
        <footer className="
            relative overflow-hidden
            bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900
            text-gray-300
        ">
            {/* Decorative blur */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
                <div className="flex flex-wrap -m-6">

                    {/* Brand */}
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4">
                                <Logo width="110px" />
                            </div>

                            <p className="text-sm text-gray-400 leading-relaxed">
                                &copy; {new Date().getFullYear()} Vansh.  
                                <br />
                                All rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Company
                        </h3>
                        <ul className="space-y-4">
                            {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="/"
                                        className="
                                            text-sm font-medium
                                            hover:text-white
                                            transition-colors duration-200
                                        "
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Support
                        </h3>
                        <ul className="space-y-4">
                            {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="/"
                                        className="
                                            text-sm font-medium
                                            hover:text-white
                                            transition-colors duration-200
                                        "
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Legal
                        </h3>
                        <ul className="space-y-4">
                            {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="/"
                                        className="
                                            text-sm font-medium
                                            hover:text-white
                                            transition-colors duration-200
                                        "
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-10 border-t border-white/10 pt-6 text-center">
                    <p className="text-xs text-gray-400">
                        Built with ❤️ using React, Python & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
