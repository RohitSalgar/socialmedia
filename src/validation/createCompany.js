import * as yup from "yup";

export const createCompany = yup.object({
  companyName: yup.string().trim().required("Company Name is Required"),
  email: yup.string().trim().required("Email is Required"),
  licenseNo: yup.string().trim().uppercase().required("License No is Required"),
  about: yup.string().trim().required("About is Required").max(100),
});
