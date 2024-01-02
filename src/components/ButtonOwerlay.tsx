import React from 'react';
import { Button } from '@mui/material';
import { colors } from '@/constants';

type BtnProps = {
  variant?: 'outlined' | 'contained' | 'danger';
  onClick?: (...args: any) => void;
  children?: React.ReactNode;
};

const ButtonOwerlay: React.FC<BtnProps> = ({
  variant = 'contained',
  onClick,
  children,
}: BtnProps) => {
  //setting MUI style override for button with white background
  const containedButtonStyle = {
    color: colors.textPrimary,
    backgroundColor: colors.backgroundPrimary + ' !important',
    border: '1px solid ' + colors.backgroundPrimary,
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
      backgroundColor: colors.backgroundPrimary,
    },
  };

  //setting MUI style for button with transparent background
  const outlinedButtonStyle = {
    ...containedButtonStyle,
    backgroundColor: 'transparent' + ' !important',
    border: '1px solid ' + colors.textPrimary,
    '&:hover': {
      opacity: 1,
      border: '1px solid ' + colors.textPrimary,
      backgroundColor: 'transparent',
    },
  };

  //setting MUI style for warning style button
  const dangerButtonStyle = {
    ...containedButtonStyle,
    backgroundColor: colors.buttonDanger + ' !important',
    border: '1px solid ' + colors.buttonDanger,
    opacity: 1,
    color: colors.textLight,
    '&:hover': {
      border: '1px solid ' + colors.buttonDanger,
      backgroundColor: '#e85a5a',
    },
  };

  return (
    <Button
      variant="owerlayBasic"
      sx={
        variant === 'contained'
          ? containedButtonStyle
          : variant === 'outlined'
          ? outlinedButtonStyle
          : dangerButtonStyle
      }
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonOwerlay;
