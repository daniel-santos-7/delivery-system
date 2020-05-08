import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const primary = css`
    color: ${props=> props.theme.colors.primary};
    border: 2px solid ${props=> props.theme.colors.primary};
    &:hover {
        background-color: orange;
        color: #FFF;
    }
`;

const secondary = css`
    color: #FFF;
    border: 2px solid ${props=> props.theme.colors.primary};
    background-color: ${props=> props.theme.colors.primary};
    &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 1px rgba(255,99,71,.5);
    }
`;

export default styled(Link)`
    display: inline-block;
    font-size: ${props=> props.theme.fontSizes[2]};
    padding: 0.25rem 1rem;
    border-radius: 3px;
    width: ${props=> props.big?'100%':'auto'};
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    & > svg {
        margin-bottom: -0.25rem;
        margin-right: 0.1rem;
    }
    ${props=> props.variant==='secondary'?secondary:primary}  
`;
