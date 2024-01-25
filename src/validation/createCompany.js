import * as yup from "yup";

export const createCompany = yup.object({
  companyName: yup.string().required("Company Name is Required"),
  email: yup.string().required("Email is Required"),
  licenseNo: yup.string().required("License No is Required"),
  about: yup.string().required("About is Required").max(100),
});
