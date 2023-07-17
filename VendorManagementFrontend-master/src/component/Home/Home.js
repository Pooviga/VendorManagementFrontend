import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import DataContext from '../../DataContext/DataContext';

const Home = () => {



    const { islogin } = useContext(DataContext);
    const[lg, setLg] = useState("");
    
    useEffect(()=>{

        setLg(JSON.parse(localStorage.getItem("auth")));

    },[])

    return (
        <>{!islogin ? <Login /> : <Navbar />}</>
    )
}

export default Home