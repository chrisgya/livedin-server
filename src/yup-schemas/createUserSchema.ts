import * as yup from "yup";

import { EmailValidation, PasswordValidation, NameValidation, OptionalNameValidation } from "./shared";

export const createUserSchema = yup.object().shape({
    username: yup.string().required('Username is required'), 
    email: EmailValidation,
    firstname: NameValidation,
    middlename: OptionalNameValidation,
    lastname: NameValidation,
    password: PasswordValidation,
    confirmpassword: yup
                    .string()
                    .oneOf([yup.ref('password')], 'Passwords are not the same!')
                    .required('Password confirmation is required!')
});
