import React,{ useEffect,useState} from "react"
import "./App.css"
import {FaHome} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

var b = true;

function Assignments() {
    const [data, setData] = useState(null);
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

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/student");
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);
    function gohome(){
        window.location.href='/';
    }
    const subAtt = (data) => {
        if (!data) return [];

       
       let result = [];
     
        for (let sub in data.assignment) {
            let subject = data.assignment[sub].map(item => ({ subject: sub, date: item.date, value: item.value }));
            result.push(...subject);
        };

        return result;
       
    
}
    return <div className="c"> 

{subAtt(data).length > 0 ?<div>
    <h1 >Assignments</h1>

                         <ul>
                             {subAtt(data).map((item) => (
                                 <li  key={item.date}>
                                     <h2> {item.subject}</h2>  <div className={isDesktop ? "attcont1" : "attcont"}><h2> Assignment:</h2> {item.value}</div> <h2>Due date:  {item.date}</h2>
                                 </li>
                             ))}
                                                      </ul> </div >               :<div className="cont">
                                                        <h1>No Assignments so far</h1>
                                                        </div>}
                                                        <div className="d">
             <button className={isDesktop ? "B1" : "B"}
                 onClick={gohome}
                             ><FaHome/> HOME</button>
             </div>

    </div>
}
export default Assignments