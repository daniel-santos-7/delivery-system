import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Title from '../components/Title';
import Main from '../components/Main';
import { ReactComponent as MenuIcon } from '../assets/restaurant.svg';
import defaultPreview from '../assets/default-preview.jpg';
import Pagination from '../components/Pagination';
import Button from '../components/Button';
import { MdControlPoint } from 'react-icons/md';
import api from '../services/api';

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
    max-width: 300px;
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
    font-size: ${props=> props.theme.fontSizes[2]};
    margin: .5rem 0px;
`;

const AddButtonContainer = styled.div`
    padding: 0px 1rem;
    text-align: right;
`;

export default function Products() {

    const [products, setProducts] = useState([]);

    const [totalCount, setTotalCount] = useState();

    const [page, setPage] = useState(1);

    async function fetchProducts(page=1) {
      
        const response = await api.get('/product',{
            params: { page } 
        });
        
        if(response.data) {

            setProducts(response.data);

            setTotalCount(parseInt(response.headers['x-total-count']));
        
        }
    
    }

    useEffect(()=> {
    
        fetchProducts(page);
    
    },[page]);

    return (
        <Layout>
            <Main>
                <TitleContainer>
                    <MenuIcon width={40} height={40}/>
                    <Title as="h2">Produtos</Title>
                </TitleContainer>
                <AddButtonContainer>
                    <Button variant="secondary" to="/produto"><MdControlPoint size="1.2rem"/>Adicionar</Button>
                </AddButtonContainer>
                <ProductList>
                    { products.map((product)=> 
                        <ProductListItem key={product.id}>
                            <ProductPreview src={defaultPreview} alt="representação de produto"/>
                            <Title as="h3" fontSize={2}>{product.name} (R${product.price})</Title>
                            <ProductDescription>
                                {product.description}
                            </ProductDescription>
                            <Button big="true" to={'/produto/'+product.id}>Visualizar</Button>
                        </ProductListItem>
                     )
                    }
                </ProductList>
                <Pagination page={page} totalItems={totalCount} perPage={8} setPage={setPage}/>
            </Main>
        </Layout>
    );
}