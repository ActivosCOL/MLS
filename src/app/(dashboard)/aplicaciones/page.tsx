'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Application } from '@/models/Application';
import { ApplicationService } from '@/services/ApplicationService';
import ApplicationCard from '@/components/aplicaciones/ApplicationCard';

const AplicacionesPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await ApplicationService.getAll();
        setApplications(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las aplicaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

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
        Aplicaciones
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={{ xs: 4, sm: 5, md: 6 }}
        justifyContent="center"
        sx={{ width: "100%", mx: "auto", mb: 2 }}
      >
        {applications.map((application) => (
          <Box
            key={application.id}
            sx={{
              flex: '1 1 100%',
              maxWidth: { xs: '100%', sm: '48%', md: '32%', lg: '30%' },
              minWidth: { xs: '100%', sm: '48%', md: '32%', lg: '30%' },
              display: 'flex',
              justifyContent: 'center',
              my: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            <ApplicationCard application={application} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AplicacionesPage; 