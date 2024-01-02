import React, { useContext, useState } from 'react';
import Join from '@/components/Join';
import {
  Box,
  Button,
  Checkbox,
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
import { loginWithEmail } from '@/lib/firebase';
import { AuthContext } from '@/components/OwerlayContextProvider';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const theme = useTheme();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();

    const { emailAddress, password } = e.currentTarget;

    try {
      const userCredential = await loginWithEmail(
        emailAddress.value,
        password.value,
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

      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            setEmailError('Invalid email address.');
            break;
          case 'auth/wrong-password':
            setPasswordError('Wrong password.');
            break;
          default:
            alert('Too many failed login atempts try again later');
            break;
        }
      }
    }
  };

  return (
    <Join
      imageURL="https://images.unsplash.com/photo-1688649102473-099b9d16aa32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80"
      title="Login"
      subtitle="To collect Mathias photo you need to login."
      titleMobile="Login"
      subtitleMobile="To like Mathias photo you need to login."
    >
      <Box
        component="form"
        onSubmit={handleLogin}
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
        <TextField
          id="emailAddress"
          name="emailAdress"
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
          error={Boolean(passwordError)}
          helperText={passwordError}
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Checkbox id="remember-credentials" />
            <Typography variant="body2">Remember me</Typography>
          </Box>
          <Link href={routes.home}>
            <Typography
              variant="body2"
              sx={{
                color: colors.buttonPrimary,
                fontWeight: 600,
              }}
            >
              Forgot password?
            </Typography>
          </Link>
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            ...btnPrimaryStyle,
            fontSize: '15px' + ' !important',
          }}
        >
          Login
        </Button>
      </Box>

      {isMobile ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary, fontWeight: 600 }}
          >
            Don&apos;t have an account?&nbsp;
          </Typography>
          <Link href={routes.register}>
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'underline',
                color: colors.buttonPrimary,
                fontWeight: 600,
              }}
            >
              Register
            </Typography>
          </Link>
        </Box>
      ) : null}
    </Join>
  );
};

export default Login;
