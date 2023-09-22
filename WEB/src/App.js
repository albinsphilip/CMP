import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link} from "react-router-dom";
import React,{useEffect} from 'react';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Form";
import About from "./pages/About";

import "./pages/App.css"
import SProfile from "./pages/SProfile";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import Sessionals from "./pages/Sessionals";
import TProfile from "./pages/TProfile";
import UAttendance from "./pages/UAttendance";
import UAssignments from "./pages/UAssignments";
import USessionals from "./pages/USessionals";
import { useState } from "react";
export default function App() {
    var b= false;

    useEffect(() => {
        setShow(true);
      }, []);
     
     
  
    const [show, setShow] = useState(false);
    function log() {
        window.location.href = "/pages/Form";
    }
    return (

        <BrowserRouter>
        <div className={`fade ${show ? "show" : ""}`}  >
            <div className="h1">


                <p >
                    RiTec <div className="h"><div onClick={()=>setShow(true)}> <Link className="link" to="/pages/Form"  >Login</Link>      <Link className="link" to="/pages/Contact" >Contact</Link>   <Link className="link" to="/pages/About">About</Link>
                    </div> </div></p>
     


            </div>




            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pages/Form" element={<Login />} />


                <Route path="/pages/Contact" element={<Contact />} />
                <Route path="/pages/About" element={<About />} />
                <Route path="/pages/SProfile" element={<SProfile />} />
                <Route path="/pages/Attendance" element={<Attendance />} />
                <Route path="/pages/Assignments" element={<Assignments />} />
                <Route path="/pages/Sessionals" element={<Sessionals />} />
                <Route path="/pages/TProfile" element={<TProfile />} />
                <Route path="/pages/UAttendance" element={<UAttendance />} />
                <Route path="/pages/UAssignments" element={<UAssignments />} />
                <Route path="/pages/USessionals" element={<USessionals />} />
            </Routes>


            <div className="c1">
COPYRIGHT ALRON TECH
            </div></div>

        </BrowserRouter>
    );

}

