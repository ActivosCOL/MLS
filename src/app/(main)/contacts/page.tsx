'use client';
import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import ContactBanner from '@/components/Contact/ContactBanner';
import ContactInfo from '@/components/Contact/ContactInfo';
import ContactForm from '@/components/Contact/ContactForm';

const ContactsPage = () => {
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        const yOffset = -150; // Aumentado el offset para que se detenga más arriba
        const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ 
          top: y, 
          behavior: 'smooth' 
        });
      }
    }
  }, []);

  return (
    <Box component="main">
      <ContactBanner />
      <Container maxWidth="lg" sx={{ py: 4}}>
        <ContactInfo />
      </Container>
      <ContactForm />
    </Box>
  );
};

export default ContactsPage;