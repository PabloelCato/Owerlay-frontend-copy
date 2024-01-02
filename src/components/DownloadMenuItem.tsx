'use client';

import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

import { colors } from '@/constants';

type MenuItemProps = {
  menuTitle: string;
  menuDetails: string;
  handleItemClick: () => void;
};
const DownloadMenuItem: React.FC<MenuItemProps> = ({
  menuTitle,
  menuDetails,
  handleItemClick,
}) => {
  return (
    <MenuItem
      sx={{
        margin: '0 0.5rem',
        padding: '0.5rem 1rem',
        display: 'flex',
        gap: '5px',
        ':hover': {
          borderRadius: '8px',
          backgroundColor: colors.bgTranslucent,
        },
      }}
      onClick={handleItemClick}
    >
      <Typography
        sx={{
          fontSize: { xs: '12px', md: '14px' },
          fontWeight: 600,
          color: colors.textPrimary,
        }}
      >
        {menuTitle}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '12px', md: '14px' },
          color: colors.textSecondary,
        }}
      >
        {menuDetails}
      </Typography>
    </MenuItem>
  );
};

export default DownloadMenuItem;
