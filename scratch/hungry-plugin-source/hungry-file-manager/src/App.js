import React from 'react';
import { ThemeProvider } from 'next-themes';
import StudioLayout from './components/layout/StudioLayout';

const App = () => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <StudioLayout />
        </ThemeProvider>
    );
};

export default App;
