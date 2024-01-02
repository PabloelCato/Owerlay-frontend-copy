'use client';

import React from 'react';
import { Box, Stack, Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { ACCEPTED_FILES, colors } from '@/constants';
import { numbersToWords } from '@/lib/numbersToWords';
import Button from '@mui/material/Button';
import UploadErrorImageStack from '@/components/UploadErrorImageStack';

const UploadError = ({
  errorType,
  incorrectFiles,
  errors,
  setUploadErrors,
  setIncorrectFiles,
}: {
  errorType: 'size' | 'type';
  incorrectFiles: UploadFile[];
  errors: UploadErrorType[];
  setUploadErrors: React.Dispatch<React.SetStateAction<UploadErrorType[]>>;
  setIncorrectFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}) => {
  const ErrorTypography = styled(Typography)<TypographyProps>(() => ({
    color: '#7A0C2E',
    lineHeight: '22px',
  }));

  const handleClick = (errorType: string) => {
    return () => {
      const newArr = [...errors];
      let idx = newArr.findIndex(error => error.errorType === errorType);
      newArr.splice(idx, 1);
      setUploadErrors(newArr);
      errorType === 'size' && setIncorrectFiles([]);
      errorType === 'type' && setIncorrectFiles([]);
    };
  };

  return (
    <Stack
      sx={{
        width: '100%',
        maxWidth: '400px',
        background: '#FFE7D9',
        padding: '10px',
        gap: '1rem',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '0.5rem',
        }}
      >
        <ErrorRoundedIcon sx={{ color: colors.buttonDanger }} />
        <ErrorTypography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Trouble uploading the following files:
        </ErrorTypography>
      </Stack>
      <Box>
        <ErrorTypography
          variant="body1"
          sx={{
            display: 'inline-block',
            textTransform: 'capitalize',
          }}
        >
          {numbersToWords(incorrectFiles.length > 0 ? incorrectFiles.length : 0)
            .toString()
            .toLowerCase()}
          &nbsp;
        </ErrorTypography>
        <ErrorTypography
          variant="body1"
          sx={{
            display: 'inline-block',
            textTransform: 'lowercase',
          }}
        >
          {errorType === 'size'
            ? `file${
                incorrectFiles.length > 1 ? 's' : ''
              } did not meet maximum size`
            : `file${
                incorrectFiles.length > 1 ? 's are' : ' is'
              } of incorrect type`}
        </ErrorTypography>
        <ErrorTypography variant="body2" sx={{ fontSize: '12px' }}>
          {errorType === 'size'
            ? 'Please upload images under 5MP'
            : `Accepted types: ${ACCEPTED_FILES.join(', ')}`}
        </ErrorTypography>
      </Box>
      <Stack
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {incorrectFiles.map(file => {
          const filePath = URL.createObjectURL(file.data);
          if (errorType === 'size') {
            return (
              <UploadErrorImageStack
                key={file.id}
                filePath={filePath}
                fileName={file.data.name}
              />
            );
          } else
            return (
              <UploadErrorImageStack
                key={file.id}
                filePath={'illustration_upload.svg'}
                fileName={file.data.name}
              />
            );
        })}
      </Stack>

      <ErrorTypography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
        }}
      >
        {errorType === 'size'
          ? 'You may re-upload them or proceed to ' +
            'publishing without these images.'
          : 'Incorrect file types cannot be uploaded.'}
      </ErrorTypography>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleClick(errorType)}
        sx={{
          borderColor: '#7A0C2E',
          color: '#7A0C2E',
          padding: '6px 16px',
          '&:hover': {
            borderColor: '#7A0C2E',
            color: '#7A0C2E',
            background: 'rgba(122,12,46, 0.08)',
          },
        }}
      >
        OK, got it
      </Button>
    </Stack>
  );
};

export default UploadError;
