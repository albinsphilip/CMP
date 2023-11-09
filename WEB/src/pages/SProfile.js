import React, { useState, useEffect } from 'react';
import "./App.css"
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {FaBook,FaPen, FaHome,FaArrowCircleLeft} from 'react-icons/fa'


var b = true;

 function SProfile() {
    const [isClicked, setIsClicked] = useState(false);

    function Assig() {
        setIsClicked(true);
        window.location.href = "./Assignments";
    }
    function Sess() {
        setIsClicked(true);

        window.location.href = "./Sessionals";
    }
    function Cprofile(){
        setIsClicked(true);

        window.location.href = "./CSProfile";
    }
    const [t,setT]= useState(true);
    useEffect(() =>{
        if(localStorage.getItem('token1')=== null){
            setT(false);
        }
    });
       const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/student");
            const data = await response.json();
            setData(data);
        }
        fetchData();

        if (localStorage.getItem("token1")) {
            const intervalId = setInterval(() => {
                const currentDate = Date.now();
                const data = localStorage.getItem("token1");
                const datenow = localStorage.getItem("datenow");
                const decodedToken = jwtDecode(data);
                console.log(decodedToken.exp);
                if (decodedToken.exp * 1000 < currentDate - datenow) {
                    alert('Session Timeout\nRedirecting to login page');
                    navigate('/pages/Form', { replace: true });
                }
            }, 1000); // Check every second

            // Clear interval on unmount
            return () => clearInterval(intervalId);
        } else {
            navigate('/pages/Form', { replace: true });
        }
    }, [navigate]);
  
 
    function gohome(){
        window.location.href='/';
    }
  /*  useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to a new page and clear the history stack
            alert('Session Timeout\nRedirecting to login page');

            navigate('/pages/Form', { replace: true });
            window.location.reload();
        }, 600000); // 10 minutes in milliseconds

        return () => clearTimeout(timer);
    }, []);
*/const auth = {
    isAuthenticated: true,
    logout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100); // fake async
    }
  };
    const [data, setData] = useState(null);
    const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);
   
 
  
    function handleSubmit(event) {
        event.preventDefault();
            window.location.href = "./Attendance";

    }
  
    return<div>
        <div className={isClicked? 'Box':""}></div>
        {t?   <div className="c">
   {  auth.isAuthenticated ? <div>
    <button className={isDesktop ? "B1" : "B"}
      onClick={() => {
        auth.logout(() => {
        navigate('/pages/Form');
          // Clear your session as needed here.
          // If you're using Redux or Context API, you can dispatch a logout action.
          // To clear the session storage: sessionStorage.clear();
         localStorage.removeItem('token1');
          // To clear the cookies: document.cookie.split(";").forEach((c) => { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        });
      }}
    >
      <FaArrowCircleLeft/>   LOG OUT
    </button>
    </div>: <div className='c'>
    You are not logged in.
  </div>
  }
    
    
        <h2 className={isDesktop ? "attcont3" : "attcont2"}>WELCOME  {data ? data.name : <div className='loader1'></div>}</h2>
        <div className={isDesktop ? "attcont3" : "attcont2"} >
            <h2 >ABOUT</h2>
            <p className="container">NAME : {data ? data.name :<div className='loader1'></div>}</p>
            <p className="container">ROLL NO : {data ? data.rollno :<div className='loader1'></div>}</p>
            <p className="container">PHONE : {data ? data.phone : <div className='loader1'></div>}</p>
            <p className="container">FATHER'S NAME : {data ? data.fathersname : <div className='loader1'></div>}</p>
            <p className="container">MOTHER'S NAME : {data ? data.mothersname : <div className='loader1'></div>}</p>
          <button  className={isDesktop ? "b1" : "b"} 
                    onClick={Cprofile}
                ><FaPen/> COMPLETE YOUR PROFILE</button>
        </div>

        <div className={isDesktop ? "attcont3" : "attcont2"} >
           
        <div >
                <button  className={isDesktop ? "b1" : "b"} 
                    onClick={handleSubmit}
                ><FaBook/> ATTENDANCE</button>
              
        </div>
            <div>
                <button  className={isDesktop ? "b1" : "b"}
                    onClick={Assig}
            > <FaPen/>ASSIGNMENTS</button>
        </div>
        <div>
                <button className={isDesktop ? "b1" : "b"}
                    onClick={Sess}
            ><FaPen/>SESSIONALS</button>
        </div>
           

        </div>
        <div>
      
        </div>
        <div className="d">
             <button className={isDesktop ? "B1" : "B"}
                 onClick={gohome}
                             ><FaHome/> HOME</button>
             </div>
             </div>
 :<div className='c' >YOU ARE LOGGED OUT</div>
   }
    </div>


}
export default SProfile;
