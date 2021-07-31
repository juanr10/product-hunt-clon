import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useProducts from '../hooks/useProducts'
import Products from '../components/layout/Products'
import Layout from '../components/layout/Layout'
import Error404 from '../components/layout/Error404'

const Search = () => {
  const router = useRouter()
  const {
    query: { q }
  } = router
  const { products } = useProducts('created')

  const [result, setResult] = useState([])

  useEffect(() => {
    const search = q.toLowerCase()
    const filter = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.company.toLowerCase().includes(search)
      )
    })

    setResult(filter)
  }, [q, products])

  return (
    <div>
      <Layout>
        {result.length === 0 ? (
          <Error404 message="No results were found with that search term." />
        ) : (
          <div className="products-list">
            <div className="custom-container">
              <div className="bg-white">
                {result.map((product) => {
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

export default Search
