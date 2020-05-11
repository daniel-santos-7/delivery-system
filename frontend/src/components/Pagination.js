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
        background-color: ${props=> props.theme.colors.secondary};
        & > a {
            color: #fff;
        }
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


export default function Pagination({ page, totalItems, perPage, setPage }) {
    
    const totalPages =  Math.ceil(totalItems/perPage);
    const hasNextPage = page < totalPages;
    const hasPreviosPage = page > 1;

    const nextPage = ()=> {
        if(hasNextPage)
            setPage(page+1);
    };
    
    const previosPage = ()=> {
        if(hasPreviosPage)
            setPage(page-1);
    };
  
    return (
      <PageNav>
          <PageNavList>
                <PageNavListItem>
                    <PageLink to="" onClick={previosPage}>&#xab;</PageLink>
                </PageNavListItem>
                {   hasPreviosPage &&    
                    <PageNavListItem>
                        <PageLink to="" onClick={previosPage}>{page-1}</PageLink>
                    </PageNavListItem>
                }
                <PageNavListItem>
                    <PageLink to="">{page}</PageLink>
                </PageNavListItem>
                {   hasNextPage &&
                    <PageNavListItem>
                        <PageLink to="" onClick={nextPage}>{page+1}</PageLink>
                    </PageNavListItem>
                }
                <PageNavListItem>
                    <PageLink to="" onClick={nextPage}>&#xbb;</PageLink>
                </PageNavListItem>
          </PageNavList>
      </PageNav>
  );
}