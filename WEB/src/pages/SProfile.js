import React, { useState, useEffect } from 'react';
import "./App.css"
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {FaBook,FaPen, FaHome,FaArrowCircleLeft} from 'react-icons/fa'

function Assig() {

    window.location.href = "./Assignments";
}
function Sess() {

    window.location.href = "./Sessionals";
}
var b = true;

 function SProfile() {
    const [t,setT]= useState(true);
    useEffect(() =>{
        if(localStorage.getItem('token1')=== null){
            setT(false);
        }
    });
    setInterval(() => {
        const currentDate =Date.now();
        const data = localStorage.getItem("token1");
        const datenow = localStorage.getItem("datenow");
        if(data){
        const decodedToken = jwtDecode(data);
        console.log(decodedToken.exp);
        if(decodedToken.exp*1000 < currentDate-datenow && b){
            alert('Session Timeout\nRedirecting to login page');
            navigate('/pages/Form', { replace: true });
            localStorage.removeItem('token1');
            window.location.href='./Form';
            b=false;
        
        }
    }
    
    
    },   1 * 100);
  
    const navigate = useNavigate();
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
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/student");
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);
 
  
    function handleSubmit(event) {
        event.preventDefault();
            window.location.href = "./Attendance";

    }
  
    return<div>
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
    
    
        <h1>WELCOME  {data ? data.name : 'Loading...'}</h1>
        <div >
            <h2 >ABOUT</h2>
            <p className="container">NAME : {data ? data.name : 'Loading...'}</p>
            <p className="container">ROLL NO : {data ? data.rollno : 'Loading...'}</p>
            <p className="container">PHONE : {data ? data.phone : 'Loading...'}</p>
            <p className="container">FATHER'S NAME : {data ? data.fathersname : 'Loading...'}</p>
            <p className="container">MOTHER'S NAME : {data ? data.mothersname : 'Loading...'}</p>
            <p className="container">NAME : {data ? data.name : 'Loading...'}</p>
            <p className="container">NAME : {data ? data.name : 'Loading...'}</p>
        </div>

        <div  >
           
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
