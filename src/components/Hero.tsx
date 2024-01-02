'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { colors } from '@/constants';
import Search from '@/components/Search';

const Hero = () => {
  return (
    <Box
      sx={{
        height: { xs: '13rem', sm: '25rem', lg: '32rem' },
        width: '100%',
        mb: { xs: '0', sm: '2rem', md: '4rem' },
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '100%',
          position: 'relative',
        }}
      >
        <Image
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
          src="https://images.unsplash.com/photo-1682686578601-e7851641d52c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Owerlay hero image"
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            display: { xs: 'block', md: 'none' },
          }}
        >
          <Typography variant="h1" color={colors.textLight}>
            Owerlay
          </Typography>
          <Typography variant="h3" color={colors.textLight}>
            Discover free visuals
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          height: '100%',
          flex: 1,
        }}
      >
        <Box
          sx={{
            height: '100%',
            background: colors.bgTranslucent,
            padding: '6rem 30% 0 2rem',
          }}
        >
          <Typography variant="h1">Owerlay</Typography>
          <Typography variant="h3">Discover free visuals</Typography>
          <Box height="56px" mt="1.5rem">
            <Search searchFieldId={2} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Hero;
