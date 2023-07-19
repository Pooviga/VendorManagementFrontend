import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const mobileRegex = /^[6-9]\d{9}$/;
const pincoderegex = /^[1-9][0-9]{5}$/;
const quantityregex = /^[1-9]\d*$/;
export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(emailRegex, { message: "Please enter a valid email" })
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message: "Please enter a valid stronger password",
    })
    .required("Required"),
  username: yup.string().required("Required"),
  emailRegister: yup
    .string()
    .email("Please enter a valid email")
    .matches(emailRegex, { message: "Please enter a valid email" })
    .required("Required"),
  passwordRegister: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message: "Please enter a valid stronger password",
    })
    .required("Required"),
  passwordConfirm: yup
    .string()

    .oneOf([yup.ref("passwordRegister"), null], "Passwords must match")

    .required("Required"),

  mobile: yup

    .string()

    .required("Required")

    .matches(mobileRegex, { message: "Enter 10 digits mobile number" }),
});

export const addVendorSchema = yup.object().shape({
  vendorName: yup.string().required("Required"),

  vendorType: yup

    .string()

    .oneOf(
      ["Product", "Service", "Product&Service"],

      "Invalid Vendor Type(Valid Types are 1.Product 2.Service 3.Product&Service)"
    )

    .required("Required"),

  addressLine1: yup.string().required("Required"),

  city: yup.string().required("Required"),

  state: yup.string().required("Required"),

  postalCode: yup

    .string()

    .required("Required")

    .matches(pincoderegex, { message: "Enter 6 digits of pincode" }),

  country: yup.string().required("Required"),

  telePhone1: yup

    .string()

    .required("Required")

    .matches(mobileRegex, { message: "Enter 10 digits mobile number" }),

  vendorEmail: yup

    .string()

    .email("Please enter a valid email")

    .matches(emailRegex, { message: "Please enter a valid email" })

    .required("Required"),
  mobile: yup
    .string()
    .required("Required")
    .matches(mobileRegex, { message: "Enter 10 digits mobile number" }),
});

export const addVendorSchema = yup.object().shape({
  vendorName: yup.string().required("Required"),
  vendorType: yup
    .string()
    .oneOf(
      ["Product", "Service", "Product&Service"],
      "Invalid Vendor Type(Valid Types are 1.Product 2.Service 3.Product&Service)"
    )
    .required("Required"),
  addressLine1: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  postalCode: yup
    .string()
    .required("Required")
    .matches(pincoderegex, { message: "Enter 6 digits of pincode" }),
  country: yup.string().required("Required"),
  telePhone1: yup
    .string()
    .required("Required")
    .matches(mobileRegex, { message: "Enter 10 digits mobile number" }),
  vendorEmail: yup
    .string()
    .email("Please enter a valid email")
    .matches(emailRegex, { message: "Please enter a valid email" })
    .required("Required"),
  productName: yup.string().required("Required"),
  productDescription: yup.string().required("Required"),
  price: yup
    .string()
    .required("Required")
    .matches(quantityregex, { message: "Quantity should be atleast 1" }),
});
