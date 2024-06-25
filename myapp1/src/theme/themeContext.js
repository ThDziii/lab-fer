import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


export const ThemeContext = createContext();


export const ThemeProviderWrapper = ({ children }) => {
    const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');


    useEffect(() => {
        localStorage.setItem('theme', mode);
        document.body.setAttribute('data-theme', mode);
    }, [mode]);


    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );


    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
