'use client';

import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import Image from 'next/image';
import { BANNERS_CONTENT, BANNER_STYLES } from '@/utils/constants/bannerConstants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MainBanner: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  

  const handleNextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % BANNERS_CONTENT.length);
      setTimeout(() => setIsTransitioning(false), BANNER_STYLES.carousel.fadeAnimation);
    }
  }, [isTransitioning]);


  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    const slideTimer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [currentSlide, handleNextSlide]);


  const handlePrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + BANNERS_CONTENT.length) % BANNERS_CONTENT.length);
      setTimeout(() => {
        setIsTransitioning(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY 
    });
  };

  const handleMouseEnter = () => {
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '60vh', md: '100vh' },
        width: '100%',
        backgroundColor: '#000851',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor personalizado */}
      {showCursor && (
        <Box
          ref={cursorRef}
          sx={{
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            style={{
              width: '100%',
              height: '100%',
              animation: 'rotate 20s linear infinite',
            }}
          >
            <path
              id="circle"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text>
              <textPath
                href="#circle"
                startOffset="0"
                style={{
                  fontSize: '10px',
                  fill: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Ver más • Ver más • Ver más • Ver más • Ver más • Ver más • Ver más • Ver más
              </textPath>
            </text>
          </svg>
          <style>
            {`
              @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </Box>
      )}

      {/* Efecto de colores deslizantes */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          zIndex: 2
        }}
      >
        {[
          '#1f82c4',
          '#56c1dd',
          '#fdc718',
          '#f7a918'
        ].map((color, index) => {
          const angle = 5;
          const tanAngle = Math.tan(angle * Math.PI / 180);
          const offset = tanAngle * 100;
          const firstLineWidth = 60;
          const remainingWidth = 40;
          const otherLinesWidth = remainingWidth / 3;
          
          const start = index === 0 ? 0 : firstLineWidth + (index - 1) * otherLinesWidth;
          const end = index === 0 ? firstLineWidth : start + otherLinesWidth;
          
          return (
            <Box
              key={color}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                backgroundColor: color,
                transform: currentSlide >= index ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.5s ease',
                clipPath: `polygon(${start}% 0, ${end}% 0, ${end + offset}% 100%, ${start + offset}% 100%)`,
                zIndex: index + 1
              }}
            />
          );
        })}
      </Box>

      {/* Imagen fija en el banner */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '34%',
          height: '120vh',
          zIndex: 3,
          overflow: 'hidden'
        }}
      >
        <Image
          src={`/banners/heidy${(currentSlide % 3) + 1}.png`}
          alt="Únete hoy mismo"
          width={2048}
          height={1522}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom right'
          }}
        />
      </Box>

      {/* Indicadores de color */}
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '4px',
          zIndex: 4
        }}
      >
        {[
          '#1f82c4',
          '#56c1dd',
          '#fdc718',
          '#f7a918'
        ].map((color, index) => (
          <Box
            key={color}
            sx={{
              width: currentSlide > index ? '40px' : '0',
              height: '4px',
              backgroundColor: color,
              transition: 'width 0.3s ease',
              borderRadius: '2px'
            }}
          />
        ))}
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          transform: { xs: 'translateY(10%)', md: 'translateY(25%))' },
          pb: { xs: '40px', md: '60px' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: { xs: '100%', md: '65%' },
            px: { xs: 2, md: 0 },
            ml: { xs: 0, md: 0 },
            mr: { xs: 0, md: 'auto' },
            textAlign: 'left',
            position: 'relative'
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#fff',
              letterSpacing: '-0.02em',
              mb: 1,
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isTransitioning ? 'translateY(10px) scale(0.98)' : 'translateY(0) scale(1)',
              opacity: isTransitioning ? 0 : 1,
              '& span': {
                color: currentSlide >= 2 ? '#000851' : '#FFC800',
                display: 'inline-block',
                position: 'relative',
                transition: 'color 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }
            }}
            dangerouslySetInnerHTML={{ __html: BANNERS_CONTENT[currentSlide].title }}
          />
          
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              fontWeight: 400,
              lineHeight: 1.4,
              color: '#fff',
              whiteSpace: 'pre-line',
              letterSpacing: '-0.01em',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isTransitioning ? 'translateY(10px) scale(0.98)' : 'translateY(0) scale(1)',
              opacity: isTransitioning ? 0 : 1,
              '& span': {
                color: currentSlide >= 2 ? '#000851' : '#FFC800',
                display: 'inline-block',
                position: 'relative',
                transition: 'color 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }
            }}
            dangerouslySetInnerHTML={{ __html: BANNERS_CONTENT[currentSlide].subtitle }}
          />
        </Box>
      </Container>

      {/* Indicador de slide y navegación */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '24px', md: '32px' },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '8px 16px',
          borderRadius: '20px',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden'
        }}
      >
        <IconButton
          onClick={handlePrevSlide}
          sx={{
            color: '#fff',
            padding: '4px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: '16px' }} />
        </IconButton>

        <Typography
          variant="body1"
          sx={{
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.5px',
            minWidth: '60px',
            textAlign: 'center'
          }}
        >
          {currentSlide + 1} de {BANNERS_CONTENT.length}
        </Typography>

        <IconButton
          onClick={handleNextSlide}
          sx={{
            color: '#fff',
            padding: '4px',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>

      {/* Indicador de progreso */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          minWidth: '200px',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          zIndex: 4,
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#fff',
            borderRadius: '2px',
            transition: 'width 0.1s ease-out'
          }
        }}
      />
    </Box>
  );
};

export default MainBanner; 