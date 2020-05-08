import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Main from '../components/Main';
import defaultPreview from '../assets/default-preview.jpg';
import Button from '../components/Button';
import { MdDone, MdReply, MdClear } from 'react-icons/md';

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

export default function Products() {
    
    return (
        <Layout>
            <Main>
                <FormContainer>
                    <ProductPreview src={defaultPreview}/>
                    <Form>
                        <Label for="imgurl">Imagem (url):</Label>
                        <Input type="url" id="imgurl" placeholder="endereço da imagem"/>
                        <Row>
                            <Col size="65%">
                                <Label for="name">Nome:</Label>
                                <Input type="text" id="name" placeholder="nome do produto"/>
                            </Col>
                            <Col size="34%">
                                <Label for="price">Preço:</Label>
                                <Input type="number" id="price" placeholder="preço do produto"/>
                            </Col>
                        </Row>
                        <Label for="name">Descrição:</Label>
                        <TextArea as="textarea" id="name" placeholder="descreva um pouco o produto"></TextArea>
                        <Row>
                            <Col size="33%"><Button to="/" big variant="secondary"><MdReply size="1.2rem"/>Voltar</Button></Col>
                            <Col size="33%"><Button big variant="secondary"><MdDone size="1.2rem"/>Salvar</Button></Col>
                            <Col size="33%"><Button big variant="secondary"><MdClear size="1.2rem"/>Excluir</Button></Col>
                        </Row>
                    </Form>
                </FormContainer>
            </Main>
        </Layout>
    );
}