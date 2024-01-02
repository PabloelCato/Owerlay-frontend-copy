import React from 'react';
import { getGalleryItem } from '@/lib/getGalleryItem';
import ImageCard from '@/components/ImageCard';
import { Box } from '@mui/material';
import { mainContentMaxWidth } from '@/constants';
import Header from '@/components/Header';

const Page = async ({ params }: { params: { id: string } }) => {
  const { img, author } = await getGalleryItem(params.id);
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
        sx={{
          width: { xs: '100%', md: '70%' },
          maxWidth: { mainContentMaxWidth },
          margin: 'auto',
          p: { xs: 0, md: '2rem 0' },
        }}
      >
        <ImageCard
          followers={10000}
          imgURL={img}
          authorName={author}
          authorRoute={'/author'}
        />
      </Box>
    </Box>
  );
};

export default Page;
