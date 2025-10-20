'use client'
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from 'react';

const ExpertSection = () => {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false);

    const handlePlayClick = () => {
        setShowVideo(true);
    };

    const handleVideoEnd = () => {
        setShowVideo(false);
        // Reiniciar el iframe para que la próxima vez que se reproduzca comience desde el inicio
        const iframe = document.querySelector('iframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#151555',
                py: 8,
                px: { xs: 2, sm: 4, md: 6 },
                position: 'relative',
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    px: { xs: 3, md: 6 },
                    py: { xs: 4, md: 6 },
                    textAlign: 'center',
                    position: 'relative',
                    borderRadius: "24px",
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: 'white',
                        fontSize: { xs: '24px', md: '32px' },
                        fontWeight: 600,
                        mb: 4,
                        letterSpacing: '-0.5px',
                    }}
                >
                    Beneficios de ser uno de nuestros brokers asociados
                </Typography>

                <Box 
                    sx={{ 
                        position: 'relative', 
                        paddingTop: '56.25%',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                        backgroundImage: !showVideo ? 'url(https://img.youtube.com/vi/vTGswY-DP08/maxresdefault.jpg)' : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                    }}
                    className="video-container"
                >
                    {showVideo ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/vTGswY-DP08?autoplay=1&rel=0&controls=0&modestbranding=1&showinfo=0&enablejsapi=1`}
                            title="Video de presentación"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}
                            onEnded={handleVideoEnd}
                        />
                    ) : (
                        <Box
                            onClick={handlePlayClick}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <PlayCircleOutlineIcon 
                                sx={{ 
                                    color: '#FFAA00',
                                    fontSize: '80px',
                                }} 
                            />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        transform: 'translateY(50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => window.open('https://activosporcolombia.com/tramites/formulario/formulario_broker', '_blank')}
                        sx={{
                            backgroundColor: '#FFAA00',
                            color: '#151555',
                            borderRadius: '20px',
                            fontWeight: 600,
                            px: 6,
                            py: 1.5,
                            zIndex: 6,
                            textTransform: 'uppercase',
                            fontSize: '14px',
                            letterSpacing: '1px',
                            boxShadow: '0 4px 14px rgba(255, 170, 0, 0.3)',
                            '&:hover': {
                                backgroundColor: '#FFC000',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(255, 170, 0, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Inscríbete
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ExpertSection;
