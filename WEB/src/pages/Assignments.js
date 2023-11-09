import React,{ useEffect,useState} from "react"
import "./App.css"
import {FaHome} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from "axios";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

var b = true;

function Assignments() {
    const [isClicked, setIsClicked] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [files, setFiles] = useState([]);
    const [files1, setFiles1] = useState([]);
    const [data, setData] = useState(null);
    const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);
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
        
    
    
    },   1 * 100);
  }
  else{
    window.location.href='./Form';
  }
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/api/student");
        const data = await response.json();
        setData(data);
      }
      fetchData();
    
      const fetchFile = async () => {
        const numberOfFiles = 10;
        const files = [];
      
        // Fetch each file
        for (let i = 0; i < numberOfFiles; i++) {
          try {
            const response = await axios(`/getFile/${i}`, {
              method: 'GET',
              responseType: 'blob' // Force to receive data in a Blob Format
            });
      
            // Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data], 
              {type: 'application/pdf'}
            );
      
            // Build a URL from the file
            const fileURL = URL.createObjectURL(file);
      
            // Push the file URL and creation time to the array
            files.push({
              url: fileURL,
              creationTime: new Date(response.headers['x-creation-time'])
            });
          } catch (error) {
            console.log(error);
          }
        }
      
        // Sort the files array by creationTime
        files.sort((a, b) => b.creationTime - a.creationTime);
      
        // Extract the sorted URLs
        const urls = files.map(file => file.url);
      
        // Update the state
        setFiles(files);
      }
      
      // Call the function
      fetchFile();
      
    }, []);
    function convertDateFormat(str) {
      // Split the date, time, and individual date components
      let [date, time] = str.split(' ');
      let [day, month, year] = date.split('/');
    
      // Reformat the date
      let newDateStr = `${year}-${month}-${day} ${time}`;
    
      return newDateStr;
    }
    
    function gohome(){
        setIsClicked(true);
        window.location.href='./SProfile';
    }

  
function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
    const subAtt = (data) => {
        if (!data) return [];

       
       let result = [];
     
        for (let sub in data.assignment) {
            let subject = data.assignment[sub].map(item => ({ subject: sub, date: item.date, value: item.value,upload:item.upload }));
            result.push(...subject);
        };

        return result;
       
    
}
    return <div className="c">
                <div className={isClicked? 'Box':""}></div>
 

{subAtt(data).length > 0 ?<div >
    <h1 >Assignments</h1>
                  
                         <ul >
                             {subAtt(data).sort((a, b) => {
  let uploadA = new Date(convertDateFormat(String(a.upload)));
  let uploadB = new Date(convertDateFormat(String(b.upload)));
  return uploadB - uploadA;
}).map((item) => (
  <li className={isDesktop ? "attcont3" : "attcont2"} key={item.date}>
    <h4>{item.subject}</h4>
    <div className={isDesktop ? "attcont1" : "attcont"}>
      <h5>Assignment:</h5> {item.value}
    </div>
    <h5>Due date: {item.date}</h5>
    <h5>Uploaded date: {item.upload}</h5>
  </li>
))}
                                                </ul> 
                                                <div className={isDesktop ? "attcont3" : "attcont2"}>
                                                          <h2>Attached Files</h2>
                                                          {files.length>0? <div >
                                                        {files.map((file, index) => (
      <div>  <a className="pdf-button" key={index} href={file.url} target="_blank" rel="noopener noreferrer">
          Open PDF {new Date(file.creationTime).toLocaleDateString() + ' '+new Date(file.creationTime).toLocaleTimeString() }
        </a></div>

      ))}
      </div>:<div className="loader"></div>}

    
    </div>
      </div >               :<div >
                                                        <h1>No Assignments so far</h1>
                                                        </div>}
                                                      
                                                        <div className="d">
             <button className={isDesktop ? "B1" : "B"}
                 onClick={gohome}
                             > BACK</button>
             </div>

    </div>
}
export default Assignments