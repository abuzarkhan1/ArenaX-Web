import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Self-hosted font stack (no third-party font requests on the critical path):
// Manrope for display, Inter for UI copy, Source Code Pro for telemetry labels.
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/source-code-pro/latin-400.css';
import '@fontsource/source-code-pro/latin-500.css';
import '@fontsource/source-code-pro/latin-600.css';

import App from './App.tsx';
import './index.css';
import './styles/player-field.css';
import { initGA } from './utils/analytics';

// Initialize GA4
initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
