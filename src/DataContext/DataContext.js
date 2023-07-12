import axios from 'axios';

import React, { useState, createContext, useEffect } from 'react'




const DataContext = createContext({});




export const DataProvider = ({ children }) => {
    const [current, setCurrent] = useState(0);

    const [destination, setDestination] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    const [person, setPerson] = useState(0);

    const [weight, setWeight] = useState(0);

    const [role, setRole] = useState(null);




    // useEffect(()=>{

    //     axios.get('https://localhost:7005/api/Transaction').then((response) => {

    //      console.log(response.data);

    //   });

    // },[])




    function postTransaction() {




        axios.post('https://localhost:7005/api/Transaction', {

            currentFloor: current,

            destinationFloor: destination,

            personCount: person,

            personWeight: person * 60

        }).then((response) => {

            console.log(response.data);

        });






    }





    return (

        <DataContext.Provider value={{

            current, setCurrent,

            destination, setDestination,

            isOpen, setIsOpen,

            person, setPerson,

            weight, setWeight,

            postTransaction,

            role, setRole






        }}>{children}</DataContext.Provider>

    )

}




export default DataContext;