// src/components/SearchBar.jsx

import React, { useState } from 'react';
// ALTERAÇÃO 1: Importar o hook 'useData'
import { useData } from '../contexts/DataContext';
import { Box, TextField, Button, Paper } from '@mui/material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  // ALTERAÇÃO 2: Pegar a função 'dispatch' do nosso contexto
  const { dispatch } = useData();

  // ALTERAÇÃO 3: Transformar a função em async para usar await
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError('Por favor, digite o nome de um personagem.');
      return;
    }
    setError('');

    // ALTERAÇÃO 4: Lógica de chamada da API
    try {
      // Dispara a ação de início: o estado 'loading' vira true
      dispatch({ type: 'FETCH_START' });

      // Prepara o nome para a URL (tudo minúsculo, sem espaços)
      const formattedSearchTerm = searchTerm.trim().toLowerCase().replace(/\s+/g, '-');

      console.log(formattedSearchTerm);

      const response = await fetch(`https://genshin.jmp.blue/characters/${formattedSearchTerm}`);

      if (!response.ok) {
        // Se a resposta não for OK (ex: 404 Not Found), lança um erro
        throw new Error('Personagem não encontrado.');
      }

      const result = await response.json();

      // Dispara a ação de sucesso com os dados recebidos
      dispatch({ type: 'FETCH_SUCCESS', payload: result });

    } catch (err) {
      // Dispara a ação de erro com a mensagem de erro
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: '16px', marginBottom: '32px' }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}
      >
        <TextField
          fullWidth
          label="Buscar Personagem do Genshin"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button type="submit" variant="contained" size="large">
          Buscar
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBar;