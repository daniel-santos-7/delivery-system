import React from 'react';
import Theme from './Theme';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import Footer from './Footer';

export default ({children})=> (
    <Theme>
        <GlobalStyle/>
        <Header/>
        {children}
        <Footer/>
    </Theme>
);