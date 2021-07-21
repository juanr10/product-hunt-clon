import React, {useState} from 'react';
import Router from 'next/router'
//Styles
import { css } from '@emotion/react';
import { Form, Field, Submit, Error } from '../components/ui/Form';
//Components
import Layout from '../components/layout/Layout';
//Firebase
import firebase from '../firebase';
//Validations
import useValidation from '../hooks/useValidation';
import validateLogin from '../validations/validateLogin';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const Login = () => {
     //Custom hook
     const { values, errors, submitForm, handleChange, handleSubmit, handleBlur } = useValidation(INITIAL_STATE, validateLogin, login);
     const { email, password } = values;
     const [error, setError] = useState(false);
 
     /**
      * @name: login.
      * @description: logs the user in.
      * @param: none.
      * @return: none.
     */
     async function login() {
         try {
             await firebase.login(email, password);
             Router.push('/');
         } catch (error) {
             console.error('There has been a login error, please try again later.', error.message);
             setError(error.message);
         } 
     }
 
     return (
         <div>
           <Layout>
             <>
                 <h1 css={css`
                     text-align: center;
                     margin-top: 5rem;
                 `}
                 >Product Hunt Clon</h1>
                 <Form onSubmit={handleSubmit} novalidate>
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
 
                     { error && <Error>{error}</Error> }
 
                     <Submit type="submit" value="Login" />
                 </Form>
             </>
           </Layout>
         </div>
     )
}
 
export default Login;