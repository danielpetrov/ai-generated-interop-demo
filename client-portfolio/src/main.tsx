import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IOBrowser from '@interopio/browser';
import { IOConnectProvider } from '@interopio/react-hooks';
import './index.css';
import App from './App.tsx';

const settings = {
  browser: {
    factory: IOBrowser,
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IOConnectProvider settings={settings} fallback={<div>Loading io.Connect...</div>}>
      <App />
    </IOConnectProvider>
  </StrictMode>
);
