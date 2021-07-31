import React from 'react'
import { css } from '@emotion/react'

const Error404 = ({ message }) => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
        color: var(--gray2);
      `}
    >
      {message}
    </h1>
  )
}

export default Error404
