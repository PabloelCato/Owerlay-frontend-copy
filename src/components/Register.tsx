import React, { useContext, useState } from 'react';
import Join from '@/components/Join';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { btnPrimaryStyle, colors, routes } from '@/constants';
import { createWithEmailAndPass } from '@/lib/firebase';
import { AuthContext } from '@/components/OwerlayContextProvider';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();

    const { firstName, lastName, emailAddress, password } = e.currentTarget;
    const displayName = `${firstName.value} ${lastName.value}`;
    try {
      const userCredential = await createWithEmailAndPass(
        emailAddress.value,
        password.value,
        displayName,
      );
      const user = userCredential?.user;
      if (user) {
        dispatch({
          type: 'LOGIN',
          payload: {
            displayName: user.displayName || '',
            email: user.email || '',
            loggedIn: !!user.email,
            photoURL: user.photoURL || '',
          },
        });
      }
    } catch (error: any) {
      console.log(error);

      setEmailError(null);
      setPasswordError(null);

      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setEmailError('Email already in use.');
            break;
          case 'auth/invalid-email':
            setEmailError('Invalid email address.');
            break;
          case 'auth/weak-password':
            setPasswordError('Password is too weak.');
            break;
          default:
            alert('Please enter information to all blanks.');
            break;
        }
      }
    }
  };

  return (
    <Join
      imageURL="https://images.unsplash.com/photo-1688989831852-e744eebdee84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      title="Get started absolutely free."
      titleMobile="Get started"
      subtitle="Free forever. No credit card needed."
      subtitleMobile="Take photos."
    >
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '1rem',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            variant="outlined"
            InputLabelProps={{ required: false }}
            fullWidth
            required
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            variant="outlined"
            InputLabelProps={{ required: false }}
            fullWidth
            required
          />
        </Box>

        <TextField
          id="emailAddress"
          name="emailAddress"
          label="Email address"
          variant="outlined"
          fullWidth
          InputLabelProps={{ required: false }}
          required
          type="email"
          helperText={emailError}
          error={Boolean(emailError)}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          variant="outlined"
          helperText={passwordError}
          error={Boolean(passwordError)}
          InputLabelProps={{ required: false }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            ...btnPrimaryStyle,
            fontSize: '15px' + ' !important',
          }}
        >
          Register
        </Button>
      </Box>
      {isMobile ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary, fontWeight: 600 }}
          >
            Have an account?&nbsp;
          </Typography>
          <Link href={routes.login}>
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'underline',
                color: colors.buttonPrimary,
                fontWeight: 600,
              }}
            >
              Login
            </Typography>
          </Link>
        </Box>
      ) : (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: colors.textSecondary }}>
            By signing up, I agree to Owerlay&nbsp;
            <Link href={routes.tos} style={{ display: 'inline-block' }}>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'underline',
                }}
              >
                Terms of Service
              </Typography>
            </Link>
            &nbsp;and&nbsp;
            <Link
              href={routes.privacyPolicy}
              style={{ display: 'inline-block' }}
            >
              <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                Privacy Policy
              </Typography>
            </Link>
          </Typography>
        </Box>
      )}
    </Join>
  );
};

export default Register;
