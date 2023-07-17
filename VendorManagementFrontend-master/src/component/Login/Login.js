import { React, useContext, useEffect, useState } from 'react'
import "../Login/Login.css"
import DataContext from '../../DataContext/DataContext'
import axios from 'axios';


function Login() {


    const [email, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [transaction, setTransaction] = useState([]);

    const [stat, setStat] = useState(true)

    const {id,setId, role, setRole, islogin, setIslogin, navigate } = useContext(DataContext);
    const [loginError, setLoginError] = useState(false);


    useEffect(() => {

        axios.get("https://localhost:7017/api/User").then((response) => {

            setTransaction(response.data);

            console.log(response.data)
        });

    }, []);

    function loginHandler(params) {



        const loginRequest = { email, password };


        axios.post("https://localhost:7017/login", loginRequest)
            .then((response) => {

                setIslogin(true)
            
                
                setRole(response.data.user.role.name.toLowerCase())
                const id=response.data.user.id
                setId(id)
                console.log(id)
                navigate("/dashboard")
                
                //localStorage.setItem("auth",  JSON.stringify(obj));
                console.log(
                JSON.parse(localStorage.getItem("auth")));

                

            }) .catch((error) => {
                
                console.error('Login failed:', error);
                setLoginError(true);
                
              });

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
                            <input type="text" placeholder="Email Address" className="name" onChange={(e) => { setUsername(e.target.value) }} required></input>
                        </div>
                        <div className="second-input">
                            <input type="password" placeholder="Password" className="name" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div >
                            <button className="login-button" onClick={() => loginHandler()}>Login</button>
                            {loginError && <p>Invalid credentials</p>}

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