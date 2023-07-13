import { React, useContext, useEffect, useState } from 'react'
import "../Login/Login.css"
import DataContext from '../../DataContext/DataContext'
import axios from 'axios'


function Login() {


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [transaction, setTransaction] = useState([]);

    const { role, setRole, islogin, setIslogin, navigate } = useContext(DataContext);

    useEffect(() => {

        axios.get("https://64ad6d54b470006a5ec5f2ed.mockapi.io/vendor/api/users").then((response) => {

            setTransaction(response.data);

            console.log(response.data)




        });

    }, []);

    function loginHandler(params) {

        transaction.map((detail) => {

            // console.log(detail)

            if (((detail.username) == username) && (detail.password) == password) {

                setIslogin(true)



                console.log(detail.role)

                setRole(detail.role)

                navigate("/dashboard")

                //add





            }

        })



    }

    return (
        <div>
            <div className="main">
                <div className="sub-main">
                    <div>
                        <div>
                            <h1>Login Page</h1>
                            <div >
                                <input type="text" placeholder="Username" className="name" onChange={(e) => { setUsername(e.target.value) }} />
                            </div>
                            <div className="second-input">
                                <input type="password" placeholder="Password" className="name" onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div >
                                <button className="login-button" onClick={() => loginHandler()}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login