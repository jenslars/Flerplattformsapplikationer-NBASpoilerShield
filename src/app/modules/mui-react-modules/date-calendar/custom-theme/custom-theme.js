// customTheme.js
import { createTheme } from '@mui/material';

//Custom theme for date calendar

export const customTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
        }
    },
});
