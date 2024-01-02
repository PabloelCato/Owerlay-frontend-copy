export const localStorageKey = 'owerlayUser';
export const galleryItemsGap = '32px';

export const mainContentMaxWidth = '1214px';

export const maxUploadFiles = 10;

export const ACCEPTED_FILES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export const maxFileSize = 5; //Number in MB

export const routes = {
  home: '/',
  images: '/images',
  search: '/search',
  login: '/login',
  register: '/register',
  profile: '/profile',
  upload: '/upload',
  uploadQuery: '?uploadModal=show',
  tos: '/tos', //terms-of service route
  privacyPolicy: '/privacy-policy',
  settings: '/profile',
};

export const colors = {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#919EAB',
  bgTranslucent: 'rgba(145,158,171,0.08)',
  bgTag: 'rgba(145,158,171,0.16)',
  bgDarkTranslucent: 'rgba(22,28,36,0.72)',
  textPrimary: '#212B36',
  textSecondary: '#637381',
  textLight: '#FFFFFF',
  buttonPrimary: '#2D76FF',
  buttonDanger: '#FF4842',
  buttonDisabled: '#DCE0E4',
  inputBorder: 'rgba(145,158,171,0.30)',
  modalBackdrop: 'rgba(33, 43, 54, 0.24)',
};

export const btnPrimaryStyle = {
  backgroundColor: colors.buttonPrimary,
  border: '1px solid ' + colors.buttonPrimary,
  color: colors.textLight,
  fontSize: '1.25rem',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    borderColor: colors.buttonPrimary,
    filter: 'brightness(1.1)',
  },
  '&:disabled': {
    background: colors.buttonDisabled,
    borderColor: colors.buttonDisabled,
  },
};

export const btnOutlinedStyle = {
  '&.MuiButton-outlined': {
    backgroundColor: colors.backgroundPrimary,
    border: '1px solid ' + colors.buttonPrimary,
    color: colors.buttonPrimary,
    fontSize: '1.25rem',
    '&:hover': {
      boxShadow: 'none',
      borderColor: colors.buttonPrimary,
      filter: 'brightness(0.98)',
    },
  },
};

export const uploadTextFieldStyles = {
  '&.MuiFormControl-root label': {
    left: '15px',
    transform: 'translateY(-50%)',
    fontSize: '12px',
    color: colors.backgroundSecondary,
  },
  '& .MuiInputBase-root': {
    display: 'flex',
    flexDirection: 'row !important',
    flexWrap: 'wrap',
    p: '10px 10px 10px 14px',
    '& fieldset': {
      '& legend': {
        maxWidth: '100%',
      },
    },
    '& input': {
      p: '6px 6px 6px 0px',
      width: 'auto',
    },
  },
  '& textarea::placeholder, input::placeholder': {
    opacity: 1,
    color: colors.backgroundSecondary,
  },

  '& label[data-shrink=false]+.MuiInputBase-formControl textarea::placeholder, label[data-shrink=false]+.MuiInputBase-formControl input::placeholder':
    { opacity: 1 + '!important' },
};
