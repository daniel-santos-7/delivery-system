import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
    background-color: ${props=> props.theme.colors.primary};
    padding: .5rem;
`;

const FooterText = styled.p`
    color: #FFF;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
`;

export default ()=> (
    <Footer>
        <FooterText> 2020 - Desenvolvido por Daniel Santos</FooterText>
    </Footer>
);