import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link} from "react-router-dom";
import React from 'react';

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Form";
import About from "./pages/About";

import "./pages/App.css"

export default function App() {
    return (

        <BrowserRouter>
            <div className="h1">


                <p >
                    RIT-k      <Link to="/pages/Form" className="h" >Login</Link>      <Link to="/pages/Contact" className="h">Contact</Link>   <Link to="/pages/About" className="h">About</Link>
                </p>
                {/* <nav>
                            <ul>
                                <li>
                                    <Link to="/pages/Form">Login</Link>
                                </li>

                                <li>
                                    <Link to="/pages/Contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>*/}


            </div>




            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pages/Form" element={<Login />} />


                <Route path="/pages/Contact" element={<Contact />} />
                <Route path="/pages/About" element={<About />} />
            </Routes>


            <div className="h1">

            </div>

        </BrowserRouter>
    );

}

