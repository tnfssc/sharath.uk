import 'maaybe';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:uno.css';

import Providers from './Providers.tsx';
import Router from './Router.tsx';
import './index.css';

const root = document.getElementById('root');

if (!root) throw new Error('No root element found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Providers>
      <Router />
    </Providers>
  </React.StrictMode>,
);
