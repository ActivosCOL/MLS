"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Skeleton,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "swiper/css";
import "swiper/css/navigation";
import styled from "@emotion/styled";

// Estilos
const StyledTitle = styled(Typography)`
  font-family: "Poppins";
  font-weight: 800;
  text-align: center;
  color: #0a2472;
  margin-bottom: 2rem;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  padding: 40px 80px;
  margin: 0 auto;
  max-width: 100%;
  display: flex;
  justify-content: center;
  min-height: 350px;
  direction: ltr;

  .swiper-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 30px 20px;
    min-height: 300px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #0a2472;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10;
    &:after {
      font-size: 22px;
      font-weight: bold;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
      transform: scale(1.1);
    }
  }

  .swiper-button-prev {
    left: 10px;
    @media (min-width: 600px) {
      left: 15px;
    }
    @media (min-width: 1024px) {
      left: 20px;
    }
  }

  .swiper-button-next {
    right: 10px;
    @media (min-width: 600px) {
      right: 15px;
    }
    @media (min-width: 1024px) {
      right: 20px;
    }
  }
`;

// URL de la API de partners
const API_URL =
  "https://directusactivosporcolombia.makerstech.co/items/partners?fields=id,name,image,website";

// Imagen por defecto si no carga la original
const fallbackImage = "/banners/NO-DISPONIBLE.png";

// Logos locales estáticos
const localLogos = [
  {
    id: 'carolina-guzman',
    name: 'Carolina Guzmán',
    image: '/logo/BROKER_CAROLINA_GUZMAN.jpeg',
    website: undefined
  },
  {
    id: 'camargo-agon',
    name: 'Camargo y Agón',
    image: '/logo/INMOBILIARIA_CAMARGO_Y_ AGON.jpeg',
    website: undefined
  },
  {
    id: 'julio-barrera',
    name: 'Julio C. Barrera',
    image: '/logo/BROKER_ JULIO_C_ BARRERA.jpg',
    website: undefined
  },
  {
    id: 'edwin-jimenez',
    name: 'Edwin Jiménez',
    image: '/logo/BROKER_EDWIN_JIMENEZ.jpeg',
    website: undefined
  },
  {
    id: 'ernesto-arteaga',
    name: 'Ernesto Arteaga',
    image: '/logo/BROKER_ERNESTO_ARTEAGA.png',
    website: undefined
  },
  {
    id: 'jonathan-cardenas',
    name: 'Jonathan Cárdenas',
    image: '/logo/BROKER_JONATHAN_CARDENAS.PNG',
    website: undefined
  },
  {
    id: 'inmobiliaria-aliados',
    name: 'Inmobiliaria Aliados',
    image: '/logo/INMOBILIARIA_ALIADOS.png',
    website: undefined
  },
  {
    id: 'inmobiliaria-avyta',
    name: 'Inmobiliaria Avyta',
    image: '/logo/INMOBILIARIA_AVYTA.jpeg',
    website: undefined
  },
  {
    id: 'inmobiliaria-keeperomega',
    name: 'Inmobiliaria Keeper Omega',
    image: '/logo/INMOBILIARIA_KEEPEROMEGA.PNG',
    website: undefined
  },
  {
    id: 'inmobiliaria-laka',
    name: 'Inmobiliaria Laka',
    image: '/logo/INMOBILIARIA_LAKA.jpeg',
    website: undefined
  },
  {
    id: 'inmobiliaria-safe',
    name: 'Inmobiliaria Safe',
    image: '/logo/INMOBILIARIA_SAFE.jpeg.png',
    website: undefined
  },
  {
    id: 'inmobiliaria-sanchez',
    name: 'Inmobiliaria Sánchez JDN',
    image: '/logo/INMOBILIARIA_SANCHEZ_JDN.jpeg',
    website: undefined
  },
  {
    id: 'full-property',
    name: 'Full Property',
    image: '/logo/LOGO_FULL_PROPERTY.jpg',
    website: undefined
  }
];

const CompanyCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  const [companies, setCompanies] = useState<
    { id: number; name: string; image: string; website?: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setCompanies(data.data || []);
      } catch (error) {
        console.error("Error al cargar las empresas:", error);
      } finally {
        setIsLoading(false); // actualizar estado de carga
      }
    };
    fetchCompanies();
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4, lg: 6 },
        maxWidth: "100%",
        margin: "0 auto",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <StyledTitle variant={isMobile ? "h4" : "h2"}>
        Empresas que confían en nosotros
      </StyledTitle>

      <Box sx={{ 
        width: "100%", 
        display: "flex", 
        justifyContent: "center",
        paddingLeft: { xs: "0px", md: "0px" },
        paddingRight: { xs: "0px", md: "0px" },
        paddingBottom: { xs: "40px", md: "60px" },
        paddingTop: { xs: "20px", md: "30px" },
        position: "relative",
      }}>
        {/* Botón Anterior */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: { xs: "10px", md: "15px", lg: "20px" },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            width: "50px",
            height: "50px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
              transform: "translateY(-50%) scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "#0a2472", fontSize: "20px" }} />
        </IconButton>

        {/* Botón Siguiente */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: { xs: "10px", md: "15px", lg: "20px" },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            width: "50px",
            height: "50px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
              transform: "translateY(-50%) scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "#0a2472", fontSize: "20px" }} />
        </IconButton>

        <StyledSwiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={40}
        slidesPerView={isMobile ? 1 : 4}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        loop={true}
        speed={800}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 45,
          },
        }}
      >
        {/* Logos locales estáticos */}
        {localLogos.map((logo) => (
          <SwiperSlide key={logo.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "250px",
                width: "100%",
                cursor: "pointer",
                margin: "0 auto",
                padding: "30px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              title="Aliados Brokers"
              onClick={() => {
                router.push('/about-us');
              }}
            >
              <Box
                component="img"
                src={logo.image}
                alt={logo.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImage;
                }}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                  display: "block",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
        
        {isLoading
          ? Array.from({ length: isMobile ? 1 : 4 }).map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "250px",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={180}
                    height={220}
                    sx={{ borderRadius: 2 }}
                    animation="wave"
                  />
                </Box>
              </SwiperSlide>
            ))
          : companies.map((company) => (
              <SwiperSlide key={company.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "250px",
                    width: "100%",
                    cursor: company.website ? "pointer" : "default",
                    padding: "30px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  title={company.website ? `Visitar: ${company.website}` : ""}
                  onClick={() => {
                    if (company.website) window.open(company.website, "_blank");
                  }}
                >
                  <Box
                    component="img"
                    src={company.image}
                    alt={company.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = fallbackImage;
                    }}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                      display: "block",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
        </StyledSwiper>
      </Box>
    </Box>
  );
};

export default CompanyCarousel;






