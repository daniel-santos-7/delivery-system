import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageNav = styled.nav`
    display:block;
    margin: 1rem auto;
    width: fit-content;
`;

const PageNavList = styled.ul`
    list-style-type: none;
    background-color: #fff;
    border-radius: 5px;
    border: 2px solid ${props=> props.theme.colors.primary};
`;

const PageNavListItem = styled.li`
    display: inline-block;
    padding: .25rem;
    
    &:hover {
        background-color: ${props=> props.theme.colors.bdSecondary};
        border-radius: 2px;
    }

    &:not(:first-child) {
        border-left: 1px solid ${props=> props.theme.colors.primary};
    }

`;

const PageLink = styled(Link)`
    color: ${props=> props.theme.colors.primary};
    text-decoration: none;
    padding: .5rem;
    font-size: ${props=> props.theme.fontSizes[3]};
`;


export default function Pagination() {
  return (
      <PageNav>
          <PageNavList>
                <PageNavListItem>
                    <PageLink>&#xab;</PageLink>
                </PageNavListItem>
                <PageNavListItem>
                  <PageLink>1</PageLink>
                </PageNavListItem>
                <PageNavListItem>
                  <PageLink>2</PageLink>
                </PageNavListItem>
                <PageNavListItem>
                  <PageLink>3</PageLink>
                </PageNavListItem>
                <PageNavListItem>
                    <PageLink>&#xbb;</PageLink>
                </PageNavListItem>
          </PageNavList>
      </PageNav>
  );
}