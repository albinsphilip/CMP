import React,{ useEffect,useState} from "react"
import "./App.css"
import axios from 'axios'
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

var b = true;

function UAssignments() {
  if(localStorage.getItem("token1")){
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
        
    
    
    },   1 * 1000);
  }
  else{
    window.location.href='./Form';
  }
const navigate = useNavigate();
    const [flag,setFlag] = useState(false);
    const [assig,setAssig] = useState('');
    var [date,setDate] = useState(new Date());
    var [date1,setDate1] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [load, setLoad] = useState(false);
    const [file,setFile] = useState(null);
    const [sub,setSub] = useState('');
    const [data,setData] = useState('');
    const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);
    const handleDateChange = (date) => {
        
      setDate(date);
      setShowCalendar(false); // Hide calendar after selecting date
    }
    function gohome(){
      window.location.href='./TProfile';
  }
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("/api/student");
        const data = await response.json();
       setData(data);
       setSub(data.subject);
    }
    fetchData();
  },[]);
  const submitFile = async (event) => {
    event.preventDefault();
    setSub(data.subject);
    setLoad(true);
    const formData = new FormData()
    formData.append('file', file);
    console.log(sub,data.subject);
    let headers = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Headers' : sub
    };
    
    await axios.post('/upload', formData, { headers })
      .then((response) => {
        setLoad(false);
        alert("submitted");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      });
  };
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

    const handleChange = (event) => {
        setAssig(event.target.value);
      };
      function isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      }
    async function handleassig(event){
       event.preventDefault();
       const [fromDay, fromMonth, fromYear] = date.toLocaleDateString().split("/");
       date = date.toLocaleDateString();
       let date3 = new Date().toLocaleTimeString();
       let  date2 = new Date().toLocaleDateString() + " " + date3;
      await setDate1(date2);
       if(window.confirm("Are you sure?")){
     
      if(assig && 0 < fromDay && fromDay < 31 && 0 < fromMonth && fromMonth < 13 && 2020 < fromYear && fromYear < 2199){
        setLoad(true);

       axios.post("/assig", { assig,date,date1 }).then((response) => {
        setLoad(false);

        if(response.data.message==='success'){
         setFlag(true);
        }
            

        })
            .catch((error) => {
                alert(error.response.data.message );
                console.log(error.response.data.message);
        });
        }
        else{
            alert('Please enter valid text or date');
    }
}
}
   
   
   return <div className="c"> 
   { load &&
    <div className='loader1'></div>
}
   {!flag? <div >
     <h2>Add Assignment:</h2>
     <form >
      <label>
       <h3> Enter your text:</h3>
       <textarea className="form-control" style={{height: 'calc(2.5em + 4.75rem + 2px)',width:'90%',border:'6px solid rgb(251, 246, 246)'}} 
 value={assig} onChange={handleChange} />
      </label>
    </form>
    <form onSubmit={handleassig} onFocus={() => setShowCalendar(true)}>
    <h2>        Set Date of Submission:
</h2>
    {showCalendar && (
        <Calendar className='cal'
          onChange={handleDateChange}
          value={date}
        />
      )}
        
                <input
                            className="form"
                type="text"
                placeholder="Date"
                    value={date.toLocaleDateString()}
                    readOnly
                    
                onChange={(event) => setDate(event.target.value)}
            />
           </form>
    <button className={isDesktop ? "b1" : "b"} onClick={handleassig}
                                    >SUBMIT</button>
                                    <h2>OR</h2>
                                    <h2>Upload FILE</h2>
                                  
           <form onSubmit={submitFile}>
      <input type="file" onChange={handleFileUpload} />
      <button className={isDesktop ? "b1" : "b"} type="submit">SUBMIT</button>
    </form>
    </div>: <div >
        <h2>Submitted..</h2>
        <button className={isDesktop ? "b1" : "b"} onClick={() =>setFlag(false)}
                                    >GO BACK</button>
        
        </div>}

        <div className="d">
             <button className={isDesktop ? "B1" : "B"}
                 onClick={gohome}
                 > BACK</button>
             </div>
    </div>  
}
export default UAssignments