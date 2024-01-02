import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '@/components/Header';

const TermsOfService = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: '1rem', md: '2rem' },
        padding: { xs: '1rem 1.25rem', md: '2rem 0' },
      }}
    >
      <Header />
      <Typography variant="h4">These are our Terms of service</Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
        dignissimos ducimus, earum explicabo impedit inventore iste molestias
        obcaecati ullam voluptatum!
      </Typography>
    </Box>
  );
};

export default TermsOfService;
