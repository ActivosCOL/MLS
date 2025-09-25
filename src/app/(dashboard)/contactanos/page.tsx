'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Tabs, Tab } from '@mui/material';
import { ContactForm } from '@/models/ContactForm';
import { ContactFormService } from '@/services/ContactFormService';
import ContactCard from '@/components/contactanos/ContactCard';

const TABS = [
  { label: 'LMS', value: 'LMS' },
  { label: 'Activos', value: 'Activos' },
];

const ContactanosPage = () => {
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState('LMS');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await ContactFormService.getAll();
        setContacts(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los contactos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(c => c.type?.name === tab);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: 4, px: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Contactos
      </Typography>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 4 }}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {TABS.map(t => (
          <Tab key={t.value} label={t.label} value={t.value} />
        ))}
      </Tabs>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={{ xs: 4, sm: 5, md: 6 }}
        justifyContent="center"
        sx={{ width: "100%", mx: "auto", mb: 2 }}
      >
        {filteredContacts.map((contact) => (
          <Box
            key={contact.id}
            sx={{
              flex: '1 1 100%',
              maxWidth: { xs: '100%', sm: '48%', md: '32%', lg: '30%' },
              minWidth: { xs: '100%', sm: '48%', md: '32%', lg: '30%' },
              display: 'flex',
              justifyContent: 'center',

            }}
          >
            <ContactCard contact={contact} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContactanosPage; 