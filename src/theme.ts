import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Palette {
    brand: {
      primary: string;
      secondary: string;
      yellow: string;
      orange: string;
      red: string;
      lightGray: string;
    };
  }
  interface PaletteOptions {
    brand: {
      primary: string;
      secondary: string;
      yellow: string;
      orange: string;
      red: string;
      lightGray: string;
    };
  }
}

const theme = createTheme({
    palette: {
        mode: "light",
        brand: {
            primary: '#193255',    // Azul oscuro
            secondary: '#55C0DC',  // Azul claro
            yellow: '#FFC800',     // Amarillo
            orange: '#FFAA00',     // Naranja
            red: '#D80025',        // Rojo
            lightGray: '#F4F4F4',  // Gris claro
        },
    },
    typography: {
        fontFamily: 'var(--font-poppins), sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 800, // ExtraBold
            fontFamily: 'var(--font-poppins)',
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 700, // Bold
            fontFamily: 'var(--font-poppins)',
        },
        h3: {
            fontSize: "1.75rem",
            fontWeight: 600, // SemiBold
            fontFamily: 'var(--font-poppins)',
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: 600, // SemiBold
            fontFamily: 'var(--font-poppins)',
        },
        h5: {
            fontSize: "1.25rem",
            fontWeight: 500, // Medium
            fontFamily: 'var(--font-poppins)',
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 500, // Medium
            fontFamily: 'var(--font-poppins)',
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400, // Regular
            fontFamily: 'var(--font-poppins)',
        },
        body2: {
            fontSize: "0.875rem",
            fontWeight: 300, // Light
            fontFamily: 'var(--font-poppins)',
        },
        button: {
            fontFamily: 'var(--font-poppins)',
            fontWeight: 600, // SemiBold
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});

export default theme;
