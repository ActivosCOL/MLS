import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { CONTACT_CONTENT } from '../../utils/constants/contact.constants';

const ContactInfo = () => {
  const theme = useTheme();

  const contactData = [
    {
      title: 'Visítanos',
      icon: <LocationOnIcon sx={{ fontSize: 40, color: theme.palette.brand.primary }} />,
      content: CONTACT_CONTENT.LOCATION.address
    },
    {
      title: 'WhatsApp',
      icon: <WhatsAppIcon  sx={{ fontSize: 40, color: theme.palette.brand.primary }} />,
      content: CONTACT_CONTENT.PHONE.numbers
    },
    {
      title: 'Escríbenos',
      icon: <EmailIcon sx={{ fontSize: 40, color: theme.palette.brand.primary }} />,
      content: CONTACT_CONTENT.EMAIL.address
    }
  ];

  return (
    <Box >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4}}>
        {contactData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: 2,
            }}
          >
            {item.icon}
            <Typography variant="h5" sx={{ my: 2, color: theme.palette.brand.primary, fontWeight: 600 }}>
              {item.title}
            </Typography>
            {item.content.map((line, i) => (
              <Typography key={i} variant="body1" color="text.secondary">
                {line}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContactInfo; 