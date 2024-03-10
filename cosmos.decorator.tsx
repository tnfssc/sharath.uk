import React from 'react';
import 'virtual:uno.css';

import Providers from './src/Providers';
import './src/index.css';

export default function ({ children }: React.PropsWithChildren) {
  return (
    <Providers>
      <div className="w-screen h-screen grid place-items-center">{children}</div>
    </Providers>
  );
}
