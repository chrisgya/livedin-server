import * as yup from "yup";

export const jobCreationSchema = yup.object().shape({
    title: yup
    .string()
    .max(250, 'Job title cannot exceed 250 characters')
    .required('Job title is required'),
    description: yup
    .string()
    .max(5000, 'Job description cannot exceed 5000 characters')
    .required('Job description is required'),
    location: yup
    .string()
    .max(100, 'Location cannot exceed 100 characters')
    .required('Location is required'),
    duration: yup
    .string()
    .max(50, 'Duration cannot exceed 50 characters')
    .required('Duration is required'),
    requirements: yup
    .array()
    .required('At least provide one job requirement'),
    requiredskills: yup
    .array()
    .required('At least provide one job skill requirement'),
    status: yup
    .string()
    .max(20, 'Status cannot exceed 20 characters')
    .required('Status is required'),
    expirydate: yup
    .date()
    .required('Job expiry date is required')
    
});
