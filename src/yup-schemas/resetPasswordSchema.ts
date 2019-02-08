import * as yup from "yup";

import { PasswordValidation } from "./shared";

export const resetPasswordSchema = yup.object().shape({
    token: yup
    .string()
    .required('Make sure you use the token sent to your email.'),
    password: PasswordValidation,
    confirmpassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords are not the same!')
    .required('Password confirmation is required!')
});
