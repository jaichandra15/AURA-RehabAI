import * as React from 'react';
import { useState } from 'react';
import {
    Stack, TextField, Button, Typography,
    InputAdornment, IconButton, Snackbar, Box
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import SpaIcon from '@mui/icons-material/Spa';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { api } from '../api';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            const response = await api.post('/api/login/', { username, password });
            console.log(response);
            navigate('/exercises')
        } catch (error) {
            console.error('Failed to login:', error);
            setErrorMessage(error.response.data.detail);
        }
    };

    const handleSignup = async () => {
        try {
            const response = await api.post('/api/signup/', { username, password });
            console.log(response);
            setOpen(true);
        } catch (error) {
            console.error('Failed to signup:', error);
            setErrorMessage(error.response.data.detail);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-15%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(108, 99, 255, 0.12) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 217, 166, 0.08) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                }}
            />

            {/* Login Card */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'rgba(26, 30, 53, 0.65)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: { xs: '2rem 1.5rem', sm: '3rem 3.5rem' },
                    width: '100%',
                    maxWidth: '440px',
                    mx: 2,
                    animation: 'scaleIn 0.5s ease forwards',
                    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4)',
                }}
            >
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                >
                    {/* Logo */}
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.2) 0%, rgba(0, 217, 166, 0.15) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(108, 99, 255, 0.2)',
                            mb: 0.5,
                        }}
                    >
                        <SpaIcon sx={{ fontSize: '2.8rem', color: '#6C63FF' }} />
                    </Box>

                    <Box textAlign="center">
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #6C63FF, #00D9A6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 0.5,
                            }}
                        >
                            AURA
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', fontSize: '0.9rem' }}
                        >
                            AI-powered physical therapy
                        </Typography>
                    </Box>

                    {/* Form */}
                    <TextField
                        id="login-username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextField
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {errorMessage && (
                        <Typography
                            sx={{
                                color: '#FF6B8A',
                                fontSize: '0.85rem',
                                textAlign: 'center',
                                animation: 'fadeIn 0.3s ease',
                            }}
                        >
                            {errorMessage}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1.5} sx={{ width: '100%', pt: 0.5 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleSignup}
                            sx={{
                                py: 1.3,
                                borderColor: 'rgba(255, 255, 255, 0.12)',
                                color: '#9CA3BF',
                                '&:hover': {
                                    borderColor: '#00D9A6',
                                    color: '#00D9A6',
                                    background: 'rgba(0, 217, 166, 0.06)',
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleLogin}
                            sx={{ py: 1.3 }}
                        >
                            Log In
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #00D9A6, #00B38A)',
                        borderRadius: '12px',
                    }}
                >
                    Signup successful! You can now log in.
                </Alert>
            </Snackbar>
        </Box>
    )
}