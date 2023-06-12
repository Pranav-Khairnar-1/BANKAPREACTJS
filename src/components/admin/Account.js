import React, { useEffect } from 'react'
import { getAllaccountsAdmin } from '../../service/accountService'
import { useState } from 'react'
import Paginate from '../../layout/paginate/Paginate'
import './customer.css'






const Account = ({ username }) => {
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
    response = await getAllaccountsAdmin(body)
    console.log("after await response---->", response);
    setData(response.data.data)
    setCount(response.data.count)
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
        </tr>

      )
    })

  }



  useEffect(() => {
    testFunction()
  }, [limit, offset, count])
  return (
    <>
      {console.log("before html")}
      <div className='d-flex justify-content-center mt-3 mb-3'>
        <h1>Welcome {username}, Here's List Of All Our Accounts!!!</h1>
      </div>

      <div className='container-xl'>
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
              <th className='text-nowrap text-center' >Balance</th>
              <th className='text-nowrap text-center' >Username</th>
              <th className='text-nowrap text-center' >Bank Name</th>
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

export default Account