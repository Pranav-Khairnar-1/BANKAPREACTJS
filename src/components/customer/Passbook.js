import React, { useEffect } from 'react'
import { getAllaccounts } from '../../service/accountService'
import { getAllTransaction } from '../../service/transactionService'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react'
import Paginate from '../../layout/paginate/Paginate'
// import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider'
import '../admin/customer.css'
// import { useForm } from 'react-hook-form'


const Passbook = ({ username }) => {
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState();
  const [passbook, setPassbook] = useState();
  const [accountID, setaccountID] = useState();


  const [count, setCount] = useState(0);
  let response = {}
  // let counter = 0
  const testFunction = async () => {
    let body = {}
    response = await getAllaccounts(body)
    console.log("after await response---->", response);
    body = {}
    setData(response.data.data);
    setCount(response.data.count);
  }

  let varkey = 0
  let userData
  if (passbook) {
    userData = Object.values(passbook).map((u) => {
      return (

        <tr key={varkey}>
          <td className='text-nowrap text-center'>
            {++varkey}
          </td>
          <td className='text-nowrap text-center'>
            {u.transactionID}
          </td>
          <td className='text-nowrap text-center'>
            {u.transferFrom}
          </td>
          <td className='text-nowrap text-center'>
            {u.transferTo}
          </td>
          <td className='text-nowrap text-center'>
            {u.amount}
          </td>
          <td className='text-nowrap text-center'>
            {u.closingBalence}
          </td>
        </tr>

      )
    })

  }

  const handleGenerate = async (e) => {
    e.preventDefault();
    let body = {
      limit: limit,
      offset: ((offset - 1) * limit)
    }
    let flag = await getAllTransaction(body, accountID)
    console.log(flag);
    setPassbook(flag.data)
  }


  const handleBankChange = (event) => {
    // bankID.current.value = event.target.value;
    setaccountID(event.target?.value);
    console.log("Bank ID Value---->", accountID);
    console.log("event Value---->", event.target?.value);

  };


  useEffect(() => {
    testFunction()
  }, [limit, offset, count])
  return (
    <>
      {console.log("before html")}
      <div className='d-flex justify-content-center mt-3 mb-3'>
        <h1>Welcome {username}, Here's List Of All Your Accounts!!!</h1>
      </div>

      <div className='d-flex flex-row'>
        {data && <div className='container-fix'>
          <FormControl fullWidth>
            <InputLabel id="language-label">Accounts</InputLabel>
            <Select
              labelId="language-label"
              id="language"
              value={accountID}
              onChange={(e) => handleBankChange(e)}
              label="Banks"
            >
              {data.map((u) => (
                <MenuItem key={u.name} value={u.id}>
                  {u.id}-{u.bank.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>}
        <div>
          <button onClick={handleGenerate} className='btn btn-primary'>Generate Passbook</button>
        </div>

      </div>


      <div className='container-sm'>
        <div className='d-flex justify-content-between'>
          <div>
            {<Paginate totalCount={count} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} />}
          </div>
        </div>

        <table className=' mt-3 table table-info table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th className='text-nowrap text-center' >#</th>
              <th className='text-nowrap text-center' >ID</th>
              <th className='text-nowrap text-center' >Sender</th>
              <th className='text-nowrap text-center' >Receiver</th>
              <th className='text-nowrap text-center' >Amount</th>
              <th className='text-nowrap text-center' >Closing Balance</th>
            </tr>
          </thead>
          <tbody>
            {userData}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Passbook