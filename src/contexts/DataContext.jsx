// src/contexts/DataContext.jsx

import React, { createContext, useContext, useReducer } from 'react';

// 1. Definir o estado inicial da nossa aplicação
const initialState = {
  loading: false, // A busca está acontecendo?
  data: null,     // Os dados retornados pela API
  error: null,    // Algum erro ocorreu?
};

// 2. Criar a função "reducer" que gerencia as mudanças de estado
// Pense nela como um porteiro: ela recebe uma "ação" e decide como o estado deve mudar.
function dataReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...initialState, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}

// 3. Criar o Contexto
const DataContext = createContext();

// 4. Criar o "Provedor" (Provider)
// Este é um componente que vai "abraçar" sua aplicação e fornecer o estado global a todos.
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

// 5. (Opcional, mas boa prática) Criar um Hook customizado
// Isso facilita o uso do contexto nos outros componentes.
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};