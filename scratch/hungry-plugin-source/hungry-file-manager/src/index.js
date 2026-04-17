import './style.css';
import { createRoot } from 'react-dom/client';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('nandfilemr-app');
    if (container) {
        const root = createRoot(container);
        root.render(<App />);
    }
});
