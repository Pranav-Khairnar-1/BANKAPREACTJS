import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { verifyUser } from '../../service/loginService'
import { useNavigate } from 'react-router-dom';
import Accounts from './Accounts'
import Passbook from './Passbook'
import Transaction from './Transaction'
import Reactimg from '../../assets/React.png';



const Customer = () => {
    const username = useParams().username;
    // const [flag, setFlag] = useState(false);
    // console.log("hurrrrayyyyyyyy", flag)
    const navigate = new useNavigate();
    const [activeChild, setActiveChild] = useState("child1");

    const handleClick = (child) => {
        setActiveChild(child);
    };

    const handleLogOut = (child) => {
        localStorage.setItem('authorization','garbage value')
        navigate("/")
    };

    useEffect(() => {
        let token = localStorage.getItem('authorization')
        let flag = verifyUser(token).catch((e) => {
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
                            <button className="nav-link active" onClick={() => handleClick('child1')} aria-current="page" >Accounts</button>
                            <button className="nav-link active" onClick={() => handleClick('child2')} aria-current="page" >Passbook</button>
                            <button className="nav-link active" onClick={() => handleClick('child3')} aria-current="page" >Transaction</button>
                            <button className="nav-link active" onClick={() => handleLogOut()} aria-current="page" >Logout</button>


                        </div>
                        <div className='put-right text-nowrap'>Welcome, {username}</div>
                    </div>
                </div>
            </nav>
            <div>
                {(activeChild === "child1") && <Accounts username={username} />}
                {(activeChild === "child2") && <Passbook username={username} />}
                {(activeChild === "child3") && <Transaction username={username} />}
            </div>
        </>
    )
}

export default Customer