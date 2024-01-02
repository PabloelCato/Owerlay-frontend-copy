'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/components/OwerlayContextProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Modal, Typography } from '@mui/material';
import { colors, routes } from '@/constants';
import Upload from '@/components/Upload';
import Link from 'next/link';

const UploadModal = () => {
  const { state } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const router = useRouter();
  const queryParams = useSearchParams();
  const showUploadModal = queryParams.get('uploadModal') === 'show';

  useEffect(() => {
    if (showUploadModal) setOpenModal(true);
  }, [showUploadModal]);

  const closeModal = useCallback(() => {
    setOpenModal(false);
    router.back();
  }, [router]);

  const handleClose = useCallback(() => {
    setOpenConfirm(true);
  }, []);

  return (
    <Modal
      sx={{
        overflow: 'scroll',
      }}
      open={openModal}
      onClose={handleClose}
      aria-labelledby="upload-modal"
      aria-describedby="component-displaying-upload-options"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          margin: { xs: 'auto', md: '186px auto' },
          width: { xs: '100%', md: '90%' },
          minHeight: { xs: '100vh', md: 0 },
          background: colors.backgroundPrimary,
          border: 'none',
          borderRadius: { xs: 'none', md: '8px' },
          boxShadow: 24,
          p: { xs: '16px 20px', md: '20px 28px' },
          outline: 'none',
        }}
      >
        {state.loggedIn && (
          <Upload
            cancelAction={closeModal}
            openConfirm={openConfirm}
            openConfirmAction={setOpenConfirm}
            closeModal={closeModal}
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
    </Modal>
  );
};

export default UploadModal;
