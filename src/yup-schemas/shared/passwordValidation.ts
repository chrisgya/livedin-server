import * as yup from "yup";

export const PasswordValidation = yup
    .string()
    .min(4, 'Password should be at least 4 characters')
    .max(50, 'Password should be at most 50 characters')
    .required('Password is required');
