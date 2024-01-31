import * as yup from "yup";

export const editProfile = yup.object({
  fullName: yup.string().trim().required("Full Name is Required").matches(/^[A-Za-z\s]*$/, "Only alphabets are allowed"),
  designation: yup.string().trim().required("Designation is Required").matches(/^[A-Za-z\s]*$/, "Only alphabets are allowed"),
  about: yup.string().trim().required("About is Required").max(100),
});
