export const getErrorResponse = (result) => {
  const error = new Error(result.error_description);
  error.code = result.code;
  return error;
};
