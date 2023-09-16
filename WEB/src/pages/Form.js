import React, { useState ,useRef,useEffect} from 'react';
import axios from 'axios'

//import Profile from "./Profile";

import "./App.css"

function Login() {
    
    function log() {
        window.location.href = "/pages/Form";
    }
    const [isClicked, setIsClicked] = useState(false);

   const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const passwordInputRef = useRef(null);
    const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);
    useEffect(() => {
        if (showPasswordForm) {
            passwordInputRef.current.focus();
        }
    }, [showPasswordForm]);
    const handleClick = () => {
        setIsClicked(true);
        // Your button click logic here
      };
    const handleNameSubmit = (event) => {
        event.preventDefault();
        // Handle name form submission here
        setShowPasswordForm(true);
    };
    function sub(event){
        event.preventDefault();
    }
    function handleSubmit(event) {
    
        event.preventDefault();
        setIsClicked(true);
        axios.post("/login", { username, password }).then((response) => {
            localStorage.clear();
            localStorage.setItem("token1", response.data.token1);
            const datenow = Date.now();
            localStorage.setItem('datenow',datenow);
            
            if(response.data.pos==='student' &&  response.data.token1){
                window.location.href = "./SProfile";
            }
            else if(response.data.pos==='teacher' &&  response.data.token1){
                window.location.href = "./TProfile";

            }
            

        })
            .catch((error) => {
                alert(error.response.data.message );
                console.log(error.response.data.message);
                setIsClicked(false);

        });
      
}

    return (
        <div >        <div className="back"  >
            <div className={isDesktop ? "login1" :"login"} >
                <h1 className="slide">LOGIN</h1>
                <div>
                    <form onSubmit={handleNameSubmit} >
                <input
                            className="form"
                type="text"
                placeholder="Name"
                    value={username}
                    
                onChange={(event) => setUsername(event.target.value)}
            />
           </form>
          
                    <form onSubmit={sub}>
                        <input
                            className="form"
                            type="password"
                            ref={passwordInputRef}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
          
                </form>
                </div>

                    <div  >
                        <button disabled={isClicked} type="submit" className={isDesktop ? "f1" :"f"}
                    onClick={handleSubmit}
            >SUBMIT</button>
                    </div>
                </div>


                </div>

        </div>
    );
}


export default Login;
