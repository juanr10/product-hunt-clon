import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../firebase'
import Layout from '../components/layout/Layout'
import Product from '../components/layout/Product'

export default function Home() {
  const [products, setProducts] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const getProducts = () => {}
    firebase.db
      .collection('products')
      .orderBy('created', 'desc')
      .onSnapshot(snapshotManagement)

    getProducts()
  }, [])

  function snapshotManagement(snapshot) {
    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    setProducts(products)
  }

  return (
    <div>
      <Layout>
        <div className="products-list">
          <div className="custom-container">
            <div className="bg-white">
              {products.map((product) => {
                return <Product key={product.id} product={product} />
              })}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
