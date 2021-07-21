import React from 'react';
//Styles
import { css } from '@emotion/react';
import { Form, Field, Submit, Error } from '../components/ui/Form';
//Components
import Layout from '../components/layout/Layout';

//Validations
import useValidation from '../hooks/useValidation';
import validateNewAccount from '../validations/validateNewAccount';
const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
}

const NewAccount = () => {
    //Custom hook
    const { values, errors, submitForm, handleChange, handleSubmit, handleBlur } = useValidation(INITIAL_STATE, validateNewAccount, createNewAccount);

    const { name, email, password } = values;

    /**
     * @name: createNewAccount.
     * @description: updates the state (values) with the data entered by the user.
     * @param: event.
     * @return: none.
    */
    function createNewAccount() {
        console.log("heyyyyy");
    }

    return (
        <div>
          <Layout>
            <>
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
                >Create a new account</h1>
                <Form onSubmit={handleSubmit} novalidate>
                    <Field>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder="Enter your name" name="name" value={name} onChange={handleChange} onBlur={handleBlur}/>
                    </Field>

                    { errors.name && <Error>{errors.name}</Error> }

                    <Field>
                        <label htmlFor="name">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" name="email" value={email} onChange={handleChange} onBlur={handleBlur}/>
                    </Field>

                    { errors.email && <Error>{errors.email}</Error> }

                    <Field>
                        <label htmlFor="password">Pasword:</label>
                        <input type="password" id="password" placeholder="Enter your password" name="password" value={password} onChange={handleChange} onBlur={handleBlur}/>
                    </Field>

                    { errors.password && <Error>{errors.password}</Error> }

                    <Submit type="submit" value="Create account" />
                </Form>
            </>
          </Layout>
        </div>
    )
}
 
export default NewAccount;