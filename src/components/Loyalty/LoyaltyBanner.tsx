import React from 'react';
import { Box, Typography } from '@mui/material';

const LoyaltyBanner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '200px', md: '300px' },
        backgroundColor: '#001F3F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(0, 31, 63, 0.8), rgba(0, 31, 63, 0.8)), url("/images/contact-banner.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: 'white',
          textAlign: 'center',
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 600,
        }}
      >
        Afiliados
      </Typography>
    </Box>
  );
};

export default LoyaltyBanner; 