import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import DataContext from '../../DataContext/DataContext';

const Home = () => {



    const { islogin } = useContext(DataContext);
    return (
        <>{!islogin ? <Login /> : <Navbar />}</>
    )
}

export default Home