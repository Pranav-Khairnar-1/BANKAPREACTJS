import React, { useEffect } from 'react'
import { getAllCustomers } from '../../service/cutomerService'
import { useState } from 'react'
import Paginate from '../../layout/paginate/Paginate'
// import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider'

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
    // console.log("testing", response);
  }, [limit, offset, count])

  const onUpdateClick = (e) => {
    e.preventDefault()
    setLimit(50);
    console.log("fvvrv clicked update");
  }

  const onDeleteClick = () => {
    console.log("vfdab clicked Delete");
  }

  // const cardofuser = Object.values(data).map(u => {
  //   // let count =0;
  //   return (

  //       <tr key={u.id}>
  //         <td>
  //           {u.userId}
  //         </td>
  //         <td>
  //           {u.title}
  //         </td>
  //         <td>
  //           {u.body}
  //         </td>
  //       </tr>


  //   )
  // })
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
            <button type='button' onClick={(e) => { onUpdateClick(e) }} className='btn btn-warning'>Update</button>
          </td>
          <td className='text-nowrap text-center'>
            <button type='button' onClick={() => { onDeleteClick() }} className='btn btn-danger'>Delete</button>
          </td>
        </tr>

      )
    })

  }



  return (
    <>
      <div className='d-flex justify-content-center mt-3 mb-3'>
        <h1>Welcome {username}, Here's List Of All Our Customers!!!</h1>
      </div>
  
      <div className='d-flex justify-content-between'>
        <div>
          {count > 0 && <Paginate totalCount={count} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} />}
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
          <button type="button" className="btn btn-primary">Add Customer</button>
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






    </>
  )
}

export default Customer