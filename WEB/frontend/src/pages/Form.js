import React, { useState } from 'react';
import axios from 'axios'
import  Home  from "./Home";

import "./App.css"

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    function handleSubmit(event) {

        event.preventDefault();

        axios.post("/api/login", { username, password }).then((response) => {

            localStorage.setItem("token", response.data.token);
            window.location.href = {Home};
        })
            .catch((error) => {
            alert(error.response.data.message);
        });
}

    return (
        
        <div className="App-header"  >
           
            <h1 className ="slide">LOGIN</h1>
                <form onSubmit={handleSubmit} >
                <input
                
                type="text"
                placeholder="Name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
           </form>
          
                <form onSubmit={handleSubmit} >
            <input
                type="text"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
          
                </form>
    
                <div >
                <button type="submit"      
            >submit</button>
            </div>
           
          
        </div>
    );
}


export default Login;
