'use client';

import React, { useContext, useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AddSharpIcon from '@mui/icons-material/AddSharp';

import OwerlayLogo from '@/components/icons/OwerlayLogo';
import Search from '@/components/Search';
import DropdownMenu from '@/components/DropdownMenu';
import {
  btnOutlinedStyle,
  btnPrimaryStyle,
  colors,
  localStorageKey,
  mainContentMaxWidth,
  routes,
} from '@/constants';
import { AuthContext } from '@/components/OwerlayContextProvider';
import UserIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(AuthContext);
  const { loggedIn } = state;
  const pathname = usePathname();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
    if (user && user.loggedIn) {
      dispatch({
        type: 'LOGIN',
        payload: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          loggedIn: user.loggedIn,
        },
      });
    }
    setLoading(false);
  }, [dispatch, loggedIn]);

  return (
    <Box
      component="header"
      sx={{
        paddingBottom: { xs: '2rem', md: '4rem' },
        width: { xs: '100%', md: '85%', lg: '70%' },
        maxWidth: mainContentMaxWidth,
      }}
    >
      <AppBar
        sx={{
          position: 'static',
          backgroundColor: colors.backgroundPrimary,
          boxShadow: 'none',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: { xs: 'auto' },
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: '827px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              mr: '1rem',
            }}
          >
            <Link href={routes.home}>
              <OwerlayLogo fill={colors.textPrimary} />
            </Link>
            <Search searchFieldId={1} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
                gap: '1rem',
              }}
            >
              {!loading && loggedIn && (
                <>
                  <Link
                    href={
                      routes.profile +
                      `/${state.displayName.toLowerCase().replace(' ', '-')}`
                    }
                  >
                    <UserIcon
                      sx={{
                        color: colors.textSecondary,
                        fontSize: '48px',
                      }}
                    />
                  </Link>
                  <Button
                    onClick={() =>
                      router.push(`${pathname}${routes.uploadQuery}`)
                    }
                    variant="contained"
                    sx={btnPrimaryStyle}
                  >
                    <AddSharpIcon sx={{ mr: '0.5rem' }} />
                    Upload photo
                  </Button>
                </>
              )}
              {!loading && !loggedIn && (
                <>
                  <Button
                    onClick={() => router.push(routes.register)}
                    variant="outlined"
                    sx={btnOutlinedStyle}
                  >
                    Register
                  </Button>
                  <Button
                    onClick={() => router.push(routes.login)}
                    variant="contained"
                    sx={btnPrimaryStyle}
                  >
                    Login
                  </Button>
                </>
              )}
            </Box>

            <Box
              sx={{
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}
            >
              <DropdownMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
