import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

const ControlButtons = ({ handleStartExercise, handleStopExercise }) => {
    return (
        <Stack direction="row" spacing={1.5}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleStartExercise}
                startIcon={<PlayArrowRoundedIcon />}
                sx={{
                    px: 3.5,
                    py: 1.2,
                    fontSize: '0.9rem',
                    borderRadius: '12px',
                }}
            >
                Start Exercise
            </Button>
            <Button
                variant="outlined"
                onClick={handleStopExercise}
                startIcon={<StopRoundedIcon />}
                sx={{
                    px: 3.5,
                    py: 1.2,
                    fontSize: '0.9rem',
                    borderRadius: '12px',
                    borderColor: 'rgba(255, 107, 138, 0.3)',
                    color: '#FF6B8A',
                    '&:hover': {
                        borderColor: '#FF6B8A',
                        background: 'rgba(255, 107, 138, 0.08)',
                    },
                }}
            >
                Stop Exercise
            </Button>
        </Stack>
    );
};

ControlButtons.propTypes = {
    handleStartExercise: PropTypes.func.isRequired,
    handleStopExercise: PropTypes.func.isRequired,
};

export default ControlButtons;