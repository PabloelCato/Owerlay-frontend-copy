import { createTheme } from '@mui/material';
import { Public_Sans } from 'next/font/google';
import { colors } from '@/constants/index';

const publicSans = Public_Sans({ subsets: ['latin'] });

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    owerlayBasic: true;
    owerlayLogin: true;
    owerlayMenu: true;
  }
}

export const owerlayTheme = createTheme({
  typography: {
    fontFamily: publicSans.style.fontFamily,
  },
  components: {
    MuiModal: {
      styleOverrides: {
        backdrop: {
          background: colors.modalBackdrop,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          minHeight: 'auto',
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: '700',
          letterSpacing: 0,
          transition: 'all 0.3s',
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            padding: '10px 21px',
            lineHeight: '26px',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            padding: '10px 21px',
            lineHeight: '26px',
          },
        },
        {
          props: { variant: 'owerlayBasic' },
          style: ({ theme }) => ({
            [theme.breakpoints.down('md')]: {
              padding: '7px 15px',
              lineHeight: '20px',
            },
            [theme.breakpoints.up('md')]: {
              padding: '11px 22px',
              lineHeight: '26px',
            },
          }),
        },
        {
          props: { variant: 'owerlayLogin' },
          style: ({ theme }) => ({
            [theme.breakpoints.down('lg')]: {
              minWidth: '105px',
            },
            [theme.breakpoints.up('lg')]: {
              minWidth: '150px',
            },
            padding: '11px 22px',
            lineHeight: '26px',
            minHeight: 'auto',
            border: '1px solid ' + colors.inputBorder,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: '700',
            letterSpacing: '0px',
            transition: 'all 0.3s',
          }),
        },
        {
          props: { variant: 'owerlayMenu' },
          style: ({ theme }) => ({
            minWidth: 'auto',
            minHeight: 'auto',
            padding: 0,
            border: 'none',
            textTransform: 'none',
            fontWeight: '700',
            letterSpacing: '0px',
            transition: 'all 0.3s',
          }),
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: colors.textPrimary,
          },
          '& .MuiOutlinedInput-root': {
            color: colors.textPrimary,
            '& fieldset': {
              borderRadius: '8px',
              borderColor: colors.inputBorder,
            },
            '&:hover fieldset': {
              borderColor: colors.textPrimary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.textPrimary,
              borderWidth: '1px',
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 0,
          padding: '0.5rem 1rem',
          lineHeight: '22px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: '546px',
          gap: '1.5rem',
          padding: '2rem',
          borderRadius: '8px',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 0,
          color: colors.textPrimary,
          fontWeight: 700,
          fontSize: '1.5rem',
          lineHeight: '2.25rem',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: colors.textPrimary,
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '30px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
});

owerlayTheme.typography.h1 = {
  ...owerlayTheme.typography,
  fontSize: '4rem',
  fontWeight: 700,
  lineHeight: '5rem',
  [owerlayTheme.breakpoints.down('md')]: {
    fontWeight: 400,
  },
};

owerlayTheme.typography.h3 = {
  ...owerlayTheme.typography,
  fontSize: '2rem',
  fontWeight: 600,
  lineHeight: '3rem',
  [owerlayTheme.breakpoints.down('md')]: {
    fontWeight: 400,
  },
};

owerlayTheme.typography.h4 = {
  ...owerlayTheme.typography,
  fontSize: '1.5rem',
  fontWeight: 700,
  lineHeight: '2.25rem',
};

owerlayTheme.typography.h5 = {
  ...owerlayTheme.typography,
  fontSize: '1rem',
  fontWeight: 600,
  lineHeight: '1.5rem',
};

owerlayTheme.typography.h6 = {
  ...owerlayTheme.typography,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
};
