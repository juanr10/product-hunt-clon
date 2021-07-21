import React from 'react';
import Layout from '../components/layout/Layout';

const NewProduct = () => {
  //TODO -> Proteger ruta si el usuario no está logeado.

    return (
        <div>
          <Layout>
            <h1>Add a new product</h1>
          </Layout>
        </div>
    )
}
 
export default NewProduct;