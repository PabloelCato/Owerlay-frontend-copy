'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import { colors, localStorageKey, routes } from '@/constants';
import OwerlayLogo from '@/components/icons/OwerlayLogo';
import SocialLogins from '@/components/Socials';
import { AuthContext } from '@/components/OwerlayContextProvider';

type JoinProps = {
  imageURL: string;
  title: string;
  titleMobile: string;
  subtitle: string;
  subtitleMobile: string;
  children: React.ReactNode;
};
const Join: React.FC<JoinProps> = ({
  imageURL,
  title,
  titleMobile,
  subtitle,
  subtitleMobile,
  children,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { state, dispatch } = useContext(AuthContext);
  const { loggedIn } = state;
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
      router.push(routes.home);
    } else {
      setLoading(false);
    }
  }, [dispatch, router, loggedIn]);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        {/* Left Side Image */}
        <Container
          sx={{
            width: '50%',
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            margin: 0,
            padding: 0,
          }}
        >
          <Image
            src={imageURL}
            priority
            fill
            alt="Description"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </Container>

        {/* Right Side Registration Form */}
        <Container
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: { xs: '48px 20px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: '480px',
              gap: '0.5rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
              }}
            >
              {isMobile ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <OwerlayLogo
                    fill={colors.textPrimary}
                    width={75}
                    height={75}
                  />
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Typography variant="h4">{titleMobile}</Typography>
                    <Typography
                      variant="subtitle1"
                      color={colors.textSecondary}
                    >
                      {subtitleMobile}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h4" sx={{ color: colors.textPrimary }}>
                    {title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: colors.textSecondary,
                      marginTop: '1rem',
                    }}
                  >
                    {subtitle}
                  </Typography>
                </Box>
              )}
              <SocialLogins
                onError={error => {
                  if (
                    error.code ===
                    'auth/account-exists-with-different-credential'
                  ) {
                    alert(
                      'An account with this email address already exists. Please sign in with the original method.',
                    );
                  } else {
                    console.error(error);
                  }
                }}
              />
            </Box>
          </Box>
          <Divider
            sx={{
              width: '100%',
              maxWidth: '480px',
              fontSize: 14,
              color: colors.textSecondary,
            }}
          >
            OR
          </Divider>
          {children}
        </Container>
      </Box>
    );
  }
};

export default Join;
