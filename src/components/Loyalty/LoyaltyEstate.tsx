"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  keyframes,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LockIcon from "@mui/icons-material/Lock";
import SearchIcon from "@mui/icons-material/Search";

const API_URL =
  "https://directusactivosporcolombia.makerstech.co/items/allie?fields=*,status.*";
const fallbackImage = "/banners/NO-DISPONIBLE.png";

const LoyaltyEstate = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const mapped = (data.data || []).map((c: any) => ({
          nombre: c.name,
          logo: c.image || fallbackImage,
          direccion: c.address || "",
          telefono: c.phone || "",
          email: c.email_1 || "",
          web: c.website || "",
          inSelection: c.status?.id !== 2,
        }));
        setCompanies(mapped);
      } catch (error) {
        console.error("Error al cargar las empresas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const filteredAgencies = companies.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.nombre.toLowerCase().includes(query) ||
      (item.direccion && item.direccion.toLowerCase().includes(query)) ||
      (item.telefono && item.telefono.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query))
    );
  });

  // 🟩 Skeletons mientras carga
  const renderSkeletons = (count: number = 6) => {
    return Array.from({ length: count }).map((_, idx) => (
      <Box
        key={idx}
        sx={{
          flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" },
          minWidth: { xs: "100%", sm: 300, md: 340 },
          maxWidth: 400,
          mb: 2,
        }}
      >
        <Card
          sx={{
            height: "100%",
            borderRadius: 4,
            border: "1.5px solid #e0e0e0",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minHeight: 260,
          }}
        >
          <Skeleton
            variant="rectangular"
            width={90}
            height={60}
            sx={{ mb: 2, borderRadius: 1 }}
          />
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="60%" height={18} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="70%" height={18} />
          <Skeleton variant="text" width="40%" height={18} />
          <Skeleton
            variant="rectangular"
            height={60}
            width="100%"
            sx={{ mt: 3, borderRadius: 2 }}
          />
        </Card>
      </Box>
    ));
  };

  return (
    <Box sx={{ mt: 8, mb: 4, px: { xs: 2.5, sm: 6, md: 12, lg: 20 } }}>
      <Typography variant="h5" align="center" sx={{ fontWeight: 600, mb: 8 }}>
        Trabajamos de la mano con empresas y agentes inmobiliarios
        <br />
        que potenciarán tu red de trabajo
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar inmobiliaria, email, dirección o teléfono"
          variant="outlined"
          size="medium"
          sx={{
            width: { xs: "100%", sm: 400, md: 420 },
            background: "#fff",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontSize: 17,
              fontWeight: 500,
              color: "#193255",
              "& fieldset": { borderColor: "#e0e0e0" },
              "&:hover fieldset": { borderColor: "#193255" },
              "&.Mui-focused fieldset": { borderColor: "#193255" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#193255" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {loading ? (
          renderSkeletons()
        ) : filteredAgencies.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              borderRadius: 4,
              minHeight: 260,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              No se encontraron inmobiliarias
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "center", maxWidth: 340 }}
            >
              Intenta ajustar tu búsqueda o revisa que los datos sean correctos.
            </Typography>
          </Box>
        ) : (
          filteredAgencies.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" },
                minWidth: { xs: "100%", sm: 300, md: 340 },
                maxWidth: 400,
                mb: 2,
                animation: `${fadeUp} 0.45s cubic-bezier(.4,1.3,.6,1) both`,
                animationDelay: `${idx * 0.08 + 0.1}s`,
                willChange: "opacity, transform",
              }}
            >
              <Card
                onMouseEnter={() => !item.inSelection && setHoveredIdx(idx)}
                onMouseLeave={() => !item.inSelection && setHoveredIdx(null)}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1.5px solid #e0e0e0",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                  minHeight: 260,
                  transform:
                    !item.inSelection && hoveredIdx === idx
                      ? "scale(1.04)"
                      : "scale(1)",
                  zIndex: !item.inSelection && hoveredIdx === idx ? 2 : 1,
                  backgroundColor: item.inSelection ? "#f5f5f5" : "white",
                  opacity: item.inSelection ? 0.8 : 1,
                  "&:hover": {
                    boxShadow: !item.inSelection
                      ? "0 8px 32px rgba(0,0,0,0.10)"
                      : "none",
                    borderColor: !item.inSelection
                      ? theme.palette.brand.primary
                      : "#e0e0e0",
                  },
                }}
              >
                <CardMedia
              
                  component="img"
                  image={item.logo}
                  alt={item.nombre}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = fallbackImage;
                  }}
                  sx={{
                    width: 90,
                    height: 60,
                    objectFit: "contain",
                    mb: 2,
                    opacity: item.inSelection ? 0.7 : 1,
                    display: item.logo ? "block" : "none",
                  }}
                />
                {!item.logo && (
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      mb: 2,
                      backgroundColor: item.inSelection ? "#e0e0e0" : "#f5f5f5",
                      color: item.inSelection ? "#757575" : "#193255",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 18,
                      textTransform: "uppercase",
                      borderRadius: 2,
                    }}
                  >
                    {item.nombre
                      .split(" ")
                      .slice(0, 2)
                      .map((word: string) => word[0])
                      .join("")}
                  </Box>
                )}
                <CardContent sx={{ p: 0, pb: item.web ? 7 : 0 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: item.inSelection ? "#757575" : "inherit",
                    }}
                  >
                    {item.nombre}
                  </Typography>
                  {item.direccion && (
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 0.5,
                        color: item.inSelection ? "#757575" : "inherit",
                      }}
                    >
                      {item.direccion}
                    </Typography>
                  )}
                  {item.telefono && (
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 0.5,
                        color: item.inSelection ? "#757575" : "inherit",
                      }}
                    >
                      {item.telefono}
                    </Typography>
                  )}
                  {item.email && (
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 0.5,
                        color: item.inSelection ? "#757575" : "inherit",
                      }}
                    >
                      {item.email}
                    </Typography>
                  )}
                </CardContent>
                {item.web && (
                  <Box
                    sx={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
                  >
                    {item.inSelection ? (
                      <Box
                        sx={{
                          height: 60,
                          width: "100%",
                          backgroundColor: "#f5f5f5",
                          borderBottomLeftRadius: 14,
                          borderBottomRightRadius: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              "linear-gradient(45deg, transparent 48%, #e0e0e0 49%, #e0e0e0 51%, transparent 52%)",
                            backgroundSize: "8px 8px",
                            opacity: 0.5,
                            borderBottomLeftRadius: 14,
                            borderBottomRightRadius: 14,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          <LockIcon sx={{ color: "#9e9e9e", fontSize: 16 }} />
                          <Typography
                            sx={{
                              color: "#9e9e9e",
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: 0.5,
                            }}
                          >
                            En proceso de selección
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Button
                        href={item.web}
                        target="_blank"
                        rel="noopener"
                        fullWidth
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: 18 }} />}
                        sx={{
                          borderBottomLeftRadius: 14,
                          borderBottomRightRadius: 14,
                          minHeight: 60,
                          fontWeight: 600,
                          fontSize: 17,
                          background:
                            hoveredIdx === idx
                              ? theme.palette.brand.primary
                              : "#e0e0e0",
                          color: hoveredIdx === idx ? "#fff" : "#193255",
                          "&:hover": {
                            background: theme.palette.brand.primary,
                            color: "#fff",
                          },
                        }}
                      >
                        Visitar sitio web
                      </Button>
                    )}
                  </Box>
                )}
              </Card>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default LoyaltyEstate;
