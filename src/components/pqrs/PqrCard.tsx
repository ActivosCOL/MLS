'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Pqr } from '@/models/Pqr';

interface PqrCardProps {
  pqr: Pqr;
}

const CARD_WIDTH = 350;
const CARD_HEIGHT = 260;

const PqrCard: React.FC<PqrCardProps> = ({ pqr }) => (
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
      },
    }}
  >
    <CardContent sx={{ flex: 1, p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <PersonIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="h6" fontWeight={700} sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.2rem' }}>
          {pqr.first_name} {pqr.last_name}
        </Typography>
        {pqr.user_type && (
          <Chip label={pqr.user_type} size="small" sx={{ ml: 1, bgcolor: '#e9edf5', color: '#1A3355', fontWeight: 600, fontSize: '0.85rem' }} />
        )}
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <EmailIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{pqr.email || '-'}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <PhoneIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{pqr.phone || '-'}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <CommentIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            color: '#1A3355',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            minHeight: 24,
            fontSize: '0.95rem',
          }}
        >
          {pqr.comments || '-'}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
        <AccessTimeIcon fontSize="small" sx={{ color: '#ffaa00' }} />
        <Typography variant="caption" color="#1A3355" sx={{ flex: 1 }}>
          {new Date(pqr.created_at_form).toLocaleString('es-CO')}
        </Typography>
      </Box>
    </CardContent>
    <Box mt={1} display="flex" justifyContent="center">
      <Chip
        label={pqr.data_consent ? 'Consentimiento de datos: Sí' : 'Consentimiento de datos: No'}
        size="small"
        sx={{
          mt: 1,
          bgcolor: pqr.data_consent ? '#d6f5e6' : '#ffeaea',
          color: pqr.data_consent ? '#1A3355' : '#d32f2f',
          fontWeight: 600,
          fontSize: '0.85rem',
          borderRadius: 2,
        }}
      />
    </Box>
  </Card>
);

export default PqrCard; 