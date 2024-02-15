import * as yup from "yup";

export const createCompany = yup.object({
  companyName: yup.string().trim().required("Company Name is Required"),
  email: yup
  .string()
  .email("Enter valid email")
  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter valid email")
  .required("Email is required"),  licenseNo: yup.string().trim().uppercase().required("License No is Required").matches("^[a-zA-Z0-9_]*$", 'Only AlphaNumeric are allowed').min(21, 'enter valid 21 length number').max(21, 'enter valid 21 length number'),
  about: yup.string().trim().required("About is Required").max(300),
});
