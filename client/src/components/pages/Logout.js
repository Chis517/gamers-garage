import React from "react";

const Logout=()=>{
    sessionStorage.clear();
    window.location.href='/';
}

export default Logout;