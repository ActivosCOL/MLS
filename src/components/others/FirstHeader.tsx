'use client'

import React from 'react'
import { Link, Stack } from '@mui/material'
import { Box } from '@mui/material'
import Image from 'next/image'
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';

interface FirstHeaderProps {
    isScrolled?: boolean;
}

const FirstHeader: React.FC<FirstHeaderProps> = ({ isScrolled = false }) => {
    return (
        <Box
            sx={{
                display: isScrolled ? 'none' : 'block',
                backgroundColor: '#131D6C',
                height: '40px',
                marginBottom: 0
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: '100%' }}
            >
                <Image
                    src="/logo/grafico_header.png"
                    alt="Gráfico Header"
                    width={120}
                    height={40}
                    style={{
                        objectFit: 'contain',
                        height: '100%',
                        width: 'auto'
                    }}
                />

                <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    sx={{
                        color: 'white',
                        typography: 'body2',
                        display: { xs: 'none', md: 'flex' }
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <EmailIcon sx={{ color: '#131D6C', fontSize: '16px' }} />
                        </Box>
                        <Link 
                            href="mailto:info@activosporcolombia.com" 
                            sx={{ 
                                color: 'white', 
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            info@activosporcolombia.com
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '16px' }}>
                        <Box
                            sx={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <PhoneIcon sx={{ color: '#131D6C', fontSize: '16px' }} />
                        </Box>
                        <Link 
                            href="https://wa.me/573116767447" 
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                                color: 'white', 
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            +57 311 676 74 47
                        </Link>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}

export default FirstHeader