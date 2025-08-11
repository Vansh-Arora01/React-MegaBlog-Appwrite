import React from 'react';
import logo from './logo.jpg'
function Logo(width='100px'){
    return (
        <div className="flex items-center">
      <img
        src={logo} // change to your logo path
        alt="App Logo"
        className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain"
      />
    </div>
  
    );
     
}
export default Logo