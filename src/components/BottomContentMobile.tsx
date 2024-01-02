'use client';

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ButtonOwerlay from '@/components/ButtonOwerlay';
import DownloadMenu from '@/components/DownloadMenu';
import { colors } from '@/constants';
import AddIcon from '@mui/icons-material/Add';

const BottomContentMobile = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '8px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: '0.5rem',
        gap: '0.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          position: 'relative',
        }}
      >
        <ButtonOwerlay variant="outlined">Edit</ButtonOwerlay>
        <ButtonOwerlay variant="outlined">
          <AddIcon
            sx={{
              fontSize: '1.25rem',
            }}
          />
        </ButtonOwerlay>
        <ButtonOwerlay variant="outlined">
          <FavoriteBorderOutlinedIcon
            sx={{
              fontSize: '1.25rem',
            }}
          />
        </ButtonOwerlay>
      </Box>
      <Stack
        direction="row"
        sx={{
          position: 'relative',
          borderRadius: '8px',
          border: '1px solid ' + colors.textPrimary,
          padding: '8px 16px',
        }}
      >
        <Typography
          sx={{
            width: '100px',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '20px',
          }}
        >
          Download
        </Typography>
        <DownloadMenu />
      </Stack>
    </Box>
  );
};

export default BottomContentMobile;
