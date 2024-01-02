import React from 'react';
import { TextField } from '@mui/material';
import { uploadTextFieldStyles } from '@/constants';

const UploadTextField = ({
  descriptionRef,
}: {
  descriptionRef: React.MutableRefObject<any>;
}) => {
  return (
    <TextField
      fullWidth
      multiline
      minRows={3}
      maxRows={3}
      inputRef={descriptionRef}
      label="Description"
      placeholder="Add a description (optional)"
      sx={{
        ...uploadTextFieldStyles,
      }}
    />
  );
};

export default UploadTextField;
