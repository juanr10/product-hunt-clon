import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../firebase'

const useProducts = (order) => {
  const [products, setProducts] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    let isMounted = true

    const getProducts = async () => {
      const response = firebase.db.collection('products').orderBy(order, 'desc')
      const data = await response.get()

      const products = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      if (isMounted) setProducts(products)
    }

    getProducts()

    //Cleanup
    return () => {
      isMounted = false
    }
  }, [])

  return {
    products
  }
}

export default useProducts
