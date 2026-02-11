import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, CircularProgress, Chip } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const VideoDisplay = ({ getReferenceVideo, getVideo, getCanvas, videoLoaded, referenceVideoLoaded }) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="stretch"
            justifyContent="center"
            gap={2.5}
            flexWrap="wrap"
            sx={{ width: '100%', maxWidth: '950px' }}
        >
            {/* Reference Video Card */}
            <Card
                sx={{
                    flex: '1 1 420px',
                    maxWidth: 460,
                    background: 'rgba(26, 30, 53, 0.7)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.4s ease',
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2.5,
                            py: 1.5,
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        <VideocamIcon sx={{ color: '#00D9A6', fontSize: '1.2rem' }} />
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: '#F0F0F8', fontSize: '0.85rem' }}
                        >
                            Reference Exercise
                        </Typography>
                        <Chip
                            label="Guide"
                            size="small"
                            sx={{
                                ml: 'auto',
                                height: 22,
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                background: 'rgba(0, 217, 166, 0.1)',
                                color: '#00D9A6',
                                border: '1px solid rgba(0, 217, 166, 0.2)',
                            }}
                        />
                    </Box>
                    {/* Video container */}
                    <Box sx={{ position: 'relative', background: '#0a0c18' }}>
                        {!referenceVideoLoaded && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <CircularProgress size={36} sx={{ color: '#6C63FF' }} />
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ color: '#636882', mt: 1 }}
                                >
                                    Loading reference...
                                </Typography>
                            </Box>
                        )}
                        <video
                            ref={getReferenceVideo}
                            id="webcam"
                            style={{
                                width: '100%',
                                height: '312px',
                                objectFit: 'contain',
                                display: 'block',
                                visibility: !referenceVideoLoaded ? 'hidden' : 'visible',
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Live Feed Card */}
            <Card
                sx={{
                    flex: '1 1 420px',
                    maxWidth: 460,
                    background: 'rgba(26, 30, 53, 0.7)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(108, 99, 255, 0.15)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.5s ease 0.1s both',
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2.5,
                            py: 1.5,
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        <CameraAltIcon sx={{ color: '#6C63FF', fontSize: '1.2rem' }} />
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: '#F0F0F8', fontSize: '0.85rem' }}
                        >
                            Live Exercise Feed
                        </Typography>
                        <Box
                            sx={{
                                ml: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.6,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 7,
                                    height: 7,
                                    borderRadius: '50%',
                                    background: videoLoaded ? '#FF6B8A' : '#636882',
                                    animation: videoLoaded ? 'pulse 1.5s infinite' : 'none',
                                }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    color: videoLoaded ? '#FF6B8A' : '#636882',
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                }}
                            >
                                {videoLoaded ? 'LIVE' : 'OFF'}
                            </Typography>
                        </Box>
                    </Box>
                    {/* Canvas container */}
                    <Box sx={{ position: 'relative', background: '#0a0c18' }}>
                        {!videoLoaded && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <CircularProgress size={36} sx={{ color: '#6C63FF' }} />
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ color: '#636882', mt: 1 }}
                                >
                                    Initializing camera...
                                </Typography>
                            </Box>
                        )}
                        <canvas
                            ref={getCanvas}
                            id="canvas"
                            style={{
                                width: '100%',
                                height: '312px',
                                display: 'block',
                                visibility: !videoLoaded ? 'hidden' : 'visible',
                            }}
                        />
                        <video
                            ref={getVideo}
                            playsInline
                            id="video"
                            style={{ display: 'none', width: '416px', height: '312px' }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

VideoDisplay.propTypes = {
    getReferenceVideo: PropTypes.func.isRequired,
    getVideo: PropTypes.func.isRequired,
    getCanvas: PropTypes.func.isRequired,
    videoLoaded: PropTypes.bool.isRequired,
    referenceVideoLoaded: PropTypes.bool.isRequired,
};

export default VideoDisplay;