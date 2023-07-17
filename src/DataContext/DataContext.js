import axios from 'axios';

import React, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';




const DataContext = createContext({});




export const DataProvider = ({ children }) => {
    const [current, setCurrent] = useState(0);

    const [destination, setDestination] = useState(0);

    const [islogin, setIslogin] = useState(false);

    const [username,setUsername]=useState('');

    
    const [role, setRole] = useState(null);
    
    const navigate = useNavigate()

    const [vendorDetails, setVendorDetails] = useState([]);

    const [productDetails, setProductDetails] = useState([]);



    // useEffect(()=>{

    //     axios.get('https://localhost:7005/api/Transaction').then((response) => {

    //      console.log(response.data);

    //   });

    // },[])




    function postVendor(dataSet) {




        console.log("console:::", dataSet);

        const requestOptions = {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(dataSet)

        };

        fetch('https://localhost:7017/api/VendorDetails', requestOptions)

            .then(response => response.json())

            .then(data => console.log(data));




    }





    return (

        <DataContext.Provider value={{

            current, setCurrent,

            destination, setDestination,

            islogin, setIslogin,

            username,setUsername,

            postVendor,

            role, setRole,

            productDetails, setProductDetails,

            vendorDetails, setVendorDetails,

            navigate
            






        }}>{children}</DataContext.Provider>

    )

}




export default DataContext;