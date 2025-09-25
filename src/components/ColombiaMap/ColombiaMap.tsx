'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CediInfo {
  id: string;
  name: string;
  x: number;
  y: number;
  region: string;
  cities: string[];
  departmentId: string;
  inmobiliarias: {
    id: string;
    name: string;
    direccion: string;
    telefono: string;
    horario: string;
  }[];
}

const cedisData: CediInfo[] = [
  {
    id: 'COATL',
    name: 'Barranquilla',
    x: 460,
    y: 135,
    region: 'Cobertura En Atlántico',
    cities: [
      'Barranquilla',
      'Soledad',
      'Malambo',
      'Puerto Colombia',
      'Galapa',
      'Sabanalarga',
      'Baranoa',
      'Santo Tomás',
      'Palmar de Varela',
      'Polonuevo',
      'Sabanagrande',
      'Juan de Acosta'
    ],
    departmentId: 'COATL',
    inmobiliarias: []
  },
  {
    id: 'COSAN',
    name: 'Bucaramanga',
    x: 550,
    y: 350,
    region: 'Cobertura En Santander',
    cities: ['Barrancabermeja', 'Bucaramanga', 'Cimitarra', 'Floridablanca', 'Girón', 'Piedecuesta'],
    departmentId: 'COSAN',
    inmobiliarias: [
      {
        id: 'INM3',
        name: 'Inmobiliaria Bucaramanga',
        direccion: 'Carrera 27 # 45-89',
        telefono: '300 234 5678',
        horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM'
      },
      {
        id: 'INM4',
        name: 'Inmobiliaria Floridablanca',
        direccion: 'Calle 45 # 12-34',
        telefono: '300 876 5432',
        horario: 'Lunes a Sábado: 9:00 AM - 7:00 PM'
      },
      {
        id: 'INM5',
        name: 'Inmobiliaria Girón',
        direccion: 'Carrera 15 # 8-23',
        telefono: '300 345 6789',
        horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM'
      }
    ]
  },
  {
    id: 'COANT',
    name: 'Medellín',
    x: 440,
    y: 380,
    region: 'Cobertura En Antioquia',
    cities: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Sabaneta'],
    departmentId: 'COANT',
    inmobiliarias: [
      {
        id: 'INM6',
        name: 'Inmobiliaria El Poblado',
        direccion: 'Carrera 43A # 6-45',
        telefono: '300 456 7890',
        horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM'
      },
      {
        id: 'INM7',
        name: 'Inmobiliaria Laureles',
        direccion: 'Calle 33 # 70-12',
        telefono: '300 987 6543',
        horario: 'Lunes a Sábado: 9:00 AM - 7:00 PM'
      }
    ]
  },
  {
    id: 'COVAC',
    name: 'Bogotá',
    x: 500,
    y: 480,
    region: 'Cobertura En Cundinamarca',
    cities: ['Bogotá', 'Soacha', 'Chía', 'Mosquera', 'Funza'],
    departmentId: 'COCUN',
    inmobiliarias: [
      {
        id: 'INM8',
        name: 'Inmobiliaria Chapinero',
        direccion: 'Carrera 7 # 45-23',
        telefono: '300 567 8901',
        horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM'
      },
      {
        id: 'INM9',
        name: 'Inmobiliaria Usaquén',
        direccion: 'Calle 120 # 7-45',
        telefono: '300 098 7654',
        horario: 'Lunes a Sábado: 9:00 AM - 7:00 PM'
      },
      {
        id: 'INM10',
        name: 'Inmobiliaria Suba',
        direccion: 'Calle 145 # 12-34',
        telefono: '300 678 9012',
        horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM'
      },
      {
        id: 'INM16',
        name: 'Inmobiliaria Teusaquillo',
        direccion: 'Carrera 24 # 45-67',
        telefono: '300 111 2222',
        horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM'
      },
      {
        id: 'INM17',
        name: 'Inmobiliaria Kennedy',
        direccion: 'Carrera 80 # 40-12',
        telefono: '300 333 4444',
        horario: 'Lunes a Sábado: 9:00 AM - 7:00 PM'
      },
      {
        id: 'INM18',
        name: 'Inmobiliaria Engativá',
        direccion: 'Calle 80 # 100-45',
        telefono: '300 555 6666',
        horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM'
      }
    ]
  },
  {
    id: 'COCUN',
    name: 'Valledupar',
    x: 540,
    y: 225,
    region: 'Cobertura En Cesar',
    cities: [
      'Aguachica',
      'Astrea',
      'Becerril',
      'Bosconia',
      'Chimichagua',
      'Chiriguana',
      'Codazzi',
      'Curumani',
      'El Copey',
      'El Paso',
      'Gamarra',
      'La Gloria',
      'La Jagua',
      'La Loma',
      'La Paz',
      'Pailitas',
      'Pelaya',
      'San Alberto',
      'San Martin',
      'Tamalameque',
      'Valledupar'
    ],
    departmentId: 'COCES',
    inmobiliarias: []
  },
  {
    id: 'COBOL',
    name: 'Cali',
    x: 350,
    y: 570,
    region: 'Cobertura En Valle del Cauca',
    cities: ['Cali', 'Palmira', 'Yumbo', 'Jamundí', 'Candelaria'],
    departmentId: 'COVAC',
    inmobiliarias: [
      {
        id: 'INM12',
        name: 'Inmobiliaria Granada',
        direccion: 'Carrera 4 # 12-34',
        telefono: '300 890 1234',
        horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM'
      },
      {
        id: 'INM13',
        name: 'Inmobiliaria San Fernando',
        direccion: 'Calle 5 # 45-67',
        telefono: '300 109 8765',
        horario: 'Lunes a Sábado: 9:00 AM - 7:00 PM'
      }
    ]
  },
  {
    id: 'COANT2',
    name: 'Sincelejo',
    x: 460,
    y: 250,
    region: 'Cobertura En Sucre',
    cities: ['Sincelejo', 'Corozal', 'Sampués', 'Tolú'],
    departmentId: 'COSUC',
    inmobiliarias: [
      {
        id: 'INM14',
        name: 'Inmobiliaria Sincelejo',
        direccion: 'Carrera 20 # 15-30',
        telefono: '300 901 2345',
        horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM'
      },
      {
        id: 'INM15',
        name: 'Inmobiliaria Corozal',
        direccion: 'Calle 10 # 5-12',
        telefono: '300 210 9876',
        horario: 'Lunes a Sábado: 9:00 AM - 7:00 PM'
      }
    ]
  }
];

interface ColombiaMapProps {
  onDepartmentClick?: (departmentId: string) => void;
  selectedDepartment?: string;
}

const departments = [
  'COAMA', 'COANT', 'COARA', 'COATL', 'COBOL', 'COBOY', 'COCAL', 'COCAQ',
  'COCAS', 'COCAU', 'COCES', 'COCHO', 'COCOR', 'COCUN', 'CODC', 'COGUA',
  'COGUV', 'COHUI', 'COLAG', 'COMAG', 'COMET', 'CONAR', 'CONSA', 'COPUT',
  'COQUI', 'CORIS', 'COSAN', 'COSUC', 'COTOL', 'COVAC', 'COVAU', 'COVID'
];

// Departamentos con inmobiliarias activas
const activeDepartments = [
  'COATL', // Atlántico (Barranquilla)
  'COSAN', // Santander (Bucaramanga)
  'COANT', // Antioquia (Medellín)
  'COCUN', // Cundinamarca (Bogotá)
  'COCES', // Cesar (Valledupar)
  'COVAC', // Valle del Cauca (Cali)
  'COSUC'  // Sucre (Sincelejo)
];

const CITIES_PER_PAGE = 5;

const ColombiaMap: React.FC<ColombiaMapProps> = ({
  onDepartmentClick,
  selectedDepartment,
}) => {
  const [selectedCedi, setSelectedCedi] = useState<CediInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 }); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [animatedDepartments, setAnimatedDepartments] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Efecto para observar los elementos del listado
  useEffect(() => {
    if (!listRef.current) return;

    // Configurar el Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const listItem = entry.target as HTMLLIElement;
            const departmentId = listItem.getAttribute('data-department-id');
            if (departmentId && !animatedDepartments.includes(departmentId)) {
              // Agregar el departamento a la lista de animados después de un pequeño retraso
              setTimeout(() => {
                setAnimatedDepartments(prev => [...prev, departmentId]);
              }, 500);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }
    );

    // Observar cada elemento del listado
    const listItems = listRef.current.querySelectorAll('li');
    listItems.forEach((item) => {
      observerRef.current?.observe(item);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [animatedDepartments]);

  // Función para encontrar el CEDI por departmentId
  const findCediByDepartmentId = (departmentId: string) => {
    return cedisData.find(cedi => cedi.departmentId === departmentId);
  };

  const handleDepartmentClick = (departmentId: string) => {
    const cedi = findCediByDepartmentId(departmentId);
    if (cedi) {
      setSelectedCedi(cedi);
      setCurrentPage(0);
      setHoveredDepartment(departmentId);
    }
    onDepartmentClick?.(departmentId);
  };

  const handleCediClick = (cedi: CediInfo) => {
    if (selectedCedi?.id === cedi.id) {
      setSelectedCedi(null);
      setHoveredDepartment(null);
      setCurrentPage(0);
    } else {
      setSelectedCedi(cedi);
      setCurrentPage(0);
      setHoveredDepartment(cedi.departmentId);
    }
  };

  // Función para obtener las ciudades de la página actual
  const getCurrentPageCities = () => {
    if (!selectedCedi || !selectedCedi.cities) return [];
    const start = currentPage * CITIES_PER_PAGE;
    return selectedCedi.cities.slice(start, start + CITIES_PER_PAGE);
  };

  // Función para obtener el número total de páginas
  const getTotalPages = () => {
    if (!selectedCedi || !selectedCedi.cities) return 0;
    return Math.ceil(selectedCedi.cities.length / CITIES_PER_PAGE);
  };

  const handleNextPage = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: { xs: 4, md: 8 },
      alignItems: { xs: 'center', md: 'flex-start' },
      p: { xs: 2, md: 4 },
      minHeight: { xs: 'auto', md: '800px' },
      maxHeight: { xs: 'auto', md: '760px' },
      maxWidth: '1600px',
      margin: '0 auto'
    }}>
      <Box
        ref={containerRef}
        sx={{
          width: { xs: '100%', md: '75%' },
          position: 'relative',
          aspectRatio: '1/1',
          maxWidth: '1200px',
          margin: { xs: '0 auto', md: '0' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'scale(1.2)',
            zIndex: -1
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          <g>
            {departments.map((id) => (
              <use
                key={id}
                xlinkHref={`/co.svg#${id}`}
                fill={
                  hoveredDepartment === id || selectedDepartment === id
                    ? '#f7a918'
                    : animatedDepartments.includes(id)
                      ? '#1f82c499'
                      : '#1f82c41a'
                }
                stroke={hoveredDepartment === id || selectedDepartment === id ? '#f7a918cc' : '#1f82c499'}
                strokeWidth={hoveredDepartment === id || selectedDepartment === id ? '2' : '1'}
                className={activeDepartments.includes(id) ? "cursor-pointer transition-colors" : ""}
                onClick={() => activeDepartments.includes(id) && handleDepartmentClick(id)}
                onMouseEnter={() => activeDepartments.includes(id) && !selectedCedi && setHoveredDepartment(id)}
                onMouseLeave={() => activeDepartments.includes(id) && !selectedCedi && setHoveredDepartment(null)}
                style={{
                  transition: 'fill 0.5s ease, stroke 0.5s ease',
                  opacity: animatedDepartments.includes(id) ? 1 : 0.3
                }}
              />
            ))}
          </g>
        </svg>

        {/* Puntos CEDI como elementos HTML */}
        {cedisData.map((cedi) => (
          <Box
            key={cedi.id}
            onClick={() => handleCediClick(cedi)}
            sx={{
              position: 'absolute',
              left: `${(cedi.x / 1000) * 100}%`,
              top: `${(cedi.y / 1000) * 100}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              '&:hover': {
                '& .cedi-point': {
                  transform: 'scale(1.2)'
                }
              }
            }}
          >
            <Box
              className="cedi-point"
              sx={{
                width: { xs: '12px', sm: '16px', md: '20px' },
                height: { xs: '12px', sm: '16px', md: '20px' },
                borderRadius: '50%',
                backgroundColor: selectedCedi?.id === cedi.id ? '#f7a918' : '#f7a918',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease'
              }}
            />
          </Box>
        ))}

        {/* Popover de información */}
        {selectedCedi && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              left: selectedCedi.x > 500 ? 'auto' : `${(selectedCedi.x / 1000) * 100}%`,
              right: selectedCedi.x > 500 ? `${100 - ((selectedCedi.x / 1000) * 100)}%` : 'auto',
              top: selectedCedi.y > 500 ? 'auto' : `${(selectedCedi.y / 1000) * 100}%`,
              bottom: selectedCedi.y > 500 ? `${100 - ((selectedCedi.y / 1000) * 100)}%` : 'auto',
              transform: {
                xs: 'translate(-50%, 0)',
                md: selectedCedi.x > 500 ? 'translate(0, 0)' : 'translate(-50%, 0)'
              },
              width: {
                xs: '90%',
                sm: '280px'
              },
              maxWidth: '280px',
              borderRadius: '8px',
              overflow: 'visible',
              backgroundColor: 'white',
              zIndex: 1000,
              '@media (max-width: 600px)': {
                left: '50%',
                right: 'auto',
                transform: 'translateX(-50%)',
                top: selectedCedi.y > 500 ? 'auto' : '100%',
                bottom: selectedCedi.y > 500 ? '100%' : 'auto',
                marginTop: selectedCedi.y > 500 ? '0' : '10px',
                marginBottom: selectedCedi.y > 500 ? '10px' : '0'
              }
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box sx={{
                p: 2,
                pb: 1.5,
                borderBottom: '1px solid #E0E0E0'
              }}>
                <IconButton
                  onClick={() => {
                    setSelectedCedi(null);
                    setCurrentPage(0);
                    setHoveredDepartment(null);
                    onDepartmentClick?.('');
                  }}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    padding: '4px',
                    color: '#666666',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <CloseIcon sx={{ fontSize: '18px' }} />
                </IconButton>

                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    color: '#000000',
                    fontSize: '1rem',
                    mb: 0.5,
                    pr: 4
                  }}
                >
                  CEDIS {selectedCedi.name.toUpperCase()}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    color: '#1976d2',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  {selectedCedi.region}
                </Typography>
              </Box>

              <Box sx={{ p: 2, pt: 1.5 }}>
                {selectedCedi && selectedCedi.cities && selectedCedi.cities.length > 0 ? (
                  <>
                    <List sx={{
                      py: 0,
                      maxHeight: '400px',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                      '& li': {
                        padding: '8px 0',
                        fontFamily: 'Poppins',
                        fontSize: '0.875rem',
                        color: '#333333',
                        position: 'relative',
                        pl: 2,
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: '#666666'
                        }
                      }
                    }}>
                      {getCurrentPageCities().map((city, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            display: 'list-item',
                            cursor: 'default'
                          }}
                        >
                          {city}
                        </ListItem>
                      ))}
                    </List>

                    {getTotalPages() > 1 && (
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid #E0E0E0'
                      }}>
                        <IconButton
                          onClick={handlePreviousPage}
                          disabled={currentPage === 0}
                          sx={{
                            padding: '4px',
                            color: currentPage === 0 ? '#ccc' : '#666666',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            }
                          }}
                        >
                          <ChevronLeftIcon sx={{ fontSize: '24px' }} />
                        </IconButton>

                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          {Array.from({ length: getTotalPages() }).map((_, index) => (
                            <Box
                              key={index}
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: index === currentPage ? '#1976d2' : '#E0E0E0',
                                cursor: 'pointer'
                              }}
                              onClick={() => setCurrentPage(index)}
                            />
                          ))}
                        </Box>

                        <IconButton
                          onClick={handleNextPage}
                          disabled={currentPage === getTotalPages() - 1}
                          sx={{
                            padding: '4px',
                            color: currentPage === getTotalPages() - 1 ? '#ccc' : '#666666',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            }
                          }}
                        >
                          <ChevronRightIcon sx={{ fontSize: '24px' }} />
                        </IconButton>
                      </Box>
                    )}
                  </>
                ) : (
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontSize: '0.875rem',
                      color: '#666666',
                      textAlign: 'center',
                      py: 2
                    }}
                  >
                    No hay ciudades disponibles en este momento
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        )}
      </Box>

      <Box sx={{
        width: { xs: '100%', md: '35%' },
        pt: { xs: 0, md: 4 }
      }}>
        <Box sx={{ mb: 4}}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              color: '#000000',
              mb: 3,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-12px',
                left: 0,
                width: '60px',
                height: '4px',
                backgroundColor: '#1976d2',
              }
            }}
          >
            Cobertura nacional
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              color: '#666666',
              mb: 2,
              mt: 4,
              fontSize: '1.25rem',
              lineHeight: 1.6
            }}
          >
            De 538 municipios en Colombia atendemos 470 municipios.
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              color: '#666666',
              fontSize: '1.25rem',
              lineHeight: 1.6
            }}
          >
            De 32 departamentos atendemos a nuestros clientes en 31.
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              color: '#000000',
            }}
          >
            CEDIS
          </Typography>
          <List 
            ref={listRef}
            sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}
          >
            {cedisData.map((cedi) => (
              <ListItem
                key={cedi.id}
                data-department-id={cedi.departmentId}
                sx={{
                  cursor: 'pointer',
                  padding: '12px 0',
                  transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: animatedDepartments.includes(cedi.departmentId) ? 1 : 0,
                  transform: animatedDepartments.includes(cedi.departmentId) 
                    ? 'translateX(0) scale(1)' 
                    : 'translateX(-30px) scale(0.95)',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    transform: 'translateX(5px)',
                    '& .MuiTypography-root': {
                      color: '#f7a918'
                    },
                    '& .location-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      filter: 'drop-shadow(0 0 8px rgba(247, 169, 24, 0.3))'
                    }
                  }
                }}
                onClick={() => handleCediClick(cedi)}
              >
                <ListItemIcon sx={{ minWidth: '48px' }}>
                  <LocationOnIcon 
                    className="location-icon"
                    sx={{ 
                      color: '#f7a918', 
                      fontSize: '2rem',
                      transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: animatedDepartments.includes(cedi.departmentId) 
                        ? 'scale(1) rotate(0deg)' 
                        : 'scale(0.8) rotate(-15deg)',
                      opacity: animatedDepartments.includes(cedi.departmentId) ? 1 : 0,
                      filter: 'drop-shadow(0 0 4px rgba(247, 169, 24, 0.2))'
                    }} 
                  />
                </ListItemIcon>
                <ListItemText
                  primary={cedi.name}
                  sx={{
                    margin: 0,
                    '& .MuiTypography-root': {
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '1.25rem',
                      transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: animatedDepartments.includes(cedi.departmentId) ? 1 : 0,
                      transform: animatedDepartments.includes(cedi.departmentId) 
                        ? 'translateX(0)' 
                        : 'translateX(-10px)',
                      textShadow: animatedDepartments.includes(cedi.departmentId)
                        ? '0 0 8px rgba(0, 0, 0, 0.1)'
                        : 'none'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ColombiaMap;
