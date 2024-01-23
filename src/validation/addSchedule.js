import * as yup from 'yup';

const AddScheduleValidation = yup.object({
    pol: yup.string().required('pol is required'),
    pod: yup.string().required('pod is required'),
    bookingDate: yup.string().required('booking date is required'),
    openingDate: yup.string().required('opening date is required'),
})

export { AddScheduleValidation }