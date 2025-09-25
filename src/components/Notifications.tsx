import React from 'react';
import {
  Menu,
  Typography,
  Box,
  IconButton,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GavelIcon from '@mui/icons-material/Gavel';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';


interface Notification {
  id: number;
  type: 'bid' | 'auction-start' | 'auction-end' | 'outbid' | 'win';
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  /* {
    id: 1,
    type: 'bid',
    message: 'Nueva oferta en Propiedad Casa Moderna - $250,000',
    time: 'Hace 5 minutos',
    read: false,
  },
  {
    id: 2,
    type: 'auction-start',
    message: 'La subasta de Apartamento Centro ha comenzado',
    time: 'Hace 30 minutos',
    read: false,
  },
  {
    id: 3,
    type: 'outbid',
    message: 'Han superado tu oferta en Terreno Comercial',
    time: 'Hace 1 hora',
    read: false,
  },
  {
    id: 4,
    type: 'auction-end',
    message: 'La subasta de Casa Playa finaliza en 1 hora',
    time: 'Hace 2 horas',
    read: true,
  },
  {
    id: 5,
    type: 'win',
    message: '¡Felicidades! Has ganado la subasta de Casa Campestre',
    time: 'Hace 1 día',
    read: true,
  }, */
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'bid':
      return <MonetizationOnIcon color="primary" />;
    case 'auction-start':
      return <GavelIcon color="success" />;
    case 'auction-end':
      return <TimerIcon color="error" />;
    case 'outbid':
      return <GavelIcon color="warning" />;
    case 'win':
      return <CheckCircleIcon color="success" />;
    default:
      return <NotificationsIcon />;
  }
};

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 480,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Notificaciones</Typography>
          {unreadCount > 0 && (
            <Typography
              variant="caption"
              sx={{ cursor: 'pointer', color: 'primary.main' }}
              onClick={handleMarkAllRead}
            >
              Marcar todas como leídas
            </Typography>
          )}
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                  cursor: 'pointer',
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'background.paper' }}>
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: notification.read ? 'normal' : 'bold',
                  }}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="No hay notificaciones"
                sx={{ textAlign: 'center' }}
              />
            </ListItem>
          )}
        </List>
      </Menu>
    </>
  );
};

export default NotificationsMenu; 