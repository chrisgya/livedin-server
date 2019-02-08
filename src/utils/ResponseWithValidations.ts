export const ResponseWithValidations = (success = true, message = 'success', path = '') => {
    return [{success, path, message}];
   }