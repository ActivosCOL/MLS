'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import { Application } from '@/models/Application';

interface ApplicationCardProps {
  application: Application;
}

const CARD_WIDTH = 350;
const CARD_HEIGHT = 260;

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => (
  <Card
    sx={{
      borderRadius: 3,
      border: '1px solid #e0e0e0',
      bgcolor: '#f5f6fa',
      width: { xs: '100%', sm: CARD_WIDTH },
      minWidth: { xs: '100%', sm: CARD_WIDTH },
      maxWidth: { xs: '100%', sm: CARD_WIDTH },
      height: { xs: 'auto', sm: CARD_HEIGHT },
      minHeight: { xs: 220, sm: CARD_HEIGHT },
      maxHeight: { xs: 'none', sm: CARD_HEIGHT },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      m: 'auto',
      p: { xs: 2, sm: 3 },
      boxShadow: 'none',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 8,
      },
    }}
  >
    <CardContent sx={{ flex: 1, p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <WorkIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="h6" fontWeight={700} sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.2rem' }}>
          {application.full_name || '-'}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <EmailIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{application.email || '-'}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <PhoneIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{application.phone || '-'}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <LocationOnIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{application.city || '-'}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <WorkIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{application.job_title || '-'}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <DescriptionIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        {application.resume_url ? (
          <Link href={application.resume_url} target="_blank" rel="noopener" underline="hover" sx={{ color: '#1A3355', fontWeight: 600 }}>
            Ver hoja de vida
          </Link>
        ) : (
          <Typography variant="body2" sx={{ flex: 1, color: '#1A3355' }}>-</Typography>
        )}
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <AccessTimeIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="caption" color="#1A3355" sx={{ flex: 1 }}>
          {application.create_at_form ? new Date(application.create_at_form).toLocaleString('es-CO') : '-'}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default ApplicationCard; 