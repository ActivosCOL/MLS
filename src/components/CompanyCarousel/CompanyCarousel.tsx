"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
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
  padding: 20px;
  margin: 0 auto;
  max-width: calc(100% - 80px);
  display: flex;
  justify-content: center;

  .swiper-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 20px 40px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #0a2472;
    width: 40px;
    height: 40px;
    &:after {
      font-size: 24px;
    }
  }

  .swiper-button-prev {
    left: 0;
    @media (min-width: 600px) {
      left: -40px;
    }
  }

  .swiper-button-next {
    right: 0;
    @media (min-width: 600px) {
      right: -40px;
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
  }
];

const CompanyCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const [companies, setCompanies] = useState<
    { id: number; name: string; image: string; website?: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true); // nuevo estado

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

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 0, md: 4 },
        maxWidth: "1200px",
        margin: "0 auto",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StyledTitle variant={isMobile ? "h4" : "h2"}>
        Empresas que confían en nosotros
      </StyledTitle>

      <Box sx={{ 
        width: "100%", 
        display: "flex", 
        justifyContent: "center",
        paddingLeft: { xs: "20px", md: "40px" }
      }}>
        <StyledSwiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={isMobile ? 1 : 4}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {/* Logos locales estáticos */}
        {localLogos.map((logo) => (
          <SwiperSlide key={logo.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "180px",
                width: "100%",
                cursor: "pointer",
                margin: "0 auto",
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
                  maxWidth: "180px",
                  maxHeight: "180px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  transition: "filter 0.3s ease",
                  display: "block",
                  "&:hover": {
                    filter: "grayscale(0%)",
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
                    height: "180px",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={180}
                    height={180}
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
                    height: "180px",
                    width: "100%",
                    cursor: company.website ? "pointer" : "default",
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
                      maxWidth: "180px",
                      maxHeight: "180px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      filter: "grayscale(100%)",
                      transition: "filter 0.3s ease",
                      display: "block",
                      "&:hover": {
                        filter: "grayscale(0%)",
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






