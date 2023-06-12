import React, { useEffect, useRef } from 'react'
import { getAllbanks, UpdateBankByID, createNewBank, deleteBank } from '../../service/bankService'

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

const Bank = ({ username }) => {
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
    response = await getAllbanks(body)
    console.log("after await response---->", response);
    setData(response.data.data)
    setCount(response.data.count)
  }



  useEffect(() => {
    testFunction()
  }, [limit, offset, count])


  const onDeleteClick = async (bank) => {
    try {
      let flag = await deleteBank(bank.id)
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
            {u.name}
          </td>
          <td className='text-nowrap text-center'>
            {u.abbrevation}
          </td>
          <td className='text-nowrap text-center'>
            {u.activeUsers}
          </td>
          <td className='text-nowrap text-center'>
            {u.assetWorth}
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
    setNewBank(u)
    setopenForUpdate(true)
  };

  const handleOpenForAdd = (e) => {
    e.preventDefault()
    console.log(e);
    setNewBank(null);
    setopenForAdd(true)
  };

  const handleClose = () => { setopenForUpdate(false); setopenForAdd(false); };

  const [newBank, setNewBank] = useState({})







  const MyModal = ({ openBool, bank, isOperationUpdate }) => {

    const onSubmitForUpdate = async (e) => {
      e.preventDefault()
      console.log(" NAME-->", name.current.value);
      console.log("Abbrevation-->", abbrevation.current.value);


      if (isOperationUpdate) {
        let data = {
          name: name.current.value,
          abbrevation: abbrevation.current.value,
          assetWorth: assetWorth.current.value
        }
        try {
          let flag = await UpdateBankByID(data, bank.id)
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
          name: name.current.value,
          abbrevation: abbrevation.current.value,
          assetWorth: assetWorth.current.value
        }
        try {
          let flag = await createNewBank(data)
          handleClose()
          console.log(flag);
          alert("Bank created Sucessfully");
          testFunction();
        } catch (error) {
          console.log(error);
          alert(error)
        }

      }


    }

    const name = useRef();
    const abbrevation = useRef();
    const assetWorth = useRef();



    useEffect(() => {
      setTimeout(() => {
        console.log(bank);
        if (bank) {
          console.log("inside IF Of use Stae", bank);
          name.current.value = bank.name
          abbrevation.current.value = bank.abbrevation
          assetWorth.current.value = bank.assetWorth
        }
      }, 0);
    }, [bank])

    const [nameError, setnameError] = useState('');
    const [abbrevationError, setabbrevationError] = useState('');
    const [assetWorthError, setassetWorthError] = useState('');
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

      const regexName = /^[A-Za-z\s]+$/;
      const regexMobile = /^[0-9]+$/;



      if (name.current.value === '') {
        Flag = true;
        setnameError("Name Is Required.");
      } else if (!regexName.test(name.current.value)) {
        Flag = true;
        setnameError("Invalid Input For Name.");
      }
      else {
        setnameError('')
      }

      if (abbrevation.current.value === '') {
        Flag = true;
        setabbrevationError("Abbrevation Is Required.");
      } else if (!regexName.test(abbrevation.current.value)) {
        Flag = true;
        setabbrevationError("Invalid Input For Abbrevation.");
      }
      else {
        setabbrevationError('')
      }


      if (assetWorth.current.value === '') {
        Flag = true;
        setassetWorthError("Asset Worth Is Required.");
      } else if (!regexMobile.test(assetWorth.current.value)) {
        Flag = true;
        setassetWorthError("Invalid Input For Asset Worth.");
      }
      else {
        setassetWorthError('')
      }


      if (Flag) {
        setIsFormValid(false)
      } else {
        setIsFormValid(true)
      }

      console.log("Valdate Enden With Value of Flag--->", Flag);

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
            {isOperationUpdate && <div><h3>Update bank</h3></div>}
            {!isOperationUpdate && <div><h3>Add bank</h3></div>}

            <div onClick={handleClose} className='close'>
              <HighlightOffIcon />
            </div>
          </div>
          <hr></hr>

          <form onSubmit={(e) => onSubmitForUpdate(e)} >
            {console.log(isFormValid)}
            <div className='d-flex flex-row'>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">Name</label>
                <input type="text" name='firstName' className="form-control" onChange={Validate} ref={name} onFocus={() => handleBlur('name')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{nameError && touchedFields['name'] && <div>{nameError}</div>}</div>
              </div>
              <div className="mb-3 ps-3">
                <label htmlFor="lastName" className="form-label">Abbrevation</label>
                <input type="text" id="lastName" name='lastName' className="form-control" onChange={Validate} ref={abbrevation} onFocus={() => handleBlur('abbrevation')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{abbrevationError && touchedFields['abbrevation'] && <div>{abbrevationError}</div>}</div>
              </div>
            </div>

            <div className='d-flex flex-row'>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Asset Worth</label>
                <input type="text" id="email" name='email' className="form-control" onChange={Validate} ref={assetWorth} onFocus={() => handleBlur('assetWorth')} onBlur={Validate} />
                <div className='mt-2 err-danger'>{assetWorth && touchedFields['assetWorth'] && <div>{assetWorthError}</div>}</div>
              </div>
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
        <h1>Welcome {username}, Here's List Of All Our Banks!!!</h1>
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
          <button type="button" onClick={handleOpenForAdd} className="btn btn-primary">Add Bank</button>
        </div>

      </div>

      <table className=' mt-3 table table-info table-striped'>
        <thead className='thead-dark'>
          <tr>
            <th className='text-nowrap text-center' >#</th>
            <th className='text-nowrap text-center' >Name</th>
            <th className='text-nowrap text-center' >Abbrevaton</th>
            <th className='text-nowrap text-center' >Active users</th>
            <th className='text-nowrap text-center' >Asset Worth</th>
            <th className='text-nowrap text-center' >Update</th>
            <th className='text-nowrap text-center' >Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData}
        </tbody>
      </table>
      {openForUpdate && <MyModal openBool={openForUpdate} bank={newBank} isOperationUpdate={true} />}
      {openForAdd && <MyModal openBool={openForAdd} bank={newBank} isOperationUpdate={false} />}




    </>
  )
}

export default Bank