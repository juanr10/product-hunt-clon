import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Layout from '../../components/layout/Layout'
import Error404 from '../../components/layout/Error404'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Field, Submit } from '../../components/ui/Form'
import Button from '../../components/ui/Button'

// Styled components
const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`

const ProductCreator = styled.p`
  padding: 0.5rem 2rem;
  background-color: var(--orange);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`

const Product = () => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  const [comment, setComment] = useState({})
  // Flag to avoid unnecessary database queries.
  const [dbConsult, setDbConsult] = useState(true)

  const { firebase, user } = useContext(FirebaseContext)

  // Get id
  const router = useRouter()
  const {
    query: { id }
  } = router

  useEffect(() => {
    if (id && dbConsult) {
      const getProduct = async () => {
        const productQuery = await firebase.db.collection('products').doc(id)
        const product = await productQuery.get()
        if (product.exists) {
          setProduct(product.data())
          setDbConsult(false)
        } else {
          setError(true)
          setDbConsult(false)
        }
      }

      getProduct()
    }
  }, [id])

  // TODO: Add spinner
  if (Object.keys(product).length === 0 && !error) return 'Loading...'

  const {
    name,
    description,
    company,
    url,
    imageUrl,
    comments,
    votes,
    voters,
    created,
    creator
  } = product

  /**
   * @name: vote.
   * @description: updates the votes property of the product in the database and also updates the product votes state.
   * @param: none.
   * @return: none.
   */
  const vote = () => {
    if (!user) {
      return router.push('/login')
    }

    const totalVotes = votes + 1

    // Check if the user has already voted
    if (voters.includes(user.uid)) {
      return
    }

    // Save voter id
    const newVoters = [...voters, user.uid]

    //DB update
    firebase.db.collection('products').doc(id).update({
      votes: totalVotes,
      voters: newVoters
    })

    setProduct({
      ...product,
      votes: totalVotes
    })

    setDbConsult(true) // Refresh product data from db
  }

  /**
   * @name: commentChange.
   * @description: updates comment state with the data entered by the user.
   * @param: event.
   * @return: none.
   */
  const commentChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
  }

  /**
   * @name: addComment.
   * @description: updates the comments property of the product in the database and also updates the product comments state.
   * @param: none.
   * @return: none.
   */
  const addComment = (e) => {
    e.preventDefault()

    if (!user) {
      return router.push('/login')
    }

    //Extra info
    comment.userId = user.uid
    comment.userName = user.displayName
    comment.date = Date.now()

    const newComments = [...comments, comment]

    //DB update
    firebase.db.collection('products').doc(id).update({
      comments: newComments
    })

    setProduct({
      ...product,
      comments: newComments
    })

    setDbConsult(true) // Refresh product data from db
  }

  /**
   * @name: deleteProduct.
   * @description: delete a product from the database.
   * @param: none.
   * @return: none.
   */
  const deleteProduct = async () => {
    if (!user || !isCreator(user.uid)) {
      return router.push('/login')
    }

    try {
      await firebase.db.collection('products').doc(id).delete()
      router.push('/')
    } catch (error) {
      // TODO -> add sweet alert
      console.log(error)
    }
  }

  /**
   * @name: isCreator.
   * @description: check if the authenticated user is the product creator.
   * @param: product id.
   * @return: none.
   */
  const isCreator = (id) => {
    if (creator.id === id) {
      return true
    }

    return false
  }

  return (
    <Layout>
      {error ? (
        <Error404 message="Product not found" />
      ) : (
        <div className="custom-container">
          <h1
            css={css`
              margin-top: 5rem;
              text-align: center;
            `}
          >
            {name}
          </h1>

          <ProductContainer>
            <div>
              <img src={imageUrl} alt={name} />
              <p
                css={css`
                  padding: 3rem 0;
                `}
              >
                {description}
              </p>

              {user && (
                <>
                  <h2>Add a comment</h2>
                  <form onSubmit={addComment}>
                    <Field>
                      <input
                        type="text"
                        name="message"
                        onChange={commentChange}
                      />
                    </Field>
                    <Submit type="submit" value="Add a comment"></Submit>
                  </form>
                </>
              )}

              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >
                Comments
              </h2>

              {comments.length === 0 ? (
                'There are no comments yet. Be the first to leave one!'
              ) : (
                <ul>
                  {comments.map((comment, i) => (
                    <li
                      key={`${comment.userId}-${i}`}
                      css={css`
                        border: 1px solid var(--gray3);
                        padding: 1rem;
                      `}
                    >
                      <p>{comment.message}</p>
                      <p>
                        {comment.userName} ·{' '}
                        {formatDistanceToNow(new Date(comment.date))}
                      </p>
                      {isCreator(comment.userId) && (
                        <ProductCreator>Creator</ProductCreator>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside>
              <p>
                Publicated by {creator.name} from {company}.
              </p>
              <p>{formatDistanceToNow(new Date(created))} ago</p>
              <Button target="_blank" bgColor="true" href={url}>
                Visit URL
              </Button>

              <div
                css={css`
                  margin-top: 5rem;
                `}
              >
                {user && <Button onClick={vote}>Vote</Button>}

                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votes} votes
                </p>
              </div>
            </aside>
          </ProductContainer>

          {user && isCreator(user.uid) ? (
            <Button onClick={deleteProduct} bgColor="true">
              Delete product
            </Button>
          ) : null}
        </div>
      )}
    </Layout>
  )
}

export default Product
