import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RootProvider } from '@contexts/RootProvider.jsx';

import { App } from './App.jsx';

import '@styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>,
);
