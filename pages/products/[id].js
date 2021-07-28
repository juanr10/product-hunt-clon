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

const Product = () => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  const { firebase, user } = useContext(FirebaseContext)

  // Get id
  const router = useRouter()
  const {
    query: { id }
  } = router

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const productQuery = await firebase.db.collection('products').doc(id)
        const product = await productQuery.get()
        if (product.exists) {
          setProduct(product.data())
        } else {
          setError(true)
        }
      }

      getProduct()
    }
  }, [id, product])

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
   * @description: It updates the votes property of the product in the database and also updates the number of votes in product state.
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
                  <form>
                    <Field>
                      <input type="text" name="message" />
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
              {comments.map((comment) => (
                <li key={id}>
                  <p>{comment.name}</p>
                  <p>{comment.userName}</p>
                </li>
              ))}
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
        </div>
      )}
    </Layout>
  )
}

export default Product
