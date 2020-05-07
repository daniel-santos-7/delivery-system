import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Title from '../components/Title';
import Main from '../components/Main';
import { ReactComponent as MenuIcon } from '../assets/restaurant.svg';
import defaultPreview from '../assets/default-preview.jpg';
import Pagination from '../components/Pagination';
import Button from '../components/Button';
import { MdControlPoint } from 'react-icons/md';

const ProductList = styled.ul`
    list-style-type: none;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
    grid-gap: .5rem;
`;

const ProductListItem = styled.li`
    display: block;
    padding: 1rem;
    border: 1px solid ${props=> props.theme.colors.bdSecondary};
    border-radius: 2px;
    background-color: #FFF;
`;

const ProductPreview = styled.img`
    max-width: 100%;
    display: block;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;  
    margin: .5rem 0px;
`;

const ProductDescription = styled.p`
    color: ${props=> props.theme.colors.text};
    font-size: ${props=> props.theme.fontSizes[1]};
    margin: .5rem 0px;
`;

const AddButtonContainer = styled.div`
    padding: 0px 1rem;
    text-align: right;
`;

export default function Products() {
    
    const products = Array.from({length:8});
    
    return (
        <Layout>
            <Main>
                <TitleContainer>
                    <MenuIcon width={42} height={42}/>
                    <Title as="h2">Produtos</Title>
                </TitleContainer>
                <AddButtonContainer>
                    <Button variant="secondary"><MdControlPoint size="1.2rem"/>Adicionar</Button>
                </AddButtonContainer>
                <ProductList>
                    { products.map(()=> 
                        <ProductListItem>
                            <ProductPreview src={defaultPreview} alt="representação de produto"/>
                            <Title as="h3" fontSize={3}>Produto</Title>
                            <ProductDescription>
                                Descrição do produto...
                            </ProductDescription>
                            <Button big to="/produto">Visualizar</Button>
                        </ProductListItem>
                     )
                    }
                </ProductList>
                <Pagination/>
            </Main>
        </Layout>
    );
}