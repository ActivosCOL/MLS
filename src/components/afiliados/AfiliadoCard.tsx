'use client';

import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Chip, Tooltip, Stack, IconButton, Fade } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Allie } from '@/models/Afiliado';
import { AllieService } from '@/services/AllieService';

interface AfiliadoCardProps {
  allie: Allie;
  onEdit?: (allie: Allie) => void;
  onDelete?: (id: number) => void;
}

const PLACEHOLDER_IMAGE = "/images/placeholder_blog.png";

const AfiliadoCard: React.FC<AfiliadoCardProps> = ({ allie, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Color del chip según estado
  const getStatusColor = (status: string) => {
    if (status === 'Activo') return 'success';
    if (status === 'En proceso') return 'warning';
    return 'default';
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(allie);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      onDelete(allie.id);
    }
  };

  return (
    <Card
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      sx={{
        borderRadius: 3,
        width: { xs: '100%', sm: 320, md: 350 },
        minWidth: { xs: '100%', sm: 320, md: 350 },
        maxWidth: { xs: '100%', sm: 340, md: 350 },
        height: { xs: 'auto', sm: 370, md: 400 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: '#f5f6fa',
        overflow: 'hidden',
        p: { xs: 2, sm: 3 },
        m: 'auto',
        position: 'relative',
        border: '1px solid #e0e0e0',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Fade in={showActions}>
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1,
            zIndex: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={handleEdit}
            sx={{
              bgcolor: '#1A3355',
              color: '#fff',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: '#223e6b',
                transform: 'scale(1.1)',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{
              bgcolor: '#ffaa00',
              color: '#1A3355',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: '#ffb733',
                transform: 'scale(1.1)',
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Fade>
      <Box
        sx={{
          width: 150,
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: imageError || !allie.image ? '#e9edf5' : '#fff',
          borderRadius: 2,
          mb: 2,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        {imageError || !allie.image ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={150}
            height={150}
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <PublicIcon sx={{ fontSize: 80, color: '#1A3355' }} />
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image={allie.image}
              alt={allie.name}
              onError={() => setImageError(true)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                transition: 'all 0.3s ease-in-out',
                display: 'block',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
        )}
      </Box>
      <CardContent
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          p: 0,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          align="center"
          sx={{
            mb: 1,
            width: '100%',
            color: '#1A3355',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              color: '#223e6b',
            },
          }}
        >
          {allie.name}
        </Typography>
        <Chip
          label={allie.status?.name || 'Sin estado'}
          size="small"
          color={getStatusColor(allie.status?.name)}
          sx={{
            mb: 2,
            fontSize: '0.85rem',
            fontWeight: 600,
            px: 2,
            py: 0.5,
            borderRadius: 2,
            letterSpacing: 0.5,
            bgcolor: allie.status?.name === 'Activo' ? '#d6f5e6' :
              allie.status?.name === 'En proceso' ? '#fff3e0' : '#e9edf5',
            color: allie.status?.name === 'Activo' ? '#1A3355' :
              allie.status?.name === 'En proceso' ? '#ffaa00' : '#1A3355',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Tooltip title="Dirección" placement="top">
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#1A3355',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: '#1A3355',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <LocationOnIcon sx={{ fontSize: 18, mr: 1, color: '#ffaa00' }} /> {allie.address ? allie.address : 'N/A'}
            </Typography>
          </Tooltip>
          <Tooltip title="Teléfono" placement="top">
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#1A3355',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: '#1A3355',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <PhoneIcon sx={{ fontSize: 18, mr: 1, color: '#ffaa00' }} /> {allie.phone ? allie.phone : 'N/A'}
            </Typography>
          </Tooltip>
          <Tooltip title="Email principal" placement="top">
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                wordBreak: 'break-all',
                color: '#1A3355',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: '#1A3355',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <EmailIcon sx={{ fontSize: 18, mr: 1, color: '#ffaa00' }} /> {allie.email_1 ? allie.email_1 : 'N/A'}
            </Typography>
          </Tooltip>
          <Tooltip title="Email alternativo" placement="top">
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                wordBreak: 'break-all',
                color: '#1A3355',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: '#1A3355',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <EmailIcon sx={{ fontSize: 18, mr: 1, color: '#ffaa00' }} /> {allie.email_2 ? allie.email_2 : 'N/A'}
            </Typography>
          </Tooltip>
        </Stack>
        {allie.website && allie.website !== '#' && (
          <Box mt={2} width="100%" display="flex" justifyContent="center">
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                color: '#ffaa00',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: '#ffb733',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => window.open(allie.website, '_blank')}
            >
              Visitar sitio web <span>➤</span>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AfiliadoCard; 