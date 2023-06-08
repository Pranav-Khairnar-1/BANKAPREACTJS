import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { verifyAdmin } from '../../service/loginService';
import { useNavigate } from 'react-router-dom';
// import swabhav from '../../assets/swabhav.png';
import Reactimg from '../../assets/React.png';
import './admin.css'
// import { Routes, Route } from 'react-router-dom'
// import Cu from './Home.js';
import Bank from './Bank';
import Customer from './Customer';
import Account from './Account'


const Admin = () => {
    const username = useParams().username;
    const navigate = new useNavigate();
    const [activeChild, setActiveChild] = useState("child1");

    const handleClick = (child) => {
        setActiveChild(child);
    };

    useEffect(() => {
        let token = localStorage.getItem('authorization')
        let flag = verifyAdmin(token).catch((e) => {
            navigate("/");
        });
        console.log("hurrrrayyyyyyyy", flag)
    }, [])


    return (
        <>
            <nav className="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark"  >
                <div className="container-fluid">
                    <img src={Reactimg} alt='' className='swabhav-img' />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse w-100" id="navbarNavAltMarkup">
                        <div className="navbar-nav d-flex w-100">
                            <button className="nav-link active" onClick={() => handleClick('child1')} aria-current="page" >Customer</button>
                            <button className="nav-link active" onClick={() => handleClick('child2')} aria-current="page" >Bank</button>
                            <button className="nav-link active" onClick={() => handleClick('child3')} aria-current="page" >Account</button>

                        </div>
                        <div className='put-right text-nowrap'>Welcome, {username}</div>
                    </div>
                </div>
            </nav>
            <div>
                {(activeChild === "child1") && <Customer username={username}/>}
                {(activeChild === "child2") && <Bank />}
                {(activeChild === "child3") && <Account />}


                {/* <Routes>
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/bank" element={<Bank />} />
                    {/* <Route exact path="/admin/:username" element={<Admin />} /> */}
                {/* </Routes>  */}
            </div>

        </>
    )
}

export default Admin