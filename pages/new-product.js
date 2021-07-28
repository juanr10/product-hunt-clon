import React, { useState, useContext } from 'react'
import Router, { useRouter } from 'next/router'
//Firebase
import { FirebaseContext } from '../firebase'
import FileUploader from 'react-firebase-file-uploader'
//Styles
import { css } from '@emotion/react'
import { Form, Field, Submit, Error } from '../components/ui/Form'
//Components
import Layout from '../components/layout/Layout'
import Error404 from '../components/layout/Error404'
//Validations
import useValidation from '../hooks/useValidation'
import validateNewProduct from '../validations/validateNewProduct'

const INITIAL_STATE = {
  name: '',
  company: '',
  image: '',
  url: '',
  description: ''
}

const NewProduct = () => {
  //Custom hook
  const { values, errors, submitForm, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateNewProduct, createProduct)
  const { name, company, image, url, description } = values
  const [error, setError] = useState(false)

  //Routing hook
  const router = useRouter()

  //Context & CRUD Firestore methods
  const { user, firebase } = useContext(FirebaseContext)

  //Image state
  const [imageName, setImageName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState('')

  /**
   * @name: createProduct.
   * @description: checks if the user is authenticated & adds a new product in Firebase database.
   * @param: none.
   * @return: none.
   */
  function createProduct() {
    if (!user) {
      router.push('/login')
      return
    }

    const product = {
      name,
      company,
      url,
      imageUrl,
      description,
      votes: 0,
      voters: [],
      comments: [],
      created: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName
      }
    }

    firebase.db.collection('products').add(product)

    return router.push('/')
  }

  /* Image upload management */
  /**
   * @name: handleUploadStart.
   * @description: updates isUploading & progress state.
   * @param: none.
   * @return: none.
   */
  const handleUploadStart = () => {
    setIsUploading(true)
    setProgress(0)
  }

  /**
   * @name: handleProgress.
   * @description: updates progress state.
   * @param: none.
   * @return: none.
   */
  const handleProgress = (progress) => setProgress(progress)

  /**
   * @name: handleUploadError.
   * @description: updates isUploading state with the error.
   * @param: none.
   * @return: none.
   */
  const handleUploadError = (error) => {
    setIsUploading(error)
    console.error(error)
  }

  /**
   * @name: handleUploadSuccess.
   * @description: updates progress, isUploading and imageName. Upload image to firestore, get the URL and updates imageUrl state.
   * @param: none.
   * @return: none.
   */
  const handleUploadSuccess = (filename) => {
    setProgress(100)
    setIsUploading(false)
    setImageName(filename)
    firebase.storage
      .ref('products')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        console.log(url)
        setImageUrl(url)
      })
  }

  return (
    <div>
      <Layout>
        {!user ? (
          <Error404 message="Please login to add a product" />
        ) : (
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              Add a new product
            </h1>
            <Form onSubmit={handleSubmit} novalidate>
              <fieldset>
                <legend>Overview</legend>

                <Field>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter product name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.name && <Error>{errors.name}</Error>}

                <Field>
                  <label htmlFor="company">Company:</label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Enter the company"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.company && <Error>{errors.company}</Error>}

                <Field>
                  <label htmlFor="image">Image:</label>
                  <FileUploader
                    accept="image/*"
                    id="image"
                    name="image"
                    randomizeFilename
                    storageRef={firebase.storage.ref('products')}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Field>

                <Field>
                  <label htmlFor="url">URL:</label>
                  <input
                    type="url"
                    id="url"
                    placeholder="Enter product URL"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.url && <Error>{errors.url}</Error>}
              </fieldset>

              <fieldset>
                <legend>About the product</legend>

                <Field>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    placeholder="Enter a product description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.description && <Error>{errors.description}</Error>}
              </fieldset>

              {error && <Error>{error}</Error>}

              <Submit type="submit" value="Add product" />
            </Form>
          </>
        )}
      </Layout>
    </div>
  )
}

export default NewProduct
