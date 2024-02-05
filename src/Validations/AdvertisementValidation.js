import * as yup from "yup";
import moment from "moment";
export const advertisementValidation = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .matches(/^[a-zA-Z ]*$/, "Only alphabets are allowed"),
  description: yup
    .string()
    .trim()
    .required("Description is required"),
  link: yup
    .string()
    .trim()
    .url()
    .required("Url Link is required"),
  // adDate: yup
  //   .string()
  //   .required("Advertisement Maximum Date is required")
  //   .transform((value) =>
  //     value !== null ? moment(value).format("MM-DD-YYYY") : value
  //   ),

});