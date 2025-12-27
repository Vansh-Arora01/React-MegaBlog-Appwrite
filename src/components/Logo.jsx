// import React from 'react';

// function Logo(width='100px'){
//     return (
//         <div className="flex items-center">
//       <img
//         src={logo} // change to your logo path
//         alt="App Logo"
//         className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain"
//       />
//     </div>
  
//     );
     
// }
// export default Logo
import logo from './logo.png'

import React from "react";

function Logo({ width = "72px", className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width, height: width }}
    >
      {/* Outer glow */}
      <div className="
        absolute inset-0 rounded-full
        bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
        blur-[6px] opacity-60
      " />

      {/* Gradient ring */}
      <div className="
        relative rounded-full p-[3px]
        bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
        shadow-xl
      ">
        {/* Inner background */}
        <div className="
          flex items-center justify-center
          rounded-full
          bg-white
          w-full h-full
          p-3
        ">
          <img
            src={logo}   // keep your existing path
            alt="Logo"
            className="
              w-full h-full
              object-contain
              rounded-full
              contrast-125
              saturate-110
              drop-shadow-sm
            "
          />
        </div>
      </div>
    </div>
  );
}

export default Logo;
