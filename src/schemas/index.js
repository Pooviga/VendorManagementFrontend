import * as yup from 'yup';
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const mobileRegex = /^[6-9]\d{9}$/;
export const basicSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").matches(emailRegex, {message: "Please enter a valid email"}).required("Required"),
    password: yup.string().min(5).matches(passwordRules, { message: "Please enter a valid stronger password" })
    .required("Required"),
    username: yup.string().required("Required"),
    emailRegister: yup.string().email("Please enter a valid email").matches(emailRegex, {message: "Please enter a valid email"}).required("Required"),
    passwordRegister: yup.string().min(5).matches(passwordRules, { message: "Please enter a valid stronger password" }).required("Required"),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref("passwordRegister"), null], "Passwords must match")
    .required("Required"),
    mobile: yup.string().required("Required").matches(mobileRegex,{message: "Enter 10 digits mobile number"})
})
