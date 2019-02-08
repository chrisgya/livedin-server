import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ success: boolean, path: string; message: string }> = [];
  err.inner.forEach(e => {
    errors.push({
      success: false,
      path: e.path,
      message: e.message
    });
  });

  return errors;
};
