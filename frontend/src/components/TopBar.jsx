import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import AvatarMenu from './AvatarMenu';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        background: 'rgba(13, 15, 26, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <IconButton
          size="large"
          edge="start"
          onClick={() => navigate('/exercises')}
          sx={{
            mr: 1.5,
            color: '#6C63FF',
            '&:hover': {
              background: 'rgba(108, 99, 255, 0.1)',
            },
          }}
        >
          <SpaIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            fontSize: '1.2rem',
            background: 'linear-gradient(135deg, #6C63FF, #00D9A6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/exercises')}
        >
          RehabAI
        </Typography>
        <AvatarMenu />
      </Toolbar>
    </AppBar>
  );
}