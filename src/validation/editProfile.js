import * as yup from "yup";

export const editProfile = yup.object({
  fullName: yup.string().required("Full Name is Required"),
  designation: yup.string().required("Designation is Required"),
  about: yup.string().required("About is Required").max(100),
});
