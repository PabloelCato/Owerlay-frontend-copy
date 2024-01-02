'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, Modal, Typography } from '@mui/material';

import OwerlayMenuIcon from '@/components/icons/OwerlayMenuIcon';
import { btnPrimaryStyle, colors, routes } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { AuthContext } from '@/components/OwerlayContextProvider';
import Link from 'next/link';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const menuStyles = {
  position: 'absolute',
  top: '16px',
  left: '8px',
  '& .MuiList-root': {
    padding: '10px 0',
  },
  '& .MuiMenu-paper': {
    minWidth: '220px',
    backgroundColor: colors.backgroundPrimary,
    borderRadius: '12px',
    overflow: 'visible',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: '-6px',
      right: '20px',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '7px',
      borderLeftColor: colors.backgroundPrimary,
      borderTopColor: colors.backgroundPrimary,
      boxShadow:
        '-4px -4px 3px rgba(0,0,0, 0.02), -4px -4px 3px rgba(0,0,0, 0.02)',
      transform: 'rotate(45deg)',
    },
  },
};

const DropdownMenu = () => {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  const { loggedIn } = state;
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenModal(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenModal(false);
    setAnchorEl(null);
  };

  const handleRegister = () => {
    router.push(routes.register);
  };

  const handleLogin = () => {
    router.push(routes.login);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push(routes.home);
  };

  return (
    <Box>
      <Modal
        open={openModal}
        aria-labelledby="modal-menu"
        aria-describedby="modal-on-drop-down"
      >
        <Box display="none"></Box>
      </Modal>
      <Button
        variant="owerlayMenu"
        sx={{
          position: 'relative',
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
        <OwerlayMenuIcon fill={colors.textPrimary} />
      </Button>
      {loggedIn && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={menuStyles}
        >
          <Box
            sx={{
              padding: '1rem',
            }}
          >
            <Typography variant="h5">{state.displayName}</Typography>
            <Typography
              variant="body2"
              sx={{
                color: colors.textSecondary,
              }}
            >
              {state.email}
            </Typography>
          </Box>
          <Divider
            sx={{
              margin: '4px 0',
            }}
          />

          <MenuItem onClick={handleClose}>
            <Link
              style={{ width: '100%' }}
              href={
                routes.profile +
                `/${state.displayName.toLowerCase().replace(' ', '-')}`
              }
            >
              <Typography variant="body2">Profile</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              style={{ width: '100%' }}
              href={
                routes.settings +
                `/${state.displayName.toLowerCase().replace(' ', '-')}`
              }
            >
              <Typography variant="body2">Settings</Typography>
            </Link>
          </MenuItem>
          <Button
            onClick={() => {
              setOpenModal(false);
              setAnchorEl(null);
              router.push(`${pathname}${routes.uploadQuery}`);
            }}
            variant="contained"
            sx={{
              ...btnPrimaryStyle,
              width: '90%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '1rem',
              m: '0.5rem auto',
            }}
          >
            <AddSharpIcon />
            <Typography variant="body2" fontWeight="bold">
              Upload photo
            </Typography>
          </Button>
          <Divider
            sx={{
              margin: '4px 0',
            }}
          />
          <MenuItem onClick={handleLogout}>
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Menu>
      )}
      {!loggedIn && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={menuStyles}
        >
          <MenuItem onClick={handleRegister}>Register</MenuItem>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        </Menu>
      )}
    </Box>
  );
};
export default DropdownMenu;
