import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Box, TextField, Button, Paper } from '@mui/material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  
  const { dispatch } = useData();

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError('Por favor, digite o nome de um personagem.');
      return;
    }
    setError('');

    
    try {
      
      dispatch({ type: 'FETCH_START' });

      
      const formattedSearchTerm = searchTerm.trim().toLowerCase().replace(/\s+/g, '-');

      console.log(formattedSearchTerm);

      const response = await fetch(`https://genshin.jmp.blue/characters/${formattedSearchTerm}`);

      if (!response.ok) {
        
        throw new Error('Personagem não encontrado.');
      }

      const result = await response.json();

      
      dispatch({ type: 'FETCH_SUCCESS', payload: result });

    } catch (err) {
      
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