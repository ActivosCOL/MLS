'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { BENEFITS } from './constants';
import { styled } from '@mui/material/styles';

const BenefitIcon = styled(Box)(({ theme }) => ({
  backgroundColor: '#1f82c4',
  borderRadius: '50%',
  width: 60,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    color: '#56c1dd',
    fontSize: 30,
  },
}));

const BenefitTitle = styled(Typography)({
  fontFamily: 'Poppins',
  fontWeight: 700,
  fontSize: '1.2rem',
  color: '#193255',
  marginBottom: '1rem',
  textAlign: 'center',
});

const BenefitDescription = styled(Typography)({
  fontFamily: 'Poppins',
  fontWeight: 400,
  color: '#193255',
  textAlign: 'center',
});

const Tagline = styled(Typography)({
  fontFamily: 'Poppins',
  fontWeight: 500,
  color: '#193255',
  textAlign: 'left',
  marginBottom: '2rem',
  fontSize: '2rem',
  lineHeight: '1.6',
  '& .highlight': {
    color: '#FFB800',
    fontWeight: 700
  }
});

const Benefits: React.FC = () => {
  return (
    <Box sx={{ 
      backgroundColor: '#F4F4F4', 
      py: 8,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/Mask group.svg")',
        backgroundSize: '200px',
        backgroundPosition: 'center center',
        backgroundRepeat: 'repeat',
        opacity: 0.03,
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '40% 60%' },
          gap: 4,
          alignItems: 'start'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            {/* <Typography
              variant="h3"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                color: '#000000',
                mb: { xs: 5, md: 20 },
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-12px',
                  left: 0,
                  width: '60px',
                  height: '4px',
                  backgroundColor: '#1976d2',
                }
              }}
            >
              Beneficios de nuestra red de expertos
            </Typography> */}
            <Tagline>
              Impulsamos la <span className="highlight">profesionalización</span> y el <span className="highlight">crecimiento</span> del <span className="highlight">corretaje inmobiliario</span> en Colombia.
            </Tagline>
          </Box>

          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr' },
            gap: 4
          }}>
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: 4,
                      height: '100%',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      }
                    }}
                  >
                    <BenefitIcon>
                      <Icon />
                    </BenefitIcon>
                    <BenefitTitle>
                      {benefit.title}
                    </BenefitTitle>
                    <BenefitDescription>
                      {benefit.description}
                    </BenefitDescription>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Benefits; 