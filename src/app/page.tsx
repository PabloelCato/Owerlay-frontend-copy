import Hero from '../components/Hero';
import ImageGallery from '@/components/ImageGallery';
import { getGalleryItems } from '@/lib/getGalleryItems';
import { Box } from '@mui/material';
import Header from '@/components/Header';
import React from 'react';

export default async function Home() {
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
      <Box
        component="main"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: '1rem', md: '2rem' },
        }}
      >
        <Hero />
        <ImageGallery itemData={await getGalleryItems()} />
      </Box>
    </Box>
  );
}
