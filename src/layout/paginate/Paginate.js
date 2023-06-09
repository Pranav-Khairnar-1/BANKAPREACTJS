import { useEffect, useState } from "react";
import './Paginate.css';
const { Pagination } = require("@mui/material");

const Paginate = ({ totalCount, limit, setLimit, offset, setOffset }) => {

  const [paginationString, setPaginationString] = useState("")

  const handleChange = (event, value) => {
    if (offset !== value) {
      setOffset(value);
    }
  }

  const onLimitChange = (e) => {
    setOffset(1)
    setLimit(e.target.value)
  }

  const processPagination = () => {
    if (totalCount === 0) {
      return
    }

    const start = limit * (offset - 1) + 1
    let end = +limit + (limit * (+offset - 1))

    if (totalCount < end) {
      end = totalCount
    }

    setPaginationString(`${start} - ${end}`)
  }

  useEffect(() => {
    console.log("values inside pagination------->", limit, offset)
    processPagination()
  }, [limit, offset, totalCount])

  return (
    <>
      <div className="d-flex flex-row align-items-baseline justify-content-start mb-2">
        <div className="w-5 ms-1">
          <select className="form-control form-control-sm" value={limit || 0} onChange={onLimitChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex-row ps-3">
          Viewing &nbsp; <span className="text-blue">{paginationString}</span>
          &nbsp; of &nbsp; <span className="text-blue">{totalCount}</span>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-start flex-row flex-wrap">
        <div className="d-flex flex-wrap">
          <Pagination color="primary" count={Math.ceil(totalCount / limit)} variant="outlined" shape="rounded" page={(parseInt(offset))}
            onChange={handleChange} />
        </div>
      </div>
    </>
  );
}

export default Paginate;



// import { useEffect, useState } from "react";
// const { Pagination } = require("@mui/material");

// let counter1 = 0
// const Paginate = ({ totalCount, limit, setLimit, offset, setOffset }) => {

//   const [paginationString, setPaginationString] = useState("")

//   const handleChange = (event, value) => {
//     if (offset !== value) {
//       setOffset(value);
//     }
//   }

//   const onLimitChange = (e) => {
//     setOffset(1)
//     setLimit(e.target.value)
//   }

//   const processPagination = () => {
//     console.log("======================= totalCount ->", totalCount);
//     if (totalCount === 0) {
//       return
//     }

//     const start = limit * (offset - 1) + 1
//     let end = +limit + (limit * (+offset - 1))

//     if (totalCount < end) {
//       end = totalCount
//     }
//     // console.log("======================= totalCount ->", start, end);

//     // setPaginationString(`${start} - ${end}`)
//     const str = `${start} - ${end}`
//     setPaginationString(str)
//   }

//   useEffect(() => {
//     // console.log("======================= inside use effect ->", totalCount);
//     processPagination()
//   }, [limit, offset])

//   return (
//     <>
//       {console.log("Pagintaion>>>>>>>>>>>>>>>>>>>>", counter1++)}
//       <div className="d-flex flex-row align-items-baseline justify-content-start mb-2 p">
//         <div className="w-5 ms-1">
//           <select className="form-control form-control-sm" value={limit || 0} onChange={onLimitChange}>
//             <option value="10">10</option>
//             <option value="20">20</option>
//             <option value="50">50</option>
//           </select>
//         </div>
//         <div className="flex-row ps-3">
//           Viewing &nbsp; <span className="text-blue">{paginationString}</span>
//           &nbsp; of &nbsp; <span className="text-blue">{totalCount}</span>
//         </div>
//       </div>
//       <div className="d-flex justify-content-between align-items-start flex-row flex-wrap py-3" >
//         <div className="d-flex flex-wrap">
//           <Pagination color="primary" count={Math.ceil(totalCount / limit)} variant="outlined" shape="rounded" page={(parseInt(offset))}
//             onChange={handleChange} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Paginate;