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
          justifyContent: 'center', // Centraliza o conteúdo filho (o Container) na vertical
          alignItems: 'center',     // Centraliza o conteúdo filho (o Container) na horizontal
          minHeight: '100vh',        // Garante a altura total da tela
          width: '100vw',            // Garante a largura total da tela
        }}
      >
        <DataProvider>
          {/* 2. O Container agora apenas limita a largura máxima do conteúdo, 
               para que não fique muito largo em telas grandes.
          */}
          <Container maxWidth="md">
            {/* 3. Este Box interno organiza o conteúdo (título, busca, resultados)
                 um embaixo do outro e os alinha ao centro.
            */}
            <Box
              sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2, // Adiciona um espaçamento entre os elementos
              }}
            >
              <Typography variant="h2" component="h1" align="center" gutterBottom>
                Buscador Genshin Impact
              </Typography>
              
              {/* O SearchBar e o ResultsDisplay precisam ter uma largura definida para centralizar corretamente */}
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