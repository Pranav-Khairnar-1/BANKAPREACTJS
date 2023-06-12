import React, { useEffect, useRef } from 'react'
import { getAllCustomers, UpdateCustomerByID, createNewCustomer, deleteCustomer } from '../../service/cutomerService'
import { useState } from 'react'
import Paginate from '../../layout/paginate/Paginate'
// import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './customer.css'
// import { useForm } from 'react-hook-form'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'Auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Customer = ({ username }) => {
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  let response = {}


  // let counter = 0
  const testFunction = async () => {
    let body = {
      limit: limit,
      offset: ((offset - 1) * limit)
    }
    response = await getAllCustomers(body)
    console.log("after await response---->", response);
    setData(response.data.data)
    setCount(response.data.count)
  }



  useEffect(() => {
    testFunction()
  }, [limit, offset, count])


  const onDeleteClick = async (user) => {
    try {
      let flag = await deleteCustomer(user.id)
      console.log(flag);
      alert(flag?.data?.message);
      testFunction();
    } catch (error) {
      console.log(error);
      alert(error)
    }

  }

  let varkey = 0
  let userData
  if (data) {
    userData = Object.values(data).map((u) => {
      return (

        <tr key={varkey}>
          <td className='text-nowrap text-center'>
            {++varkey}
          </td>
          <td className='text-nowrap text-center'>
            {u.firstName} {u.lastName}
          </td>
          <td className='text-nowrap text-center'>
            {u.email}
          </td>
          <td className='text-nowrap text-center'>
            {u.username}
          </td>
          <td className='text-nowrap text-center'>
            {u.netWorth}
          </td>
          <td className='text-nowrap text-center'>
            <button type='button' onClick={(e) => { handleOpen(e, u) }} className='btn btn-warning'>Update</button>
          </td>
          <td className='text-nowrap text-center'>
            <button type='button' onClick={() => { onDeleteClick(u) }} className='btn btn-danger'>Delete</button>
          </td>
        </tr>

      )
    })

  }


  const [openForUpdate, setopenForUpdate] = useState(false);
  const [openForAdd, setopenForAdd] = useState(false);

  const handleOpen = (e, u) => {
    e.preventDefault()
    console.log(e);
    console.log(u);
    setNewUser(u)
    setopenForUpdate(true)
  };

  const handleOpenForAdd = (e) => {
    e.preventDefault()
    console.log(e);
    setNewUser(null);
    setopenForAdd(true)
  };

  const handleClose = () => { setopenForUpdate(false); setopenForAdd(false); };

  const [newUser, setNewUser] = useState({})







  const MyModal = ({ openBool, user, isOperationUpdate }) => {

    const onSubmitForUpdate = async (e) => {
      e.preventDefault()
      console.log("FIRST NAME-->", firstname.current.value);
      console.log("Last NAME-->", lastname.current.value);
      console.log("Email-->", email.current.value);
      console.log("Mobile-->", mobile.current.value);
      console.log("isAdmin-->", isAdmin.current.checked);

      if (isOperationUpdate) {
        let data = {
          firstName: firstname.current.value,
          lastName: lastname.current.value,
          email: email.current.value,
          mobile: mobile.current.value,
          isAdmin: isAdmin.current.checked
        }
        try {
          let flag = await UpdateCustomerByID(data, user.id)
          handleClose()
          console.log(flag);
          testFunction()
          alert(flag?.data?.message)
        } catch (error) {
          console.log(error);
          alert(error)
        }

      } else {
        let data = {
          firstName: firstname.current.value,
          lastName: lastname.current.value,
          email: email.current.value,
          mobile: mobile.current.value,
          username: username.current.value,
          password: password.current.value,
          isAdmin: isAdmin.current.checked
        }
        try {
          let flag = await createNewCustomer(data)
          handleClose()
          console.log(flag);
          alert("Customer added successfully!");
          testFunction();
        } catch (error) {
          console.log(error);
          alert(error)
        }

      }


    }

    const firstname = useRef();
    const lastname = useRef();
    const email = useRef();
    const mobile = useRef();
    const username = useRef();
    const password = useRef();
    const isAdmin = useRef(false);

    useEffect(() => {
      setTimeout(() => {
        if (user) {
          firstname.current.value = user.firstName
          lastname.current.value = user.lastName
          email.current.value = user.email
          mobile.current.value = user.mobile
          isAdmin.current.checked = user.isAdmin
        }
      }, 0);
    }, [user])

    const [firstnameError, setfirstnameError] = useState('');
    const [lastnameError, setlastnameError] = useState('');
    const [emailError, setemailError] = useState('');
    const [mobileError, setmobileError] = useState('');
    const [usernameError, setusernameError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [touchedFields, setTouchedFields] = useState([]);

    const handleBlur = (field) => {
      if (!touchedFields[field]) {
        setTouchedFields((prevState) => ({
          ...prevState,
          [field]: true,
        }));
      }
    }

    const Validate = () => {

      let Flag = false;

      const regexName = /^[A-Za-z]+$/;
      const regexMobile = /^[0-9]{10}$/;
      const regexEmail = /@/;
      const regexPassword = /^.{8,}$/;

      if (firstname.current.value === '') {
        Flag = true;
        setfirstnameError("First Name Is Required.");
      } else if (!regexName.test(firstname.current.value)) {
        Flag = true;
        setfirstnameError("Invalid Input For First name.");
      }
      else {
        setfirstnameError('')
      }

      if (lastname.current.value === '') {
        Flag = true;
        setlastnameError("Last Name Is Required.");
      } else if (!regexName.test(lastname.current.value)) {
        Flag = true;
        setlastnameError("Invalid Input For Last name.");
      }
      else {
        setlastnameError('')
      }

      if (mobile.current.value === '') {
        Flag = true;
        setmobileError("Mobile Number Is Required.");
      } else if (!regexMobile.test(mobile.current.value)) {
        Flag = true;
        setmobileError("Invalid Input For Moobile Number.");
      }
      else {
        setmobileError('')
      }

      if (email.current.value === '') {
        Flag = true;
        setemailError("Email Is Required.");
      } else if (!regexEmail.test(email.current.value)) {
        Flag = true;
        setemailError("Invalid Input For Email.");
      }
      else {
        setemailError('')
      }

      if (!isOperationUpdate) {

        if (username.current.value === '') {
          Flag = true;
          setusernameError("Username Is Required.");
        } else if (!regexName.test(username.current.value)) {
          Flag = true;
          setusernameError("Invalid Input For Username.");
        }
        else {
          setusernameError('')
        }

        if (password.current.value === '') {
          Flag = true;
          setpasswordError("password Is Required.");
        } else if (!regexPassword.test(password.current.value)) {
          Flag = true;
          setpasswordError("Invalid Input For password.");
        }
        else {
          setpasswordError('')
        }


      }

      if (Flag) {
        setIsFormValid(false)
      } else {
        setIsFormValid(true)
      }

    }




    return (<>
      <Modal
        open={openBool}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='d-flex justify-content-between'>
            <div></div>
            {isOperationUpdate && <div><h3>Update User</h3></div>}
            {!isOperationUpdate && <div><h3>Add User</h3></div>}

            <div onClick={handleClose} className='close'>
              <HighlightOffIcon />
            </div>
          </div>
          <hr></hr>

          <form onSubmit={(e) => onSubmitForUpdate(e)} >
            {console.log(isFormValid)}
            <div className='d-flex flex-row'>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" name='firstName' className="form-control" onChange={Validate} ref={firstname} onFocus={() => handleBlur('firstname')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{firstnameError && touchedFields['firstname'] && <div>{firstnameError}</div>}</div>
              </div>
              <div className="mb-3 ps-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" id="lastName" name='lastName' className="form-control" onChange={Validate} ref={lastname} onFocus={() => handleBlur('lastname')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{lastnameError && touchedFields['lastname'] && <div>{lastnameError}</div>}</div>
              </div>
            </div>

            <div className='d-flex flex-row'>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" id="email" name='email' className="form-control" onChange={Validate} ref={email} onFocus={() => handleBlur('emaiil')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{emailError && touchedFields['emaiil'] && <div>{emailError}</div>}</div>
              </div>
              <div className="mb-3 ps-3">
                <label htmlFor="mobile" className="form-label">Mobile</label>
                <input type="text" id="mobile" name='mobile' className="form-control" onChange={Validate} ref={mobile} onFocus={() => handleBlur('mobile')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{mobileError && touchedFields['mobile'] && <div>{mobileError}</div>}</div>
              </div>
            </div>

            {!isOperationUpdate && <div className='d-flex flex-row'>
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">Username</label>
                <input type="text" id="Username" name='username' className="form-control" onChange={Validate} ref={username} onFocus={() => handleBlur('username')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{usernameError && touchedFields['username'] && <div>{usernameError}</div>}</div>
              </div>
              <div className="mb-3 ps-3">
                <label htmlFor="Password" className="form-label">Password</label>
                <input type="password" id="Password" name='mobile' className="form-control" onChange={Validate} ref={password} onFocus={() => handleBlur('password')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{passwordError && touchedFields['password'] && <div>{passwordError}</div>}</div>
              </div>
            </div>}

            <div className="mb-3">
              <input type="checkbox" className='checkbox-css' id="isAdmin" name='isAdmin' onChange={Validate} ref={isAdmin} />
              <label htmlFor="isAdmin">Is Admin</label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Submit</button>
          </form>
        </Box>
      </Modal>
    </>)
  }


  return (

    <>
      {console.log("before html")}
      <div className='d-flex justify-content-center mt-3 mb-3'>
        <h1>Welcome {username}, Here's List Of All Our Customers!!!</h1>
      </div>

      <div className='d-flex justify-content-between'>
        <div>
          {<Paginate totalCount={count} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} />}
        </div>
        {/* <div>
          {console.log("Redndered", counter++)}
          <Paginate totalCount={count} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} />
        </div>
        <div>
          {console.log("Redndered", counter++)}
          <Paginate totalCount={count} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} />
        </div> */}
        <div className='d-flex m-3 align-content-center'>
          <button type="button" onClick={handleOpenForAdd} className="btn btn-primary">Add Customer</button>
        </div>

      </div>

      <table className=' mt-3 table table-info table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th className='text-nowrap text-center' >#</th>
            <th className='text-nowrap text-center' >Name</th>
            <th className='text-nowrap text-center' >Email</th>
            <th className='text-nowrap text-center' >Username</th>
            <th className='text-nowrap text-center' >Net Worth</th>
            <th className='text-nowrap text-center' >Update</th>
            <th className='text-nowrap text-center' >Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData}
        </tbody>
      </table>
      {openForUpdate && <MyModal openBool={openForUpdate} user={newUser} isOperationUpdate={true} />}
      {openForAdd && <MyModal openBool={openForAdd} user={newUser} isOperationUpdate={false} />}



    </>
  )
}

export default Customer

