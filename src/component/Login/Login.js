import { React, useContext, useEffect, useState } from 'react'
import "../Login/Login.css"
import DataContext from '../../DataContext/DataContext'
import axios from 'axios'


function Login() {


    const [email, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [transaction, setTransaction] = useState([]);

    const [stat, setStat] = useState(true)

    const { role, setRole, islogin, setIslogin, navigate } = useContext(DataContext);

    useEffect(() => {

        axios.get("https://localhost:7017/api/User").then((response) => {

         //   setTransaction(response.data);

            console.log(response.data)
        });

    }, []);

    function loginHandler(params) { 



          const loginRequest = { email, password };

          axios.post("https://localhost:7017/login", loginRequest)
          .then((response) => { 
          console.log(response.data); // Log the response data
      // Other logic using the response data
    })



          
        //   const response = axios.post("https://localhost:7017/login", loginRequest);
          
        //   if (response) {
        //     console.log(response.data)
        //    setTransaction(response);
    
            // // Map through the transactions only if the login request was successful
            // response.data.map((detail) => {
            //   console.log(detail);
            //   setRole(detail.role.name);
            //   setIsLogin(true);
            //   console.log(detail.role.name);
            //   navigate("/dashboard");
            // });
          }

        // transaction.map((detail) => {

        //     // console.log(detail)  


        //         setIslogin(true)



        //         console.log(detail.role.name)

        //         setRole(detail.role.name)

        //         navigate("/dashboard")

        //         //add
            

        // })



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