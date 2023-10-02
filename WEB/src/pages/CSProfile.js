import React, { useState, useEffect } from 'react';
import "./App.css"
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {FaBook,FaPen, FaHome,FaArrowCircleLeft} from 'react-icons/fa'
import axios from 'axios'

var b = true;
function CSProfile(){

    const [data,setData] = useState(null);
    const [submitted,setSubmitted] = useState(true);
    const [roll,setRoll] = useState('');
    const [fname,setFname] = useState('');
    const [mname,setMname] = useState('');
    const [phone,setPhone] = useState('');
  
    function gohome(){
        window.location.href='./SProfile';
    }
    
    const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);
    setInterval(() => {
        const currentDate =Date.now();
        const data = localStorage.getItem("token1");
        const datenow = localStorage.getItem("datenow");
        const decodedToken = jwtDecode(data);
        console.log(decodedToken.exp);
        if(decodedToken.exp*1000 < currentDate-datenow && b){
            alert('Session Timeout\nRedirecting to login page');
            navigate('/pages/Form', { replace: true });
            window.location.href='./Form';
            b=false;
        
        }
        
    
    
    },   1 * 100);
    const navigate = useNavigate();
    function sub(event){
        event.preventDefault();
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/student");
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);
    
    function submit(event){

        event.preventDefault();
       
            if(roll && fname && mname && phone){
                if(window.confirm("Are you ready to submit?")){
            axios.post("/sprof", { roll,fname,mname,phone }).then((response) => {
                   
               setSubmitted(false);
            })
                .catch((error) => {
                    alert(error.response.data.message );
                    console.log(error.response.data.message);
                   
            });
        }
     
        }   else{
            alert("Please fill all details!");
        }
    }

    return <div className="c"> 
     <h1>PROFILE</h1>
    {submitted? <div>
        <div>
   
     <div className={isDesktop ? "row" : "rowm"}>
   
    <div className='cont'> 
     <form onSubmit={sub}>
     <h2>Roll Number:</h2>
      <input
        className="formm"
        type="username"
        placeholder="Roll Number"
        value={roll}
        onChange={(event) => setRoll(event.target.value)}
      />


    </form>
    </div>
    <div className='cont'> 
    <form onSubmit={sub}>
        <h2>Fathers Name:</h2>
      <input
        className="formm"
        type="username"
        placeholder="Fathers Name"
        value={fname}
        onChange={(event) => setFname(event.target.value)}
      />

    
    </form>
    </div>
    </div>
    <div className={isDesktop ? "row" : "rowm"}>
        <div className='cont'>  
  <form onSubmit={sub}>
    <h2>mothers Name:</h2>
      <input
        className="formm"
        type="username"
        placeholder="Mothers Name"
        value={mname}
        onChange={(event) => setMname(event.target.value)}
      />

    
    </form>
    </div>
    <div className='cont'>  
    <form onSubmit={sub}>

    <h2>Phone Number:</h2>
      <input
        className="formm"
        type="username"
        placeholder="Phone Number"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

    

    

    
    </form>
    </div>
</div>
</div>
<div >
    <button className={isDesktop ? "b1" : "b"}
                    onClick={submit}
            ><FaPen/>SUBMIT</button>
   
   </div>
   </div>:<div>
    <h2>Submitted...</h2>
   <button className={isDesktop ? "b1" : "b"}
                    onClick={()=>setSubmitted(true)}
            >GO BACK</button>
    </div>}
   
     <div className="d">
                 <button className={isDesktop ? "B1" : "B"}
                     onClick={gohome}
                                 > BACK</button>
                 </div>
    
        </div>



}

export default CSProfile;