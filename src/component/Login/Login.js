import { React, useContext, useEffect, useState } from 'react'
import "../Login/Login.css"
import DataContext from '../../DataContext/DataContext'
import axios from 'axios'


function Login() {


    const [email, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [phoneNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    //const[role,setRoles]=useState("");


    const [transaction, setTransaction] = useState([]);

    const [stat, setStat] = useState(true)

    const { id, setId, role, setRole, islogin, setIslogin, navigate } = useContext(DataContext);
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
                const roleName = response.data.user.role.name.toLowerCase();
                console.log(response.data.user.role.name)
                const roleName = response.data.user.role.name.toLowerCase();
                console.log(response.data.user.role.name)
                setRole(roleName)
                const id = response.data.user.id
                setId(id)
                console.log(id)
                console.log(roleName)
                navigate("/dashboard")
                console.log(response.data);

            }).catch((error) => {

                console.error('Login failed:', error);
                setLoginError(true);

            });

    }
    function registerHandler(params) {
        const signUpRequest = { email, password, phoneNumber, role, name }
        axios.post("https://localhost:7017/api/User", signUpRequest)
            .then((response) => {

                console.log(response.data);

            }).catch((error) => {

                setLoginError(true);

            });

    }

    const handleRoleChange = (e) => {

        const selectedRole = e.target.value;

        setRole(selectedRole);

    };

    const handleUsernameChange = (e) => {

        const value = e.target.value;

        setUsername(value);

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        setUsername(emailRegex.test(value));

        if (setUsername) {

            setUsername(value);

        }

    };


    return (
        <div>
            <div className="main">
                <div className="sub-main">
                    {stat ? <div>
                        <h1>Login Page</h1>
                        <div >
                            <input type="text" placeholder="Email Address" className="name" value={email} onChange={handleUsernameChange} required></input>
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
                                    <input type="text" placeholder="Username" className="name" onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div className="second-input">
                                    <input type="text" placeholder="Email" className="name" value={email} onChange={handleUsernameChange} />

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
                                    <input type="text" placeholder="Mobile No" className="name" onChange={(e) => { setMobileNumber(e.target.value) }} />
                                    <input type="text" placeholder="Mobile No" className="name" onChange={(e) => { setMobileNumber(e.target.value) }} />
                                </div>
                                <div className="second-input">
                                    <select className="name" placeholder="Role" name="role" value={role} onChange={handleRoleChange}>
                                        <option className="name" value="Approver">Approver</option>
                                        <option className="name" value="User">User</option>
                                        <option className="name" value="Readonly">General User</option>
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