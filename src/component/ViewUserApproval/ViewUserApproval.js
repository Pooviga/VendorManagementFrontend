// import React, { useState, useEffect } from 'react'
// import ViewUserApprovalCard from '../ViewUserApprovalCard/ViewUserApprovalCard'
// import axios from 'axios';
// import './ViewUserApproval.css'


// const ViewUserApproval = () => {

//     const [data, setData] = useState([]);

//     useEffect(() => {
//         axios.get("https://localhost:7017/api/User").then((res) => setData(res.data));
//     }, [])

//     return (
//         <div className='container'>
//             {data.map((d) => {
//                 return <ViewUserApprovalCard key={d.id} data={d} />
//             })}
//         </div>
//     )
// }

// export default ViewUserApproval