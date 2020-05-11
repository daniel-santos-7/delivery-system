import React from 'react';
import styled from 'styled-components';
import { ReactComponent as FastFoodIcon } from '../assets/fast-food.svg'
import { Link } from 'react-router-dom';
import Title from './Title';

const Header = styled.header`
    background-color: #FFF;
    border-bottom: 2px solid ${props=> props.theme.colors.bdPrimary};
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0px auto;
    padding: .5rem;
    display: flex;
    align-items: center;
`;

const Nav = styled.nav`
    display: inline-block;
    margin-left: auto;
`;


const NavList = styled.ul`
    list-style-type: none;
`;

const NavListItem = styled.li`
    display: inline-block;
    margin: 0px .5rem;
`;

const NavLink = styled(Link)`
    color:  ${props=> props.theme.colors.primary};
    text-decoration: none;
    &:hover {
        text-decoration:underline;
    }
`;

export default (page)=> (
    <Header>
        <Container>
            <FastFoodIcon width={42} height={42}/>
            <Title>Delivery App</Title>
            <Nav>
                <NavList>
                    <NavListItem><NavLink  to="/">Produtos</NavLink></NavListItem>
                    <NavListItem><NavLink  to="/pedidos">Pedidos</NavLink></NavListItem>
                </NavList>
            </Nav>
        </Container>
    </Header>
);