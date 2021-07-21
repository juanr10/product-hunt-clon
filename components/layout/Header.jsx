import React from 'react';
import Link from 'next/link';
//Styles
import styled from '@emotion/styled';
import { css } from '@emotion/react';
//Components
import Search from '../ui/Search';
import Navigation from './Navigation';
import Button from '../ui/Button';

// Styled components
const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px){
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-family: 'Roboto Slab', serif;
    font-weight: 700;
    margin-right: 2rem;
`;

const Header = () => {
    const user = false;

    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--gray3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href="/" passHref>
                        <Logo>P</Logo>
                    </Link>
                    
                    {/* Search */}
                    <Search />

                    {/* Nav */}
                    <Navigation />
                </div>

                {/* Right elements */}
                <div css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    { user ? 
                        (
                            <>
                                {/* Admin menu */}
                                <p css={css`
                                        margin-right: 2rem;
                                    `}
                                >
                                    Hola: Juan
                                </p>

                                <Button bgColor="true">Log out</Button>
                            </>
                        ) : 
                        (
                            <>
                                <Link href="/login" passHref>
                                    <Button bgColor="true">Login</Button>
                                </Link>
                                <Link href="/new-account" passHref>
                                    <Button>Create account</Button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </HeaderContainer>
        </header>
     );
}
 
export default Header;