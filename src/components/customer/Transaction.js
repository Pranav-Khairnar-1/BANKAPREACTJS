import React, { useState, useRef, useEffect } from 'react'
import './transaction.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { createNewTransaction, createTransferTransaction } from '../../service/transactionService'
import { getAllaccounts, getAllaccountsAdmin } from '../../service/accountService'

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



const Transaction = ({ username }) => {

  const [openForAdd, setopenForAdd] = useState(false);
  const [openForWithDraw, setopenForWithDraw] = useState(false);
  const [openForTransfer, setopenForTransfer] = useState(false);
  const [userAccounts, setuserAccounts] = useState(false);
  const [allAccounts, setallAccounts] = useState(false);

  let response = {}
  let responseAll = {}


  const testFunction = async () => {
    let body = {}
    response = await getAllaccounts(body)
    console.log("after await response---->", response);
    body = {}
    responseAll = await getAllaccountsAdmin(body);
    setuserAccounts(response.data.data);
    setallAccounts(responseAll.data.data);
  }



  useEffect(() => {
    testFunction()
  }, [])



  const handleClose = () => { setopenForAdd(false); setopenForWithDraw(false); setopenForTransfer(false); };
  const handleDeposit = () => { setopenForAdd(true) }
  const handleWithdraw = () => { setopenForWithDraw(true) }
  const handleTransfer = () => { setopenForTransfer(true) }





  const MyModal = ({ openBool, isWithdraw, isTransfer }) => {

    const onSubmitForUpdate = async (e) => {
      e.preventDefault()
      console.log(" ID-->", accountID);
      console.log("amount-->", amount.current.value);

      let data = {}
      // const customerID = localStorage.getItem('ID');
      console.log(openBool, isWithdraw, isTransfer);
      if (isWithdraw) {
        console.log("I got here in isWithdraw ");
        data = {
          transferFrom: accountID,
          amount: parseInt(amount.current.value) * (-1),
        }
      } else if (isTransfer) {
        console.log("I got here in isTransfer ");
        data = {
          transferFrom: accountID,
          transferTo: accountID2,
          amount: parseInt(amount.current.value),
        }
      }
      else {
        console.log("I got here in else ");

        data = {
          transferFrom: accountID,
          amount: amount.current.value,
        }
      }

      try {
        let flag = {}
        if (isTransfer) {
          flag = await createTransferTransaction(data)
        } else {
          flag = await createNewTransaction(data)
        }
        handleClose()
        console.log(flag);
        alert("Transacted Sucessfully");
        testFunction();
      } catch (error) {
        console.log(error);
        alert(error)
      }

    }

    const [accountID, setaccountID] = useState('');
    const [accountID2, setaccountID2] = useState('');

    const amount = useRef();






    const [accountError, setaccountError] = useState('');
    const [accountError2, setaccountError2] = useState('');
    const [amountError, setamountError] = useState('');
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

      if (accountID === '') {
        Flag = true;
        setaccountError("account Is Required.");
      } else {
        setaccountError('')
      }

      if (isTransfer) {
        if (accountID2 === '') {
          Flag = true;
          setaccountError2("account Is Required.");
        } else {
          setaccountError2('')
        }
      }


      if (amount.current.value === '') {
        Flag = true;
        setamountError("amount Is Required.");
      } else if (!regexMobile.test(amount.current.value)) {
        Flag = true;
        setamountError("Invalid Input For amount.");
      }
      else {
        setamountError('')
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
      setaccountID(event.target?.value);
      console.log("Bank ID Value---->", accountID);
      console.log("event Value---->", event.target?.value);

    };

    const handleBankChange2 = (event) => {
      // bankID.current.value = event.target.value;
      setaccountID2(event.target?.value);
      console.log("Bank ID Value---->", accountID2);
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

            <div><h3>Transact</h3></div>

            <div onClick={handleClose} className='close'>
              <HighlightOffIcon />
            </div>
          </div>
          <hr></hr>

          <form onSubmit={(e) => onSubmitForUpdate(e)} >
            {console.log(isFormValid)}
            <div className='d-flex flex-column'>
              <FormControl fullWidth>
                <InputLabel id="language-label">From Account</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={accountID}
                  onChange={(e) => handleBankChange(e)}
                  onFocus={() => handleBlur('account')}
                  onBlur={Validate}
                  label="Banks"
                >
                  {userAccounts.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.id}-{u.bank.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className='mt-2 err-danger'>{accountError && touchedFields['account'] && <div>{accountError}</div>}</div>
            </div>
            {isTransfer && <div className='d-flex flex-column'>
              <FormControl fullWidth>
                <InputLabel id="language-label">To Account</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={accountID2}
                  onChange={(e) => handleBankChange2(e)}
                  onFocus={() => handleBlur('account2')}
                  onBlur={Validate}
                  label="Banks"
                >
                  {allAccounts.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.id}-{u.bank.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className='mt-2 err-danger'>{accountError2 && touchedFields['account2'] && <div>{accountError2}</div>}</div>
            </div>}
            <div className="mb-3 ">
              <label htmlFor="lastName" className="form-label">Amount</label>
              <input type="text" id="lastName" name='lastName' className="form-control" onChange={Validate} ref={amount} onFocus={() => handleBlur('amount')} onBlur={Validate} />
              <div className='mt-2 err-danger'>{amountError && touchedFields['amount'] && <div>{amountError}</div>}</div>
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
        <h1>Welcome {username}, Here's List Of Transaction Options!!!</h1>
      </div>

      <div className='d-flex flex-row w-80 justify-content-between'>
        <div onClick={handleDeposit} className='tran-Boxes d-flex justify-content-center align-items-center'>
          Deposit
        </div>
        <div onClick={handleWithdraw} className='tran-Boxes d-flex justify-content-center align-items-center'>
          WithDraw
        </div>
        <div onClick={handleTransfer} className='tran-Boxes d-flex justify-content-center align-items-center' >
          Transfer
        </div>
      </div>

      {openForAdd && <MyModal openBool={openForAdd} isWithdraw={false} isTransfer={false} />}
      {openForWithDraw && <MyModal openBool={openForWithDraw} isWithdraw={true} isTransfer={false} />}
      {openForTransfer && <MyModal openBool={openForTransfer} isWithdraw={false} isTransfer={true} />}




    </>
  )
}

export default Transaction