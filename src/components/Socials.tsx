'use client';

import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { auth, google, facebook, twitter } from '@/lib/firebase';
import {
  AuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import Box from '@mui/material/Box';
import { AuthContext } from '@/components/OwerlayContextProvider';

type SocialLoginsProps = {
  onError: (error: any) => void;
};

const SocialLogins: React.FC<SocialLoginsProps> = ({ onError }) => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    getRedirectResult(auth)
      .then(result => {
        const user = result?.user;
        if (user) {
          dispatch({
            type: 'LOGIN',
            payload: {
              displayName: user.displayName || '',
              email: user.email || '',
              photoURL: user.photoURL || '',
              loggedIn: !!user.email,
            },
          });
        }
      })
      .catch(err => onError(err));
  }, [onError, dispatch]);
  const login = (provider: AuthProvider) => {
    signInWithRedirect(auth, provider).catch(err => console.log(err));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <Button variant="owerlayLogin" onClick={() => login(google)}>
        <Image
          src="/ic_google.svg"
          style={{
            width: 'auto',
            height: 'auto',
          }}
          height={24}
          width={24}
          alt="google-logo"
        />
      </Button>
      <Button variant="owerlayLogin" onClick={() => login(facebook)}>
        <Image
          src="/ic_facebook.svg"
          style={{
            width: 'auto',
            height: 'auto',
          }}
          height={25}
          width={24}
          alt="facebook-logo"
        />
      </Button>
      <Button variant="owerlayLogin" onClick={() => login(twitter)}>
        <Image
          src="/ic_twitter.svg"
          style={{
            width: 'auto',
            height: 'auto',
          }}
          height={25}
          width={24}
          alt="twitter-logo"
        />
      </Button>
    </Box>
  );
};

export default SocialLogins;
