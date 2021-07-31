import React from 'react'
import useProducts from '../hooks/useProducts'
import Layout from '../components/layout/Layout'
import Products from '../components/layout/Products'
import Error404 from '../components/layout/Error404'
import Spinner from '../components/ui/Spinner'

export default function Popular() {
  const { products } = useProducts('votes')

  return (
    <div>
      <Layout>
        {products.length === 0 ? (
          <>
            <Error404 message="Loading products. Please wait." />
            <Spinner />
          </>
        ) : (
          <div className="products-list">
            <div className="custom-container">
              <div className="bg-white">
                {products.map((product) => {
                  return <Products key={product.id} product={product} />
                })}
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}
