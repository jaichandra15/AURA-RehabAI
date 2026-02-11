import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, CircularProgress, Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const FeedbackDisplay = ({ isSaving, currentFeedbackMessages, feedbackMessages, isExerciseFinished, clinicalScore }) => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '950px',
                overflow: 'hidden',
            }}
        >
            {/* Keep Going Banner */}
            {!isExerciseFinished && isSaving && currentFeedbackMessages.length === 0 && (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 2,
                        px: 3,
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(0, 217, 166, 0.12), rgba(0, 179, 138, 0.08))',
                        border: '1px solid rgba(0, 217, 166, 0.2)',
                        animation: 'fadeIn 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                    }}
                >
                    <CheckCircleOutlineIcon sx={{ color: '#00D9A6', fontSize: '1.6rem' }} />
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#00D9A6',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                        }}
                    >
                        Great form! Keep going!
                    </Typography>
                </Box>
            )}

            {/* Current Feedback Messages during exercise */}
            {!isExerciseFinished && currentFeedbackMessages.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1.5,
                        overflow: 'auto',
                        py: 1,
                        px: 0.5,
                        '&::-webkit-scrollbar': { height: 4 },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 9999,
                        },
                    }}
                >
                    {currentFeedbackMessages.map((m, i) => (
                        <Card
                            key={i}
                            elevation={0}
                            sx={{
                                flex: '0 0 auto',
                                minWidth: 240,
                                background: 'rgba(255, 181, 71, 0.08)',
                                border: '1px solid rgba(255, 181, 71, 0.2)',
                                borderRadius: '14px',
                                animation: `slideInLeft 0.3s ease ${i * 0.05}s both`,
                            }}
                        >
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
                                    <WarningAmberRoundedIcon sx={{ color: '#FFB547', fontSize: '1rem' }} />
                                    <Typography
                                        variant="caption"
                                        sx={{ color: '#FFB547', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                                    >
                                        Adjustment Needed
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#F0F0F8', fontWeight: 500, fontSize: '0.9rem' }}
                                >
                                    {m.message}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            {/* Post-Exercise Results */}
            {isExerciseFinished && (
                <Box sx={{ animation: 'fadeInUp 0.5s ease' }}>
                    {/* Clinical Score Section */}
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 3,
                            px: 3,
                            mb: 2,
                            borderRadius: '18px',
                            background: 'rgba(26, 30, 53, 0.7)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1.5 }}>
                            <AssessmentOutlinedIcon sx={{ color: '#6C63FF', fontSize: '1.3rem' }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#F0F0F8' }}>
                                Session Results
                            </Typography>
                        </Box>

                        {clinicalScore === null ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, py: 2 }}>
                                <CircularProgress size={24} sx={{ color: '#6C63FF' }} />
                                <Typography variant="body1" sx={{ color: '#9CA3BF' }}>
                                    Analyzing your performance...
                                </Typography>
                            </Box>
                        ) : clinicalScore > 50 || clinicalScore < 0 ? (
                            <Box sx={{ py: 2 }}>
                                <ErrorOutlineRoundedIcon sx={{ color: '#FF6B8A', fontSize: '2.5rem', mb: 1 }} />
                                <Typography variant="body1" sx={{ color: '#9CA3BF', maxWidth: 450, mx: 'auto' }}>
                                    It appears that you had too many mistakes in your exercise. Please try again to get a clinical score.
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ py: 1 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #6C63FF, #00D9A6)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 0.5,
                                    }}
                                >
                                    {clinicalScore.toFixed(2)}
                                </Typography>
                                <Chip
                                    label="Clinical Score"
                                    size="small"
                                    sx={{
                                        background: 'rgba(108, 99, 255, 0.12)',
                                        color: '#8B83FF',
                                        fontWeight: 600,
                                        border: '1px solid rgba(108, 99, 255, 0.2)',
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    {/* All Feedback Messages */}
                    {feedbackMessages.length > 0 && (
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ color: '#9CA3BF', mb: 1.5, fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                            >
                                Session Feedback ({feedbackMessages.length})
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 1.5,
                                    overflow: 'auto',
                                    pb: 1,
                                    '&::-webkit-scrollbar': { height: 4 },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: 9999,
                                    },
                                }}
                            >
                                {feedbackMessages.map((m, i) => (
                                    <Card
                                        key={i}
                                        elevation={0}
                                        sx={{
                                            flex: '0 0 auto',
                                            minWidth: 220,
                                            background: 'rgba(26, 30, 53, 0.5)',
                                            border: '1px solid rgba(255, 255, 255, 0.06)',
                                            borderRadius: '12px',
                                            animation: `fadeIn 0.3s ease ${i * 0.03}s both`,
                                        }}
                                    >
                                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                            <Chip
                                                label={`#${i + 1}`}
                                                size="small"
                                                sx={{
                                                    height: 20,
                                                    fontSize: '0.65rem',
                                                    fontWeight: 700,
                                                    background: 'rgba(255, 181, 71, 0.1)',
                                                    color: '#FFB547',
                                                    border: '1px solid rgba(255, 181, 71, 0.15)',
                                                    mb: 1,
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{ color: '#F0F0F8', fontWeight: 500, fontSize: '0.85rem' }}
                                            >
                                                {m.message}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

FeedbackDisplay.propTypes = {
    isSaving: PropTypes.bool,
    currentFeedbackMessages: PropTypes.array.isRequired,
    feedbackMessages: PropTypes.array.isRequired,
    isExerciseFinished: PropTypes.bool.isRequired,
    clinicalScore: PropTypes.number,
};

export default FeedbackDisplay;