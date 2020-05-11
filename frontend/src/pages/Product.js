import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Main from '../components/Main';
import defaultPreview from '../assets/default-preview.jpg';
import Button from '../components/Button';
import { MdDone, MdReply, MdClear } from 'react-icons/md';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/api';


const ProductPreview = styled.img`
    max-width: 100%;
    display: block;
`;

const FormContainer = styled.div`
    padding: 2rem;
    border: 1px solid ${props=> props.theme.colors.bdSecondary};
    border-radius: 2px;
    background-color: #FFF;
    margin: 1rem auto;
    max-width: 600px;
`;

const Form = styled.form`
    padding: .5rem 0px;
`;

const Input = styled.input`
    font-size: ${props=> props.theme.fontSizes[2]};
    color: ${props=> props.theme.colors.text};
    padding: 0.25rem 1rem;
    border-radius: 3px;
    border: 2px solid ${props=> props.theme.colors.secondary};
    margin: .5rem 0px;
    width: 100%;
    outline: none;
    &:focus {
        border: 2px solid ${props=> props.theme.colors.primary};
    }
`;

const Label = styled.label`
    color: ${props=> props.theme.colors.primary};
    display: block;
`;

const TextArea = styled(Input)`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    resize: vertical;
    height: 5rem;
`;

const Row = styled.div`
    display: flex;
    flex-grow: grow;
    justify-content: space-between;
`;

const Col = styled.div`
    flex: 0 0 ${props=> props.size || '100%'};
    max-width:${props=> props.size || '100%'};
`;

export default function Product() {
    
    const { id } = useParams();

    const [name,setName] = useState('');

    const [description, setDescription] = useState('');

    const [price, setPrice] = useState(0);

    const [image, setImage] = useState('');

    const history = useHistory();

    async function fetchProduct(id) {
        
        if(!id) {
            return;
        }

        const response = await api.get(`/product/${id}`);

        const product = response.data;
        
        setName(product.name);
        
        setDescription(product.description);

        setPrice(product.price);

        setImage(product.image_url);

    }

    async function deleteProduct(id) {

        if(!id) {
            return;
        }

        try {

            await api.delete(`/product/${id}`);

            history.push('/');
        
        } catch(err) {

            alert('Não foi possível remover o produto!');

        }

    }

    async function saveProduct(id) {

        const data = {name,description,price,image_url:image};

        try {
            
            if(!id) {
            
                await api.post(`/product`,data);
            
            } else {

                await api.put(`/product/${id}`,data);

            }

            history.push('/');

        } catch(err) {

            alert('Não foi possível salvar o produto!')

        }

    }

    useEffect(()=> {

        fetchProduct(id);

    },[id]);

    return (
        <Layout>
            <Main>
                <FormContainer>
                    <ProductPreview src={image || defaultPreview}/>
                    <Form onSubmit={(e)=> e.preventDefault()}>
                        <Label for="imgurl">Imagem (url):</Label>
                        <Input type="url" id="imgurl" placeholder="endereço da imagem" value={image} onChange={(e)=> setImage(e.target.value)}/>
                        <Row>
                            <Col size="65%">
                                <Label for="name">Nome:</Label>
                                <Input type="text" id="name" placeholder="nome do produto" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </Col>
                            <Col size="34%">
                                <Label for="price">Preço:</Label>
                                <Input type="number" id="price" placeholder="preço do produto" value={price} onChange={(e)=> setPrice(e.target.value)}/>
                            </Col>
                        </Row>
                        <Label for="name">Descrição:</Label>
                        <TextArea as="textarea" id="name" placeholder="descreva um pouco o produto" value={description} onChange={(e)=>setDescription(e.target.value)}>
                        </TextArea>
                        <Row>
                            <Col size="33%">
                                <Button to="/" big="true" variant="secondary"><MdReply size="1.2rem"/>Voltar</Button>
                            </Col>
                            <Col size="33%">
                                <Button as="button" type="submit" onClick={()=>saveProduct(id)}  big="true" variant="secondary"><MdDone size="1.2rem"/>Salvar</Button>
                            </Col>
                            <Col size="33%">
                                <Button as="button" onClick={()=>deleteProduct(id)} big="true" variant="secondary"><MdClear size="1.2rem"/>Excluir</Button>
                            </Col>
                        </Row>
                    </Form>
                </FormContainer>
            </Main>
        </Layout>
    );
}