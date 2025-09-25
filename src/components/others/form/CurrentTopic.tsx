"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

// Nuevo componente que recibe el parámetro 'title'
interface CurrentTopicProps {
  title?: string;
  subtitle?: string;
}

const CurrentTopic: React.FC<CurrentTopicProps> = ({ title = "start" }) => {
  return (
    <Box sx={{ 
      mb: { xs: 2, sm: 3, md: 4 }, 
      mx: { xs: 2, sm: 4, md: 8, lg: 15 },
      px: { xs: 1, sm: 2 }
    }}>
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontSize: { xs: "16px", sm: "18px", md: "20px" },
          color: "#A7A7A7",
          textAlign: "start",
          mb: { xs: 0.5, sm: 1 }
        }}
      >
        Tema actual
      </Typography>
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: { xs: "18px", sm: "20px", md: "24px" },
          color: "#131F68",
          textAlign: "start",
          wordBreak: "break-word"
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default CurrentTopic;
