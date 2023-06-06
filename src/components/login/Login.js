// import React, { useState } from 'react'
import './login.css'
import { useForm } from 'react-hook-form'
import { login } from '../../service/loginService';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  // const [userInfo, setuserInfo] = useState();
  const navigate = new useNavigate();
  const onSubmit = async (data) => {
    // setuserInfo(data);
    try {
      const res = await login(data)
      console.log(data);
      console.log("Post request response---->", res.data);
      if (res.data.isAdmin) {
        localStorage.setItem('authorization', res.data.token);
        navigate(`/admin/${res.data.username}`)
        console.log("is Admin is trueeee");
      } else {
        localStorage.setItem('authorization', res.data.token);
        navigate(`/customer/${res.data.username}`)
        console.log("is admin is falsee")
      }
    } catch (error) {
      alert(error)
    }

  }
  console.log("error---->", errors)
  return (
    <>
      {/* <pre>{JSON.stringify(userInfo)}</pre> */}
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)} className='card'>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Username</label>
            <input type="text" id="userName" name='username' className="form-control" ref={register({ required: "Username Is Required." })} />
            <p className='mt-2 err-danger'>{errors.username?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name='password' className="form-control" ref={register({ required: "Password Is Required." })} />
            <p className='mt-2 err-danger'>{errors.password?.message}</p>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login