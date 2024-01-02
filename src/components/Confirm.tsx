'use client';

import React, { SetStateAction } from 'react';

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import ButtonOwerlay from '@/components/ButtonOwerlay';

//Custom confirm dialog component

type ConfirmDialogProps = {
  dialogButton: React.ReactNode;
  dialogTitle: string;
  dialogText: string;
  confirmDialogText: string;
  cancelDialogText: string;
  openConfirm: boolean;
  cancelAction: () => void;
  openConfirmAction: React.Dispatch<SetStateAction<boolean>>;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  dialogButton,
  dialogTitle,
  dialogText,
  confirmDialogText,
  cancelDialogText,
  cancelAction,
  openConfirm,
  openConfirmAction,
}) => {
  const handleOpen = () => {
    openConfirmAction(true);
  };
  const handleCancelDialog = () => {
    openConfirmAction(false);
  };

  const handleConfirmDialog = () => {
    openConfirmAction(false);
    cancelAction();
  };

  return (
    <React.Fragment>
      <Box onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        {dialogButton}
      </Box>

      <Dialog
        open={openConfirm}
        onClose={handleCancelDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: { xs: '18px', md: '24px' },
          }}
        >
          {dialogTitle}
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: { xs: '18px', md: '24px' },
            }}
          >
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            gap: '0.5rem',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
          disableSpacing
        >
          <ButtonOwerlay variant="outlined" onClick={handleCancelDialog}>
            {cancelDialogText}
          </ButtonOwerlay>
          <ButtonOwerlay variant="danger" onClick={handleConfirmDialog}>
            {confirmDialogText}
          </ButtonOwerlay>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmDialog;
