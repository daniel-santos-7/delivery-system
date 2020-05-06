import styled from 'styled-components';
import { typography } from 'styled-system';

export default styled.h1`
    color:  ${props=> props.theme.colors.primary};
    font-size: 1.4rem;
    font-weight: 400;
    text-transform: uppercase;
    ${typography}
`;