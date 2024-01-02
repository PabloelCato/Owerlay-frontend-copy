'use client';

import React, { useContext, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '@/components/Header';
import { colors, routes } from '@/constants';
import Link from 'next/link';
import { AuthContext } from '@/components/OwerlayContextProvider';
import Upload from '@/components/Upload';
import { useRouter } from 'next/navigation';

const UploadPage = () => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { state } = useContext(AuthContext);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: '1rem', md: '2rem' },
        padding: '20px 28px',
      }}
    >
      <Header />
      {state.loggedIn && (
        <Upload
          cancelAction={() => router.back()}
          openConfirm={openConfirm}
          openConfirmAction={setOpenConfirm}
        />
      )}
      {!state.loggedIn && (
        <Typography>
          Please{' '}
          <Link href={routes.login} style={{ color: colors.buttonPrimary }}>
            login
          </Link>{' '}
          if you want to upload photos.
        </Typography>
      )}
    </Box>
  );
};

export default UploadPage;
