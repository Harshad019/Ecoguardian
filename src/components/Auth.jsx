// components/Auth.js
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return ( <
        div > { isLogin ? < Login / > : < Signup / > } <
        div className = "text-center mt-4" >
        <
        button onClick = {
            () => setIsLogin(!isLogin) }
        className = "text-blue-600 hover:underline" >
        { isLogin ? "Need an account? Sign up" : "Have an account? Login" } <
        /button> <
        /div> <
        /div>
    );
};

export default Auth;