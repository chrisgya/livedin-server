import * as yup from "yup";

const msg = 'Login failed. Invalid email/password';
export const loginSchema = yup.object().shape({
    username_email:  yup
    .string()
    .min(3, msg)
    .max(500, msg)
    .required(msg),
    password: yup
    .string()
    .min(4, msg)
    .max(50, msg)
    .required(msg)
});
