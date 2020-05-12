import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Title from '../components/Title';
import Main from '../components/Main';
import { ReactComponent as DeliveryIcon } from '../assets/delivery.svg';
import Button from '../components/Button';
import api from '../services/api';
import socket from '../services/socket';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ptBR } from 'date-fns/locale';

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
`;

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

    const [count, setCount] = useState(0);

    const [page, setPage] = useState(1);

    const [filter, setFilter] = useState('on hold');

    const [orders, setOrders] = useState([]);

    const filteredOrders = ()=> orders.filter(order=> order.status===filter);

    async function setOrderStatus(id,status) {

        try {

            await api.put(`/order/${id}`,{status});

            setOrders(orders=> orders.map(order=> {
                if(order.id === id) {
                    order.status = status;
                }
                return order;
            }));

        } catch(err) {

            alert('Não foi possível alterar o status do pedido!');

        }

    }

    useEffect(()=> {

        async function fetchOrders(page=1) {
      
            const response = await api.get('/order',{
                params: { page } 
            });
            
            if(response.data) {
    
                setOrders(orders=> [...orders,...response.data]);

                setCount(count=> count+response.data.length);
    
                setTotalCount(parseInt(response.headers['x-total-count']));
            
            }
        
        }

        fetchOrders(page);

    },[page]);

    useEffect(()=> {

        async function fetchOrder(id) {

            const response = await api.get(`/order/${id}`);
    
            if(response.data) {
                
                const newOrders = orders.slice();

                newOrders.unshift(response.data);

                setOrders(newOrders);
    
                setTotalCount(totalCount+1);

                setCount(count+1);
            
            }
    
        }

        socket.on('new order',(order)=> fetchOrder(order.id));

        return ()=> socket.off('new order');

    },[orders,totalCount,count]);

    useEffect(() => {

        function handleScroll() {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            if(count<totalCount) {
                setPage(page=>page+1);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    
    }, [count,totalCount]);

    return (
        <Layout>
            <Main>
                <TitleContainer>
                    <DeliveryIcon width={40} height={40}/>
                    <Title as="h2">Pedidos</Title>
                </TitleContainer>
                <SelectContainer>
                    <Button variant="secondary" as="select" value={filter} onChange={(e)=> setFilter(e.target.value)}>
                        <option value="on hold">Em espera</option>
                        <option value="in progress">Em progresso</option>
                        <option value="delivered">Entregues</option>
                        <option value="canceled">Cancelados</option>
                    </Button>
                </SelectContainer>
                <OrderList>
                    { filteredOrders().map((order)=> 
                        <OrderListItem key={order.id}>
                            <Title as="h3" fontSize={3}>{order.client}</Title>
                            <PhoneText>{order.tel} - {order.location}</PhoneText>
                            <Select as="select" to="/produto" value={order.status} onChange={(e)=> setOrderStatus(order.id,e.target.value)}>
                                <option value="on hold">Em espera</option>
                                <option value="in progress">Em progresso</option>
                                <option value="delivered">Entregue</option>
                                <option value="canceled">Cancelado</option>
                            </Select>
                            <Details>
                                {order.details}
                            </Details>
                            <Date>{formatDistanceToNow(new window.Date(order.createdAt),{ locale:ptBR })}</Date>
                            <ProductList>
                                { order.products.map((product => 
                                    <ProductListItem>({product.quantities.quantity}) {product.name}</ProductListItem>
                                ))}
                            </ProductList>
                        </OrderListItem>
                     )
                    }
                </OrderList>
            </Main>
        </Layout>
    );
}