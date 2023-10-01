import React, { useState, useEffect } from 'react';
import "./App.css"
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {FaTimes,FaMinusCircle,FaSortDown,FaArrowCircleLeft} from 'react-icons/fa'
import axios from 'axios'

var b = true;

function AProfile(){
    const [t,setT]= useState(true);
    useEffect(() =>{
        if(localStorage.getItem('token1')=== null){
            setT(false);
        }
    });
    const [selectDept,setSelectedDept] = useState({});

    let val = Object.keys(selectDept).length;
    const [adddep,setAdddep] = useState(true);
    const [addusers,setAddusers] = useState(true);
    const [showdep,setShowdep] = useState(false);
    const [str,setStr] = useState('');
    const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);
    const [data,setData] =useState(null);
    const [all,setAll] =useState(null);
    const [dept,setDept] = useState('');
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [pass,setPass] = useState('');
    const [pos,setPos]= useState('');
    const [removedep,setRemovedep] = useState(true);
    const [arr,setArray] = useState('');


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
    const auth = {
        isAuthenticated: true,
        logout(cb) {
          this.isAuthenticated = false;
          setTimeout(cb, 100); // fake async
        }
      };
      const handleaddDept =  (event) => {
        event.preventDefault();
        
        const newSelectDept = [
          ...selectDept,
           dept,
        ];
       const d=dept;
        // Update the state
        setSelectedDept(newSelectDept);
        if (window.confirm("Do you want to continue?")) {
       
         

         axios.post("/adddept", {d}).then((response) => {
               
           
        })
            .catch((error) => {
                alert(error.response.data.message );
                console.log(error.response.data.message);
               

        });
      
        setAdddep(true);
    }
    
      };
      const handleaddusers = (item,event) => {
        event.preventDefault();
       if(username && name && pass && pos){
        if (window.confirm(" Do you want to continue?")) {
       
        axios.post("/adduser", { username, pass,pos,name,item }).then((response) => {
       
         
        
         alert(response.data.message);  


      })
          .catch((error) => {
              alert(error.response.data.message );
              console.log(error.response.data.message);

      });
    }
       }
       else{
        alert('please fill all details');
       }
     
        setAddusers(true);
      };
      function sub(event){
        event.preventDefault();
      }
      useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/alltotal");
            const data = await response.json();
            setAll(data);
        }
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/student");
            const data = await response.json();
            setData(data);
           
            if (data.depts && Array.isArray(data.depts.dept)) {
              setSelectedDept(data.depts.dept);
          }
      
        
      }
        fetchData();
    }, []);
    




    const pro = (data,dep) => {
        if (!data) return [];
    let result = data.filter(item => item.dep === dep)
    .map(item => ({pos:item.pos, name: item.name, class: item.class, phone: item.phone }));
    
   return result;
       
    }
    async function showdepp(i){
      if(!removedep){
        if(window.confirm("Are you sure you want to remove this Department?")){
          const it = i;
          if(Object.keys(selectDept).length!==0){
            
          const arr = selectDept.find(item => item === i);
          console.log(arr);
          setSelectedDept(selectDept.filter(item => item !== i));
          
           axios.post("/removeDept",{arr}).then((response) =>{
            
            alert("Department Removed");
           }).catch((error) => {
            alert(error.response.data.message );
            console.log(error.response.data.message);
           

    });
        }
      }}
      else{
        setStr(i);
        setShowdep(prevShowatt => !prevShowatt);
      }
    }
    const dep = (data)=>{
        if (!data) return [];
        let result = []
        for (let s in data){
            result.push(data[s]);
        } 
        return result;
    }



      return <div>
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
  
  
      <h1>WELCOME  ADMIN :{data ? data.name : 'Loading...'}</h1>
      <div >
          <h2 >ABOUT</h2>
          <p className="container">NAME : {data ? data.name : 'Loading...'}</p>
          <p className="container">ROLL NO : {data ? data.rollno : 'Loading...'}</p>
          <p className="container">PHONE : {data ? data.phone : 'Loading...'}</p>
          <p className="container">FATHER'S NAME : {data ? data.fathersname : 'Loading...'}</p>
          <p className="container">MOTHER'S NAME : {data ? data.mothersname : 'Loading...'}</p>
          <p className="container">NAME : {data ? data.name : 'Loading...'}</p>
          <p className="container">NAME : {data ? data.name: 'Loading...'}</p>
      </div>
      <h1>NOTE:</h1>
      <p>You are the admin of this portal, you have control over the server and can edit profiles and can send notifications. So, be responsible of whatever changes you make here and please contact the developers for any issues.</p>
      <h1>DEPARTMENTS</h1>
      <div  >
      
       
         
       { dep(selectDept).map((item, index) => (
  <div  key={index}>
    <div>
      {!showdep? <div>
    <button
      className={isDesktop ? "b1" : "b"}
      onClick={() => showdepp(item)}
    >
     {item}  {removedep && <FaSortDown/>} {!removedep && <FaMinusCircle/>}
    </button></div>:<div> </div>}
    </div>
    {showdep && str === item && (
      <div>
        <h2>{item}</h2>
        <ul>
        {
    ['teacher', 'student'].map((type) => (
        <>
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)}s</h2>
            {pro(all, item).filter(item => item.pos === type).map((item,index) => (
                 <li className={isDesktop ? "attcont1" : "attcont"}> Name:{item.name} Class: {item.class} Phone:{item.phone}</li>
            ))}
        </>
    ))
}
        </ul>
      </div>
    )}
   
 
 {showdep && str===item? <div>
  {addusers ? (
  <div>
    <button
      className={isDesktop ? "b1" : "b"}
      onClick={() => setAddusers(false)}
    >
      ADD USERS +
    </button>
  </div>
) : (
  <div>
{ <div>
    <form onSubmit={sub}>
      <input
        className="form"
        type="username"
        placeholder="Add Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

    
    </form>
    <form onSubmit={sub}>
      <input
        className="form"
        type="username"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

    
    </form>
    <form onSubmit={sub}>
      <input
        className="form"
        type="username"
        placeholder="Password"
        value={pass}
        onChange={(event) => setPass(event.target.value)}
      />

    
    </form>
    <form onSubmit={sub}>
      <input
        className="form"
        type="username"
        placeholder="Position"
        value={pos}
        onChange={(event) => setPos(event.target.value)}
      />

    
    </form>
    <button
        className={isDesktop ? "b1" : "b"}
        onClick={(event)=>{handleaddusers(item,event)}}
      >
        ADD
      </button>
      <button
        className={isDesktop ? "b1" : "b"}
        style={{backgroundColor:'#f84b4b'}}
        onClick={()=>setAddusers(true)}
      >
       {<FaTimes/>} CANCEL
      </button></div>}
  </div>
)}
 {(!adddep || addusers) &&<div>
     <button
      className={isDesktop ? "b1" : "b"}
      onClick={() => setShowdep(prevShowatt => !prevShowatt)}
      style={{backgroundColor:'lightblue'}}
    >
     BACK
    </button></div>}</div>:<div></div>}
    </div>
))} 
</div>
        
   {adddep ? (
  <div>
    {removedep && !showdep && <div>
    <button
      className={isDesktop ? "b1" : "b"}
      onClick={() => setAdddep(false)}
    >
      ADD DEPARTMENTS +
    </button>
    
    <button
      className={isDesktop ? "b1" : "b"}
      onClick={() => {setRemovedep(false)}}
      style={{backgroundColor:'#f84b4b'}}
    >
     <FaMinusCircle/> REMOVE DEPARTMENT
    </button>
    </div>}
  </div>
) : (
  <div>
   
    <form onSubmit={handleaddDept}>
      <input
        className="form"
        type="username"
        placeholder="Add Name"
        value={dept}
        onChange={(event) => setDept(event.target.value)}
      />

      <button
        className={isDesktop ? "b1" : "b"}
        onClick={() => handleaddDept}
      >
        ADD
      </button>
      <button
        className={isDesktop ? "b1" : "b"}
        style={{backgroundColor:'#f84b4b'}}
        onClick={() => setAdddep(true)}
      >
        {<FaTimes/>} CANCEL
      </button>
    </form>
  </div>
)}
{!removedep && <div>
  <button
      className={isDesktop ? "b1" : "b"}
      onClick={() => {setRemovedep(true)}}
      style={{backgroundColor:'lightblue',fontStyle:'bold'}}
    >
     BACK
    </button>
  </div>}

     

      <div>
    
      </div>
    
           </div>
:<div className='c' >YOU ARE LOGGED OUT</div>
 }
  </div>
}
export default AProfile