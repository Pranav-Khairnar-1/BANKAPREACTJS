import React, { useEffect, useRef } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getAllaccounts, createNewAccount, deleteaccount } from '../../service/accountService'
import { getAllbanks } from '../../service/bankService'
import { useState } from 'react'
import Paginate from '../../layout/paginate/Paginate'
// import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../admin/customer.css'
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

const Accounts = ({ username }) => {
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState();
  const [bankData, setbankData] = useState();

  const [count, setCount] = useState(0);
  let response = {}
  let responsebank = {}

  // let counter = 0
  const testFunction = async () => {
    let body = {
      limit: limit,
      offset: ((offset - 1) * limit)
    }
    response = await getAllaccounts(body)
    console.log("after await response---->", response);
    body = {}
    responsebank = await getAllbanks(body);
    setData(response.data.data);
    setCount(response.data.count);
    setbankData(responsebank.data.data);
  }



  useEffect(() => {
    testFunction()
  }, [limit, offset, count])

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
            {u.id}
          </td>
          <td className='text-nowrap text-center'>
            {u.balance}
          </td>
          <td className='text-nowrap text-center'>
            {u.customer.username}
          </td>
          <td className='text-nowrap text-center'>
            {u.bank.name}
          </td>
          <td className='text-nowrap text-center'>
            <button type='button' onClick={() => { onDeleteClick(u) }} className='btn btn-danger'>Delete</button>
          </td>
        </tr>

      )
    })

  }


  const onDeleteClick = async (account) => {
    try {
      let flag = await deleteaccount(account.id)
      console.log(flag);
      alert(flag?.data?.message);
      testFunction();
    } catch (error) {
      console.log(error);
      alert(error)
    }

  }

  const [newAccount, setNewAccount] = useState({});
  const [openForAdd, setopenForAdd] = useState(false);

  const handleOpenForAdd = (e) => {
    e.preventDefault()
    console.log(e);
    setNewAccount(null);
    setopenForAdd(true)
  };

  const handleClose = () => { setopenForAdd(false); };

  const MyModal = ({ openBool }) => {

    const onSubmitForUpdate = async (e) => {
      e.preventDefault()
      console.log(" ID-->", bankID);
      console.log("balence-->", balance.current.value);


      const customerID = localStorage.getItem('ID');
      let data = {
        customerID: customerID,
        bankID: bankID,
        balance: balance.current.value
      }
      try {
        let flag = await createNewAccount(data)
        handleClose()
        console.log(flag);
        alert("Account created Sucessfully");
        testFunction();
      } catch (error) {
        console.log(error);
        alert(error)
      }

    }

    const [bankID, setbankID] = useState('');
    const balance = useRef();





    const [bankError, setbankError] = useState('');
    const [balanceError, setbalanceError] = useState('');
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

      const regexMobile = /^[0-9]+$/;

      if (bankID === '') {
        Flag = true;
        setbankError("Bank Is Required.");
      } else {
        setbankError('')
      }

      if (balance.current.value === '') {
        Flag = true;
        setbalanceError("Balance Is Required.");
      } else if (!regexMobile.test(balance.current.value)) {
        Flag = true;
        setbalanceError("Invalid Input For Balance.");
      }
      else {
        setbalanceError('')
      }


      if (Flag) {
        setIsFormValid(false)
      } else {
        setIsFormValid(true)
      }

      console.log("Valdate Enden With Value of Flag--->", Flag);

    }

    const handleBankChange = (event) => {
      // bankID.current.value = event.target.value;
      setbankID(event.target?.value);
      console.log("Bank ID Value---->", bankID);
      console.log("event Value---->", event.target?.value);

    };




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
            <div><h3>Add Account</h3></div>

            <div onClick={handleClose} className='close'>
              <HighlightOffIcon />
            </div>
          </div>
          <hr></hr>

          <form onSubmit={(e) => onSubmitForUpdate(e)} >
            {console.log(isFormValid)}
            <div className='d-flex flex-column'>
              <FormControl fullWidth>
                <InputLabel id="language-label">Banks</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={bankID}
                  onChange={(e) => handleBankChange(e)}
                  onFocus={() => handleBlur('bank')}
                  onBlur={Validate}
                  label="Banks"
                >
                  {bankData.map((u) => (
                    <MenuItem key={u.name} value={u.id}>
                      {u.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className='mt-2 err-danger'>{bankError && touchedFields['bank'] && <div>{bankError}</div>}</div>
            </div>
            <div className="mb-3 ">
              <label htmlFor="lastName" className="form-label">Balance</label>
              <input type="text" id="lastName" name='lastName' className="form-control" onChange={Validate} ref={balance} onFocus={() => handleBlur('balance')} onBlur={Validate} />
              <div className='mt-2 err-danger'>{balanceError && touchedFields['balance'] && <div>{balanceError}</div>}</div>
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
        <h1>Welcome {username}, Here's List Of All Your Accounts!!!</h1>
      </div>

      <div className='container-xl'>
        <div className='d-flex justify-content-between'>
          <div>
            {<Paginate totalCount={count} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} />}
          </div>
          <div className='d-flex m-3 align-content-center'>
            <button type="button" onClick={handleOpenForAdd} className="btn btn-primary">Add Account</button>
          </div>
        </div>

        <table className=' mt-3 table table-info table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th className='text-nowrap text-center' >#</th>
              <th className='text-nowrap text-center' >ID</th>
              <th className='text-nowrap text-center' >Balance</th>
              <th className='text-nowrap text-center' >Username</th>
              <th className='text-nowrap text-center' >Bank Name</th>
              <th className='text-nowrap text-center' >Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData}
          </tbody>
        </table>
      </div>
      {openForAdd && <MyModal openBool={openForAdd} bank={newAccount} />}
    </>

  )
}

export default Accounts