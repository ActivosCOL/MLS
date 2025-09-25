/**********************************/
/* Navbar.tsx */
/**********************************/

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";
import Link from "next/link";


const NavbarContainer = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "scrolled",
})<{ scrolled: boolean }>(({ scrolled }) => ({
  background: scrolled
    ? "rgba(255,255,255,1)"
    : "transparent",
  color: scrolled ? "#333" : "#fff",
  paddingTop: 6,
  paddingBottom: 6,
  transition: "background 0.3s ease, color 0.3s ease",
  // backdropFilter: scrolled ? "none" : "blur(5px)",
  boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
}));

const MenuItem = styled("span")<{ active: boolean }>(({ active }) => ({
  fontSize: "1rem",
  fontWeight: 500,
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: "4px",
  transition: "background 0.3s ease, text-decoration 0.3s ease",
  textDecoration: active ? "underline" : "none",
  textDecorationThickness: active ? "2px" : "0",
  textUnderlineOffset: active ? "4px" : "0",
  "&:hover": {
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px",
  },
}));


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  maxWidth: 1140,
  width: "100%",
  margin: "0 auto",
  minHeight: 64,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();

  const logoImageUrl = scrolled
    ? "/image/logo/logo-activos-por-coplombia.webp"
    : "/image/logo/Logo_Horizontal (1 tinta blanco).png";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (pathname === "/") {
      const handleScroll = () => {
        if (typeof window !== 'undefined') {
          setScrolled(window.scrollY > 50);
        }
      };

      // Inicializar el estado basado en la posición actual del scroll
      handleScroll();

      // Agregar el event listener solo en el cliente
      if (typeof window !== 'undefined') {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }
    } else {
      setScrolled(true);
    }
  }, [pathname, mounted]);

  // No renderizar el Navbar hasta que el componente esté montado
  if (!mounted) {
    return null;
  }

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Opciones de menú
  const menuOptions = [
    { title: "Inicio", route: "/" },
    { title: "Nosotros", route: "/about-us" },
    { title: "Aliados", route: "/loyalty" },
    { title: "Contactanos", route: "/contacts" },
    { title: "Solicitar Asesoría", route: "/contacts#contact-form" },
  ];

  return (
    <>
      <NavbarContainer position="fixed" scrolled={scrolled}>
        <StyledToolbar>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1
            }}
          >
            <Link href={"/"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
              >


                <Box
                  sx={{
                    width: { xs: 100, md: 150 },
                    height: { xs: 30, md: 50 },
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    transition: "all 0.5s ease-in-out",
                    "& img": {
                      transition: "all 0.5s ease-in-out",
                      transform: scrolled ? "scale(1)" : "scale(1.1)",
                    }
                  }}
                >
                  <img
                    src={logoImageUrl}
                    alt="Logo"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Box>
                <Box
                  sx={{
                    height: { xs: 15, md: 30 },
                    width: "1px",
                    backgroundColor: scrolled ? "#333" : "#fff",
                    opacity: 0.5,
                    margin: "0px",
                    alignSelf: "center"
                  }}
                />

                <Box
                  sx={{
                    width: { xs: 60, md: 100 },
                    height: { xs: 40, md: 40 },
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    transition: "all 0.5s ease-in-out",
                    "& img": {
                      transition: "all 0.5s ease-in-out",
                      transform: scrolled ? "scale(1)" : "scale(1.1)",
                    }
                  }}
                >
                  <img
                    src="/image/logo/mls-logo.png"
                    alt="MLS Logo"
                    style={{ width: "100%", height: "70%", objectFit: "contain" }}
                  />
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", md: "1.9rem" },
                      marginLeft: 1,
                      color: scrolled ? "#333" : "#fff",
                      transition: "all 0.5s ease-in-out",
                      transform: scrolled ? "scale(1)" : "scale(1.1)",
                    }}
                  >
                    MLS
                  </Box>
                </Box>
              </Box>
            </Link>
          </Box>

          {isMobile ? (
            <IconButton
              onClick={openMobileMenu}
              sx={{ color: scrolled ? "#333" : "#fff" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box
              sx={{
                flex: 2,
                display: "flex",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {menuOptions.slice(0, 4).map((option) => (
                <MenuItem key={option.route} active={pathname === option.route}>
                  <Link href={option.route}>{option.title}</Link>
                </MenuItem>
              ))}
            </Box>
          )}

          {!isMobile && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "#09045F",
                  backgroundColor: "#FFAA00",
                  borderRadius: "8px",
                  textTransform: "none",
                  border: "2px solid #FFAA00",
                  padding: "10px 24px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  alignSelf: { xs: "flex-start", md: "center" },
                  transition: "none",
                }}
                component={Link}
                href={menuOptions[4].route}
              >
                {menuOptions[4].title}
              </Button>
            </Box>
          )}
        </StyledToolbar>
      </NavbarContainer>

      <Drawer anchor="left" open={mobileMenuOpen} onClose={closeMobileMenu}>
        <Box sx={{ width: 250, padding: 2 }}>
          <List>
            {menuOptions.map((option, index) => (
              <ListItem key={index} disablePadding>
                <Link href={option.route}>
                  <ListItemButton onClick={closeMobileMenu}>
                    <ListItemText primary={option.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
