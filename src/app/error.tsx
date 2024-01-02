'use client';

import React from 'react';
import ButtonOwerlay from '@/components/ButtonOwerlay';
import { Box, Typography } from '@mui/material';
import { routes } from '@/constants';
import { useRouter } from 'next/navigation';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        margin: 'auto',
        maxWidth: '900px',
        padding: '2rem',
      }}
    >
      <Typography variant={'h4'} textAlign="center">
        Oops! An error occurred:
      </Typography>
      <Typography variant={'h5'} textAlign="center">
        {error.message}
      </Typography>
      <Typography variant={'h6'} textAlign="center">
        Please try again later.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          mt: '1rem',
        }}
      >
        <ButtonOwerlay
          variant={'outlined'}
          onClick={e => {
            e.preventDefault();
            router.push(routes.home);
          }}
        >
          Home page
        </ButtonOwerlay>
        <ButtonOwerlay variant={'outlined'} onClick={reset}>
          Try Again
        </ButtonOwerlay>
      </Box>
    </Box>
  );
};

export default Error;
