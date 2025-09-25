'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
  Article as ArticleIcon,
  Group as GroupIcon,
  HelpCenter as HelpCenterIcon,
  Handshake as HandshakeIcon,
  ContactMail as ContactMailIcon,
  WorkOutline as WorkOutlineIcon,
  MailOutline as MailOutlineIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import Notifications from './Notifications';
import { AuthService } from '@/services/AuthService';

const drawerWidth = 240;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const   DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [open, setOpen] = useState(!isMobile && !isTablet);
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    setUserEmail(email || '');
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleCollapse = () => {
    if (isMobile || isTablet) {
      setOpen(false);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setLogoutDialogOpen(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setLogoutDialogOpen(false);
    router.push('/login');
  };

  const isRouteActive = (routePath: string) => {
    if (!pathname) return false;
    return pathname.startsWith(routePath);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const menuItems: { text: string; path: string; icon: React.ElementType }[] = [
    // {
    //   text: 'Banners',
    //   path: '/banners',
    //   icon: MenuIcon
    // },
    {
      text: 'Blog',
      path: '/blog',
      icon: ArticleIcon
    },
    {
      text: 'Afiliados',
      path: '/afiliados',
      icon: GroupIcon
    },
    {
      text: 'PQRS',
      path: '/pqrs',
      icon: HelpCenterIcon
    },
    {
      text: 'Aliados',
      path: '/aliados',
      icon: HandshakeIcon
    },
    {
      text: 'Contáctanos',
      path: '/contactanos',
      icon: ContactMailIcon
    },
    {
      text: 'Aplicaciones',
      path: '/aplicaciones',
      icon: WorkOutlineIcon
    },
    {
      text: 'Newsletter',
      path: '/newsletter',
      icon: MailOutlineIcon
    },
    {
      text: 'Autores',
      path: '/authors',
      icon: PersonIcon
    },
    {
      text: 'Categorías',
      path: '/categories',
      icon: CategoryIcon
    }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${collapsed ? 68 : drawerWidth}px)` },
          ml: { md: `${collapsed ? 68 : drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          borderTopLeftRadius: { md: 0 },
          borderBottomLeftRadius: { md: 0 },
          transition: 'margin-left 0.2s ease-in-out, width 0.2s ease-in-out',
          zIndex: theme.zIndex.drawer + 1,
        }}
      > 
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          position: 'relative',
          width: '100%'
        }}>
          {(isMobile || isTablet) && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            position: 'absolute',
            right: 16
          }}>
            <Notifications />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {userEmail}
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile || isTablet ? 'temporary' : 'permanent'}
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: collapsed ? 68 : drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            borderTopRightRadius: { md: 0 },
            borderBottomRightRadius: { md: 0 },
            transition: 'width 0.2s ease-in-out',
            overflowX: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 56,
              mt: 1,
              mb: 1,
              px: 2,
              width: '100%',
              minHeight: 56,
              transition: 'all 0.2s',
            }}
          >
            {!collapsed && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    minHeight: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <img
                    src="/image/logo/mls-logo.png"
                    alt="MLS Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'all 0.2s' }}
                  />
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: '#333',
                    ml: 2,
                    letterSpacing: 0,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  MLS
                </Box>
              </Box>
            )}
            <IconButton onClick={handleCollapse}>
              {isMobile || isTablet ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronLeftIcon sx={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              )}
            </IconButton>
          </Box>
          <Divider />
          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item) => {
              const isSelected = isRouteActive(item.path);
              return (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (item.path.startsWith('http')) {
                        window.location.href = item.path;
                      } else {
                        router.push(item.path);
                      }
                    }}
                    selected={isSelected}
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(0, 0, 0, 0.06)',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.08)',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'text.primary',
                        },
                        '& .MuiListItemText-primary': {
                          color: 'text.primary',
                          fontWeight: 600,
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: collapsed ? 0 : 3,
                        justifyContent: 'center',
                        color: isSelected ? 'text.primary' : 'text.secondary',
                        transition: 'color 0.2s',
                      }}
                    >
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        opacity: collapsed ? 0 : 1,
                        transition: 'all 0.2s',
                        display: collapsed ? 'none' : 'block',
                        '& .MuiTypography-root': {
                          color: isSelected ? 'text.primary' : 'text.secondary',
                          fontSize: '0.875rem',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 2,
            transition: 'all 0.2s',
          }}
        >
          <Box
            sx={{
              width: collapsed ? 40 : 100,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              overflow: 'hidden',
            }}
          >
            <img
              src="/image/logo/logo-activos-por-coplombia.webp"
              alt="Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'all 0.2s' }}
            />
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        
        sx={{
          paddingLeft: { xs: 0, md: 10 },
          paddingTop: 10,
          flexGrow: 1,
          ml: { md: '150px' },
          transition: 'margin-left 0.2s ease-in-out, width 0.2s ease-in-out',
          bgcolor: 'background.default',
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
          
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Container>
      </Box>

      {/* Diálogo de Confirmación de Cierre de Sesión */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas cerrar tu sesión? Podrás volver a iniciar sesión en cualquier momento.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleLogout} color="error">
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardLayout; 