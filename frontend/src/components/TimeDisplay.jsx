import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';

const TimeDisplay = ({ isSaving, finalElapsedTime, elapsedTime, countdown }) => {
    // Countdown state
    if (!isSaving && countdown !== null && countdown >= 0) {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    animation: 'countdownPulse 1s ease infinite',
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        fontSize: '3.5rem',
                        background: 'linear-gradient(135deg, #6C63FF, #00D9A6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.1,
                    }}
                >
                    {countdown}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: '#9CA3BF', mt: 0.5, fontWeight: 500 }}
                >
                    Get ready...
                </Typography>
            </Box>
        );
    }

    // Active exercise timer
    if (isSaving) {
        return (
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.5,
                    py: 0.8,
                    borderRadius: '12px',
                    background: 'rgba(108, 99, 255, 0.1)',
                    border: '1px solid rgba(108, 99, 255, 0.2)',
                }}
            >
                <TimerOutlinedIcon sx={{ color: '#6C63FF', fontSize: '1.2rem', animation: 'pulse 1.5s infinite' }} />
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 600,
                        color: '#F0F0F8',
                        fontVariantNumeric: 'tabular-nums',
                    }}
                >
                    {elapsedTime}s
                </Typography>
            </Box>
        );
    }

    // Finished state
    if (countdown === null) {
        return (
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.5,
                    py: 0.8,
                    borderRadius: '12px',
                    background: 'rgba(0, 217, 166, 0.08)',
                    border: '1px solid rgba(0, 217, 166, 0.15)',
                }}
            >
                <HourglassTopRoundedIcon sx={{ color: '#00D9A6', fontSize: '1.1rem' }} />
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 600,
                        color: '#00D9A6',
                        fontVariantNumeric: 'tabular-nums',
                    }}
                >
                    Total: {finalElapsedTime}s
                </Typography>
            </Box>
        );
    }

    return null;
};

TimeDisplay.propTypes = {
    isSaving: PropTypes.bool,
    finalElapsedTime: PropTypes.number,
    elapsedTime: PropTypes.number,
    countdown: PropTypes.number,
};

export default TimeDisplay;