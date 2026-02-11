import { useState } from 'react';
import {
  Box, Avatar, Menu, MenuItem, ListItemIcon,
  Divider, IconButton, Tooltip, Typography
} from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import PersonIcon from '@mui/icons-material/Person';

export default function AvatarMenu() {
  const navigateTo = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogOut = async () => {
    console.log("logged out");
    handleClose();
    try {
      const response = await api.post('/api/logout/');
      console.log(response.data.message);
      navigateTo('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            edge="end"
            sx={{
              ml: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              width: 42,
              height: 42,
              transition: 'all 0.25s ease',
              '&:hover': {
                borderColor: 'rgba(108, 99, 255, 0.5)',
                background: 'rgba(108, 99, 255, 0.08)',
              },
            }}
          >
            <PersonIcon sx={{ fontSize: '1.4rem', color: '#9CA3BF' }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            mt: 1.5,
            backgroundColor: '#1A1E35',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            minWidth: 180,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1.5,
            },
            '& .MuiMenuItem-root': {
              borderRadius: '8px',
              mx: 0.8,
              my: 0.3,
              px: 1.5,
              fontSize: '0.9rem',
              color: '#9CA3BF',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(108, 99, 255, 0.1)',
                color: '#F0F0F8',
              },
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#1A1E35',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar sx={{ bgcolor: 'rgba(108, 99, 255, 0.2)' }}>
            <PersonIcon sx={{ color: '#6C63FF', fontSize: '1.1rem' }} />
          </Avatar>
          <Typography sx={{ fontSize: '0.9rem' }}>Profile</Typography>
        </MenuItem>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)', mx: 1 }} />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" sx={{ color: '#9CA3BF' }} />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={handleCloseLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#FF6B8A' }} />
          </ListItemIcon>
          <Typography sx={{ color: '#FF6B8A', fontSize: '0.9rem' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}