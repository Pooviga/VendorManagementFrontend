import { React, useContext, useEffect, useState } from 'react'
import "../Login/Login.css"
import DataContext from '../../DataContext/DataContext'
import axios from 'axios'


function Login() {


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [transaction, setTransaction] = useState([]);

    const [stat, setStat] = useState(true)

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
    function registerHandler(params) {

    }

    return (
        <div>
            <div className="main">
                <div className="sub-main">
                    {stat ? <div>
                        <h1>Login Page</h1>
                        <div >
                            <input type="text" placeholder="Username" className="name" onChange={(e) => { setUsername(e.target.value) }} required></input>
                        </div>
                        <div className="second-input">
                            <input type="password" placeholder="Password" className="name" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div >
                            <button className="login-button" onClick={() => loginHandler()}>Login</button>
                        </div>
                        <div >
                            <button className="sign-button" onClick={() => setStat(!stat)}>{stat ? "SignUp" : "SignIn"}</button>
                        </div>

                    </div>
                        :
                        <div>
                            <h1>Register Page</h1>
                            <div className='sidediv'>
                                <div className="second-input">
                                    <input type="text" placeholder="Username" className="name" onChange={(e) => { setUsername(e.target.value) }} />
                                </div>
                                <div className="second-input">
                                    <input type="text" placeholder="Email" className="name" onChange={(e) => { setUsername(e.target.value) }} />
                                </div>

                            </div>
                            <div className='sidediv'>
                                <div className="second-input">
                                    <input type="password" placeholder="Password" className="name" onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="second-input">
                                    <input type="password" placeholder="Confirm Password" className="name" onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                            </div>
                            <div className='sidediv'>
                                <div className="second-input">
                                    <input type="text" placeholder="Mobile No" className="name" onChange={(e) => { setUsername(e.target.value) }} />
                                </div>
                                <div className="second-input">
                                    <select className="name" placeholder="Role" name="role">
                                        <option className="name" value="approver">Approver</option>
                                        <option className="name" value="user">User</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div >
                                    <button className="login-button_signup" onClick={() => registerHandler()}>SignUp</button>
                                </div>
                                <div >
                                    <button className="sign-button_signup" onClick={() => setStat(!stat)}>{stat ? "SignUp" : "LogIn"}</button>
                                </div>
                            </div>

                        </div>
                    }



                </div>
            </div>
        </div>
    )
}

export default Login