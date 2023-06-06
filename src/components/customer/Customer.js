import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { verifyUser } from '../../service/loginService'
import { useNavigate } from 'react-router-dom';


const Customer = () => {
    const username = useParams().username;
    // const [flag, setFlag] = useState(false);
    // console.log("hurrrrayyyyyyyy", flag)
    const navigate = new useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('authorization')
        let flag = verifyUser(token).catch((e) => {
            navigate("/");
        });
        console.log("hurrrrayyyyyyyy", flag)
    }, [])
    return (
        <>
            <h1>We Are Inside Customer Login.</h1>
            <div>Welcome,{username}</div>
        </>
    )
}

export default Customer