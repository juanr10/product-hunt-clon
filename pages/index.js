import React from 'react'
import useProducts from '../hooks/useProducts'
import Layout from '../components/layout/Layout'
import Products from '../components/layout/Products'
import Error404 from '../components/layout/Error404'

export default function Home() {
  const { products } = useProducts('created')

  return (
    <div>
      <Layout>
        {products.length === 0 ? (
          <Error404 message="There is an error loading products. Please try again later." />
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
