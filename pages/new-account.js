import React, { useState } from 'react'
import Router from 'next/router'
//Styles
import { css } from '@emotion/react'
import { Form, Field, Submit, Error } from '../components/ui/Form'
//Components
import Layout from '../components/layout/Layout'
//Firebase
import firebase from '../firebase'
//Validations
import useValidation from '../hooks/useValidation'
import validateNewAccount from '../validations/validateNewAccount'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const NewAccount = () => {
  //Custom hook
  const { values, errors, submitForm, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateNewAccount, createNewAccount)
  const { name, email, password } = values
  const [error, setError] = useState(false)

  /**
   * @name: createNewAccount.
   * @description: creates asynchronously a new user in Firebase.
   * @param: none.
   * @return: none.
   */
  async function createNewAccount() {
    try {
      await firebase.register(name, email, password)
      Router.push('/')
    } catch (error) {
      console.error(
        'There has been an error creating the account, please try again later.',
        error.message
      )
      setError(error.message)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Create a new account
          </h1>
          <Form onSubmit={handleSubmit} novalidate>
            <Field>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            {errors.name && <Error>{errors.name}</Error>}

            <Field>
              <label htmlFor="name">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            {errors.email && <Error>{errors.email}</Error>}

            <Field>
              <label htmlFor="password">Pasword:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            {errors.password && <Error>{errors.password}</Error>}

            {error && <Error>{error}</Error>}

            <Submit type="submit" value="Create account" />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default NewAccount
