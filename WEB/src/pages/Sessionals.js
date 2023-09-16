import React,{useEffect,useState} from "react"
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import {FaHome} from 'react-icons/fa'
var b = true;

function Sessionals() {
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
    function gohome(){
        window.location.href='/';
    }
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/student");
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);
  
   
    const subSessional = (data) => {
        if (!data) return [];

     
        let result = [];

        for (let sub in data.sessionals) {
            let subject = data.sessionals[sub].map(item => ({series:item.series, subject: sub , value: item.value }));
            result.push(...subject);
        };

        return result;
       
    }



    return  <div className="c" >

<div >

    <h1>Sessionals</h1>
   
        {subSessional(data).length > 0 ?
            <ul class="no-bullets">
                <h4>Series    Subject    Marks</h4>
                {subSessional(data).map((item) => (
                    <li className={isDesktop ? "attcont1" : "attcont"} key={item.series}>
                         {item.series}  {item.subject}  {item.value} 
                    </li>
                ))}
                </ul>
                
          :  <div>
           <h2>No Sessionals Found</h2>

      
            </div>
            
            }
            </div>
         
            <div className="d">
             <button className={isDesktop ? "B1" : "B"}
                 onClick={gohome}
                             ><FaHome/> HOME</button>
             </div>
                      
    
</div>
}
export default Sessionals