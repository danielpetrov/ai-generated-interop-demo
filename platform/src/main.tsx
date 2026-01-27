import { createRoot } from 'react-dom/client';
import IOBrowserPlatform from '@interopio/browser-platform';
import { IOConnectProvider } from '@interopio/react-hooks';
import './index.css';
import App from './App.tsx';

// Initialize io.Connect Browser Platform with required config
const settings = {
    browserPlatform: {
        factory: IOBrowserPlatform,
        config: {
            licenseKey: import.meta.env.VITE_IOCONNECT_LICENSE_KEY,
        },
    },
};

createRoot(document.getElementById('root')!).render(
    <IOConnectProvider settings={settings} fallback={<div>Loading Platform...</div>}>
        <App />
    </IOConnectProvider>
);
