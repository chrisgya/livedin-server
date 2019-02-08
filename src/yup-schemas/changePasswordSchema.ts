import * as yup from "yup";

import { PasswordValidation } from "./shared";

export const changePasswordSchema = yup.object().shape({
    username_email: yup.string().required('Username/email is required'),
    password: PasswordValidation,
    newPassword: PasswordValidation,
    confirmpassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords are not the same!')
    .required('Password confirmation is required!')
});
