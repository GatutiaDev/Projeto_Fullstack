// src/components/ResultsDisplay.jsx

import React from 'react';
// ALTERAÇÃO 1: Importar o nosso hook customizado 'useData'
import { useData } from '../contexts/DataContext';
import CharacterCard from './CharacterCard';
import { Grid, Box, CircularProgress, Alert, Typography } from '@mui/material';

const ResultsDisplay = () => {
  // ALTERAÇÃO 2: Usar o hook para acessar o estado global e remover o mock
  const { state } = useData();
  const { loading, error, data } = state;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // Se 'data' for nulo (estado inicial), exibe uma mensagem
  if (!data) {
    return (
      <Typography variant="h6" color="text.white" textAlign="center">
        Faça uma busca para ver os resultados.
      </Typography>
    );
  }

  // A API pode retornar um objeto (busca por id) ou um array (busca por 'all')
  // Este código garante que sempre trabalharemos com um array para o .map()
  const characters = Array.isArray(data) ? data : [data];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {characters.map((char) => (
          // A API retorna o nome do personagem em minúsculas como 'id'
          // Ex: { name: "Kaedehara Kazuha", vision: "Anemo" }, mas o id dele seria "kazuha"
          // Usamos o nome como 'key' por segurança caso o id não venha
          <CharacterCard key={char.name} character={char} />
        ))}
      </Grid>
    </Box>
  );
};

export default ResultsDisplay;