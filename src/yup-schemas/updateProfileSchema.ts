import * as yup from "yup";

import { NameValidation, OptionalNameValidation } from "./shared";

export const updateProfileSchema = yup.object().shape({
    firstname: NameValidation,
    middlename: OptionalNameValidation,
    lastname: NameValidation
});



