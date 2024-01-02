import React from 'react';
import { Box } from '@mui/material';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import { getGalleryItems } from '@/lib/getGalleryItems';

const UserProfilePage = async () => {
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
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <UserProfile itemData={await getGalleryItems()} />
      </Box>
    </Box>
  );
};

export default UserProfilePage;
