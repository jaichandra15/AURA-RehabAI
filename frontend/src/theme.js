import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF',
      light: '#8B83FF',
      dark: '#4E47CC',
    },
    secondary: {
      main: '#00D9A6',
      light: '#33E4BC',
      dark: '#00B38A',
    },
    error: {
      main: '#FF6B8A',
    },
    warning: {
      main: '#FFB547',
    },
    success: {
      main: '#00D9A6',
    },
    background: {
      default: '#0D0F1A',
      paper: '#1A1E35',
    },
    text: {
      primary: '#F0F0F8',
      secondary: '#9CA3BF',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 28px',
          fontSize: '0.95rem',
          letterSpacing: '0.02em',
          transition: 'all 0.25s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6C63FF 0%, #8B83FF 100%)',
          boxShadow: '0 4px 15px rgba(108, 99, 255, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5B53EE 0%, #7A73EE 100%)',
            boxShadow: '0 6px 20px rgba(108, 99, 255, 0.5)',
            transform: 'translateY(-1px)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #00D9A6 0%, #33E4BC 100%)',
          color: '#0D0F1A',
          boxShadow: '0 4px 15px rgba(0, 217, 166, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #00C496 0%, #28D4AD 100%)',
            boxShadow: '0 6px 20px rgba(0, 217, 166, 0.45)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.15)',
          '&:hover': {
            borderColor: '#6C63FF',
            background: 'rgba(108, 99, 255, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(108, 99, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6C63FF',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9CA3BF',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#6C63FF',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1E35',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.06)',
          backgroundImage: 'none',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(13, 15, 26, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
