import React from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:uno.css';

import App from './App.tsx';
import Providers from './Providers.tsx';
import './index.css';

const root = document.getElementById('root');

if (!root) throw new Error('No root element found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
