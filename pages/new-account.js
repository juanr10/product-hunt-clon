import React from 'react';
//Styles
import { css } from '@emotion/react';
import { Form, Field, Submit } from '../components/ui/Form';
//Components
import Layout from '../components/layout/Layout';

const NewAccount = () => {
    return (
        <div>
          <Layout>
            <>
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
                >Create a new account</h1>
                <Form>
                    <Field>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder="Enter your name" name="name" />
                    </Field>

                    <Field>
                        <label htmlFor="name">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" name="email" />
                    </Field>

                    <Field>
                        <label htmlFor="password">Pasword:</label>
                        <input type="password" id="password" placeholder="Enter your password" name="password" />
                    </Field>

                    <Submit type="submit" value="Create account" />
                </Form>
            </>
          </Layout>
        </div>
    )
}
 
export default NewAccount;