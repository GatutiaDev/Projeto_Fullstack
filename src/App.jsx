import SearchBar from './components/SearchBar';
import ResultsDisplay from './components/ResultsDisplay';
import { Container, Typography, Box, CssBaseline } from '@mui/material';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
     
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
        <DataProvider>
          <Container maxWidth="md">
            <Box
              sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography variant="h2" component="h1" align="center" gutterBottom>
                Buscador Genshin Impact
              </Typography>
      
              <Box sx={{ width: '100%', maxWidth: 600 }}>
                 <SearchBar />
              </Box>
              <Box sx={{ width: '100%', maxWidth: 600 }}>
                 <ResultsDisplay />
              </Box>

            </Box>
          </Container>
        </DataProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;