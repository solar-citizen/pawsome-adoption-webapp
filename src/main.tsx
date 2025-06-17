import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '#src/lib';

import App from './App';

if (import.meta.env.MODE === 'development') {
  await import('react-scan').then(({ scan }) => {
    scan({ enabled: true });
  });
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>,
);
