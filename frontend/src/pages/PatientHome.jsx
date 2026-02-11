import { useState, useEffect } from 'react';
import {
    Box, Grid, Card, CardActionArea, CardMedia,
    CardContent, Typography, Chip
} from '@mui/material';
import TopBar from '../components/TopBar.jsx';
import { Link } from 'react-router-dom';
import { api } from '../api';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function PatientHome() {
    const [assignedExercises, setAssignedExercises] = useState([]);

    // Fetch the exercises assigned to the patient
    useEffect(() => {
        api.get('/api/exercises/')
            .then(res => setAssignedExercises(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: 'var(--color-bg)',
            }}
        >
            <TopBar />

            <Box
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    px: { xs: 2, sm: 4, md: 6 },
                    py: 4,
                }}
            >
                {/* Page Header */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 5,
                        animation: 'fadeIn 0.5s ease forwards',
                    }}
                >
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1.5,
                            mb: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.2), rgba(0, 217, 166, 0.15))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(108, 99, 255, 0.15)',
                            }}
                        >
                            <FitnessCenterIcon sx={{ color: '#6C63FF', fontSize: '1.3rem' }} />
                        </Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                color: '#F0F0F8',
                            }}
                        >
                            Your Exercises
                        </Typography>
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{ color: '#9CA3BF', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}
                    >
                        Select an exercise assigned by your therapist to begin your session.
                    </Typography>
                </Box>

                {/* Exercise Cards Grid */}
                <Grid container spacing={3} justifyContent="center">
                    {assignedExercises.map((exercise, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Link
                                to={`/exercises/${exercise.id}`}
                                state={{ exercise }}
                                style={{ textDecoration: 'none' }}
                            >
                                <Card
                                    sx={{
                                        maxWidth: 320,
                                        margin: '0 auto',
                                        background: 'rgba(26, 30, 53, 0.7)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '18px',
                                        overflow: 'hidden',
                                        transition: 'all 0.35s ease',
                                        animation: `fadeInUp 0.5s ease ${index * 0.08}s both`,
                                        '&:hover': {
                                            transform: 'translateY(-6px)',
                                            borderColor: 'rgba(108, 99, 255, 0.3)',
                                            boxShadow: '0 12px 40px rgba(108, 99, 255, 0.15)',
                                            '& .exercise-image': {
                                                transform: 'scale(1.05)',
                                            },
                                        },
                                    }}
                                >
                                    <CardActionArea>
                                        <Box
                                            sx={{
                                                overflow: 'hidden',
                                                position: 'relative',
                                                background: 'rgba(0, 0, 0, 0.25)',
                                            }}
                                        >
                                            <CardMedia
                                                className="exercise-image"
                                                component="img"
                                                height="220"
                                                sx={{
                                                    objectFit: 'contain',
                                                    transition: 'transform 0.4s ease',
                                                    p: 1.5,
                                                }}
                                                image={exercise.image_url}
                                                alt={exercise.name}
                                            />
                                            {/* Gradient overlay */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '50%',
                                                    background: 'linear-gradient(to top, rgba(26, 30, 53, 0.9), transparent)',
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                        </Box>
                                        <CardContent sx={{ px: 2.5, py: 2 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '1.05rem',
                                                    color: '#F0F0F8',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {exercise.name}
                                            </Typography>
                                            <Box sx={{ textAlign: 'center', mt: 1 }}>
                                                <Chip
                                                    label="Start Session"
                                                    size="small"
                                                    sx={{
                                                        background: 'rgba(108, 99, 255, 0.12)',
                                                        color: '#8B83FF',
                                                        fontWeight: 500,
                                                        fontSize: '0.75rem',
                                                        border: '1px solid rgba(108, 99, 255, 0.2)',
                                                    }}
                                                />
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>

                {/* Empty State */}
                {assignedExercises.length === 0 && (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 10,
                            animation: 'fadeIn 0.6s ease',
                        }}
                    >
                        <FitnessCenterIcon sx={{ fontSize: '3rem', color: '#636882', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: '#636882', fontWeight: 500 }}>
                            No exercises assigned yet
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#636882', mt: 0.5 }}>
                            Contact your therapist to get exercises assigned.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}