'use client';

import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Box, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import DownloadMenuItem from '@/components/DownloadMenuItem';
import { colors } from '@/constants';

const DownloadMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        right: '0',
        height: '100%',
        width: { xs: '33px', md: '44px' },
        borderLeft: '1px solid ' + colors.textPrimary,
        borderRadius: '0 8px 8px 0',
      }}
    >
      <Button
        sx={{
          borderRadius: '0 8px 8px 0',
          width: '100%',
          height: '100%',
          color: colors.textPrimary,
          ':hover': {
            backgroundColor: colors.bgTranslucent,
          },
        }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon
          sx={{
            fontSize: { xs: '20px', md: '26px' },
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          top: '1.2rem',
          '& .MuiMenu-paper': {
            width: { xs: '200px', md: '220px' },
            backgroundColor: colors.backgroundPrimary,
            borderRadius: '12px',
            overflow: 'visible',
            boxShadow: '0px 20px 40px -4px rgba(145, 158, 171, 0.16)',
            '&::before': {
              content: "''",
              position: 'absolute',
              top: '-0.5rem',
              right: '1rem',
              borderColor: 'transparent',
              borderStyle: 'solid',
              borderWidth: '0.5rem',
              borderLeftColor: colors.backgroundPrimary,
              borderTopColor: colors.backgroundPrimary,
              boxShadow:
                '-4px -4px 3px rgba(145, 158, 171, 0.02), -4px -4px 3px rgba(145, 158, 171, 0.02)',
              transform: 'rotate(45deg)',
            },
          },
        }}
      >
        <DownloadMenuItem
          menuTitle="Small"
          menuDetails="(640 x 959)"
          handleItemClick={handleClose}
        />
        <DownloadMenuItem
          menuTitle="Medium"
          menuDetails="(1920 x 2879)"
          handleItemClick={handleClose}
        />
        <DownloadMenuItem
          menuTitle="Large"
          menuDetails="(2400 x 3599)"
          handleItemClick={handleClose}
        />
        <Divider sx={{ margin: '0.5rem 0' }} />
        <DownloadMenuItem
          menuTitle="Original Size"
          menuDetails="(3965 x 5947)"
          handleItemClick={handleClose}
        />
      </Menu>
    </Box>
  );
};
export default DownloadMenu;
