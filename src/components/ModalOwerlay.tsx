'use client';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Modal } from '@mui/material';

import { colors } from '@/constants';

const style = {
  margin: { xs: 'auto', md: '186px auto' },
  width: { xs: '100%', md: '90%' },
  minHeight: { xs: '100vh', md: '800px' },
  background: colors.backgroundPrimary,
  border: 'none',
  borderRadius: { xs: 'none', md: '8px' },
  boxShadow: 24,
  p: { xs: '1rem', md: '2rem' },
  outline: 'none',
};

const ModalOwerlay = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const handleClose = useCallback(() => {
    setOpen(false);
    router.back();
  }, [router]);

  return (
    <Modal
      sx={{
        overflow: 'scroll',
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>{children}</Box>
    </Modal>
  );
};

export default ModalOwerlay;
