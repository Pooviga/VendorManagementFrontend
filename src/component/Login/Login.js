import { React, useContext, useEffect, useState } from 'react'
import './Login.css'
import DataContext from '../../DataContext/DataContext'
import axios from 'axios'
import { colors } from '@mui/material';
import { useFormik } from "formik";
import { basicSchema } from '../../schemas';

function Login() {

    const {
        values,
        errors,
        setErrors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
            emailRegister: '',
            passwordRegister: '',
            passwordConfirm: '',
            mobile: ''
        },
        validationSchema: basicSchema
    })
    const [email, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [phoneNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [transaction, setTransaction] = useState([]);

    const [stat, setStat] = useState(true)

    const { username, setUser, phonenumber, setPhoneNumber, mail, setEmail, id, setId, role, setRole, islogin, setIslogin, navigate } = useContext(DataContext);
    const [loginError, setLoginError] = useState(false);


    useEffect(() => {

        axios.get("https://localhost:7017/api/User").then((response) => {

            setTransaction(response.data);
            // setIslogin(true);

            console.log(response.data)
        });

    }, []);

    function resetErrors() {
        let reset = {
            email: '',
            emailRegister: '',
            username: '',
            password: '',
            passwordRegister: '',
            passwordConfirm: '',
            mobile: ''
        };
        setErrors({ reset })
    }

    function loginHandler(params) {

        const loginRequest = {
            email: values.email,
            password: values.password
        }

        if (!errors.email && !errors.password) {
            axios.post("https://localhost:7017/login", loginRequest)
                .then((response) => {
                    setIslogin(true)
                    const roleName = response.data.user.role.name.toLowerCase();
                    console.log(response.data.user.role.name)
                    setRole(roleName)
                    const id = response.data.user.id
                    setId(id)
                    const mail = response.data.user.email
                    setEmail(mail)
                    const username = response.data.user.name
                    setUser(username)
                    const phonenumber = response.data.user.phoneNumber
                    setPhoneNumber(phonenumber)
                    console.log(id)
                    console.log(roleName)
                    navigate("/dashboard")
                    console.log(response.data);

                }).catch((error) => {

                    console.error('Login failed:', error);
                    setLoginError(true);

                });
        }

    }
    function registerHandler() {
        const signUpRequest = {
            email: values.emailRegister,
            name: values.username,
            password: values.passwordRegister,
            phoneNumber: values.mobile.toString()
        }
        if (!errors.emailRegister && !errors.username && !errors.passwordRegister && !errors.passwordConfirm && !errors.mobile) {
            axios.post("https://localhost:7017/api/User", signUpRequest)
                .then((response) => {

                    console.log(response.data);
                    setStat(!stat)

                }).catch((error) => {

                    setLoginError(true);

                });
        }

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
                            <input type="email" placeholder="Email Address" value={values.email}
                                id="email" onChange={(e) => { handleChange(e); setLoginError(false) }} onBlur={handleBlur}
                                className={errors.email && touched.email ? 'input-error' : ''}></input>
                            {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                        </div>
                        <div className="second-input">
                            <input type="password" placeholder="Password" value={values.password}
                                id="password" onChange={(e) => { handleChange(e); setLoginError(false) }} onBlur={handleBlur}
                                className={errors.password && touched.password ? 'input-error' : ''} />
                            {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                        </div>
                        <div >
                            <button className="login-button" onClick={(e) => { handleSubmit(e); loginHandler() }}>Login</button>
                            {loginError && <p className='error-color'>Invalid credentials</p>}

                        </div>
                        <div >
                            <button className="sign-button" onClick={() => { resetErrors(); setStat(!stat) }}>{stat ? "SignUp" : "SignIn"}</button>
                        </div>

                    </div>
                        :
                        <div>
                            <h1>Register Page</h1>
                            <div className='sidediv'>
                                <div className="second-input">
                                    <input type="text" placeholder="Username" value={values.username} id="username"
                                        onChange={(e) => { handleChange(e); setLoginError(false) }} onBlur={handleBlur}
                                        className={errors.username && touched.username ? 'input-error' : ''} />
                                    {errors.username && touched.username && <p className='error'>{errors.username}</p>}
                                </div>
                                <div className="second-input">
                                    <input type="email" placeholder="Email" value={values.emailRegister} id="emailRegister"
                                        onChange={(e) => { handleChange(e); setLoginError(false) }} onBlur={handleBlur}
                                        className={errors.emailRegister && touched.emailRegister ? 'input-error' : ''} />
                                    {errors.emailRegister && touched.emailRegister && <p className='error'>{errors.emailRegister}</p>}
                                </div>

                            </div>
                            <div className='sidediv'>
                                <div className="second-input">
                                    <input type="password" placeholder="Password" value={values.passwordRegister} id="passwordRegister"
                                        onChange={(e) => { handleChange(e); setLoginError(false) }} onBlur={handleBlur}
                                        className={errors.passwordRegister && touched.passwordRegister ? 'input-error' : ''} />
                                    {errors.passwordRegister && touched.passwordRegister && <p className='error'>{errors.passwordRegister}</p>}
                                </div>
                                <div className="second-input">
                                    <input type="password" placeholder="Confirm Password" value={values.passwordConfirm} id="passwordConfirm"
                                        onChange={(e) => { handleChange(e); setLoginError(false) }} onBlur={handleBlur}
                                        className={errors.passwordConfirm && touched.passwordConfirm ? 'input-error' : ''} />
                                    {errors.passwordConfirm && touched.passwordConfirm && <p className='error'>{errors.passwordConfirm}</p>}
                                </div>
                            </div>
                            <div className='sidediv'>
                                <div className="second-input mobile-container">
                                    <input type="number" placeholder="Mobile No" value={values.mobile} id="mobile"
                                        onChange={(e) => { handleChange(e); setLoginError(false) }} onBlur={handleBlur}
                                        style={{ width: '100%' }}
                                        className={errors.mobile && touched.mobile ? 'input-error' : ''} />
                                    {errors.mobile && touched.mobile && <p className='error'>{errors.mobile}</p>}
                                </div>
                            </div>

                            <div>
                                <div >
                                    <button className="login-button_signup" onClick={(e) => { handleSubmit(e); registerHandler() }}>SignUp</button>
                                </div>
                                <div >
                                    <button className="sign-button_signup" onClick={() => { resetErrors(); setStat(!stat); }}>{stat ? "SignUp" : "LogIn"}</button>
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