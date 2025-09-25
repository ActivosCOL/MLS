'use client';
import LoyaltyBanner from '@/components/Loyalty/LoyaltyBanner'
import { Box } from '@mui/material'
import React from 'react'
import LoyaltyEstate from '@/components/Loyalty/LoyaltyEstate';


const LoyaltyPage = () => {


  return (
    <Box component="main">
      <LoyaltyBanner />
      <LoyaltyEstate />
    </Box>
  )
}

export default LoyaltyPage