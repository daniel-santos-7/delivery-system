import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Title from '../components/Title';
import Main from '../components/Main';
import { ReactComponent as DeliveryIcon } from '../assets/delivery.svg';
import Button from '../components/Button';
import api from '../services/api';

const OrderList = styled.ul`
    list-style-type: none;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px,1fr));
    grid-gap: .5rem;
`;

const OrderListItem = styled.li`
    display: block;
    padding: 1rem;
    border: 1px solid ${props=> props.theme.colors.bdSecondary};
    border-radius: 2px;
    background-color: #FFF;
    position: relative;
`;

const ProductList = styled.ul`
    margin: .5rem 0px;
`

const ProductListItem = styled.li`
    display: inline-block;
    margin-right: 1rem;
    font-size: ${props=> props.theme.fontSizes[1]};
    color: ${props=> props.theme.colors.secondary};
    font-weight: bold;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;  
    margin: .5rem 0px;
`;

const PhoneText = styled.span`
    color: ${props=> props.theme.colors.primary};
    font-size: ${props=> props.theme.fontSizes[1]};
    font-style: italic;
`;

const Details = styled.p`
    color: ${props=> props.theme.colors.text};
    font-size: ${props=> props.theme.fontSizes[2]};
    margin: .5rem 0px;
`;

const Select = styled(Button)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    outline:none;
    padding-left: .25rem;
    padding-right: .25rem;
`;

const Date = styled.time`
    display: inline-block;
    margin-left: auto;
    color: ${props=> props.theme.colors.text};
    font-size: ${props=> props.theme.fontSizes[1]};
    font-style: italic;
`;

const SelectContainer = styled.div`
    padding: 0px 1rem;
    display:flex;
    justify-content: flex-end;
`;

export default function Orders() {

    const [totalCount, setTotalCount] = useState();

    const [orders, setOrders] = useState([]);

    async function fetchOrders(page=1) {
      
        const response = await api.get('/order',{
            params: { page } 
        });
        
        if(response.data) {

            setOrders(response.data);

            setTotalCount(parseInt(response.headers['x-total-count']));
        
        }
    
    }

    useEffect(()=> {

        fetchOrders();

    },[]);

    return (
        <Layout>
            <Main>
                <TitleContainer>
                    <DeliveryIcon width={40} height={40}/>
                    <Title as="h2">Pedidos</Title>
                </TitleContainer>
                <SelectContainer>
                    <Button variant="secondary" as="select">
                        <option>Em progresso</option>
                        <option>Pagos</option>
                        <option>Cancelados</option>
                        <option>Aguardando</option>
                    </Button>
                </SelectContainer>
                <OrderList>
                    { orders.map((order)=> 
                        <OrderListItem key={order}>
                            <Title as="h3" fontSize={3}>{order.client}</Title>
                            <PhoneText>{order.tel}</PhoneText>
                            <Select as="select" to="/produto">
                                <option>Em progresso</option>
                                <option>Pago</option>
                                <option>Aguardando</option>
                                <option>Cancelar</option>
                            </Select>
                            <Details>
                                {order.details}
                            </Details>
                            <Date>a 20 minutos</Date>
                            <ProductList>
                                { order.quantities && order.quantities.map(({quantity,product_id})=> 
                                    <ProductListItem>({quantity}) Produto {product_id}</ProductListItem>
                                )}
                            </ProductList>
                        </OrderListItem>
                     )
                    }
                </OrderList>
            </Main>
        </Layout>
    );
}