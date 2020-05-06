import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
    
    colors: {
        primary:'tomato',
        secondary: 'orange',
        text: '#707070',
        bdPrimary:'tomato',
        bdSecondary:'#F1F2F3'
    },

    fontSizes: ['0rem','0.8rem','1rem','1.2rem','1.4rem']

}

export default ({ children })=> <ThemeProvider theme={theme}>{children}</ThemeProvider>