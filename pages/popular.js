import React from 'react'
import useProducts from '../hooks/useProducts'
import Layout from '../components/layout/Layout'
import Products from '../components/layout/Products'

export default function Popular() {
  const { products } = useProducts('votes')

  return (
    <div>
      <Layout>
        <div className="products-list">
          <div className="custom-container">
            <div className="bg-white">
              {products.map((product) => {
                return <Products key={product.id} product={product} />
              })}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
