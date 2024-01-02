export const findErrorType = (errors: UploadErrorType[], type: string) => {
  return errors.some(error => error.errorType === type);
};
