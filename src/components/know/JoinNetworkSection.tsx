"use client";
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { keyframes } from '@emotion/react'; 
import Image from 'next/image';

const slideUpOverlay = keyframes`
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const JoinNetworkSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <Box
                sx={{
                    position: 'relative',
                    minHeight: isMobile ? 'auto' : '800px',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url('/image/banner/banner1.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: isMobile ? 'initial' : 'fixed',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: isMobile ? 'flex-start' : 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'flex-start',
                    px: { xs: 2, md: 10 },
                    pt: { xs: 4, md: 20 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: '800px',
                        zIndex: 2,
                        animation: `${slideUpOverlay} 1.2s ease-out forwards`,
                        textAlign: 'left',
                        width: '100%',
                    }}
                >
                    <Typography
                        variant={isMobile ? 'h5' : 'h2'}
                        sx={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '4.2rem' },
                            lineHeight: 1.2,
                        }}
                    >
                        Únete a la{' '}
                        <span style={{ color: '#FFAA00' }}>
                            Red <b>de BROKERS</b>
                        </span>{' '}
                        más <br />
                        grande de Colombia
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: isMobile ? '100%' : 'auto',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: isMobile ? 4 : 0,
                        position: isMobile ? 'relative' : 'absolute',
                        bottom: isMobile ? 'auto' : 0,
                        right: 0,
                        zIndex: 2,
                        animation: `${slideUpOverlay} 1.2s ease-out forwards`,
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: isMobile ? '100%' : '50vw',
                            width: '53vw',
                            height: 'auto',
                        }}
                    >
                        <Image
                            src="/image/banner/MujerRayas-banner.webp"
                            alt="Mujer Brokers"
                            layout="responsive"
                            width={850}
                            height={600}
                            style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default JoinNetworkSection;
