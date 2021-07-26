import React, { useContext } from 'react'
import Router from 'next/router'
import Link from 'next/link'
//Firebase context
import { FirebaseContext } from '../../firebase'
//Styles
import styled from '@emotion/styled'

// Styled components
const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: 'PT Sans', serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`

const Navigation = () => {
  //Firebase context
  const { user } = useContext(FirebaseContext)

  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/popular">Popular</Link>
      {user && <Link href="/new-product">New Product</Link>}
    </Nav>
  )
}

export default Navigation
