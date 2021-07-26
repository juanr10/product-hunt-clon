import React, { useEffect, useState } from 'react'
import firebase from '../firebase'

/**
 * @name: useAuthentication.
 * @description: custom hook that checks if there is an authenticated user.
 * @param: none.
 * @return: authenticated user.
 */
function useAuthentication() {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })

    return () => unsuscribe()
  }, [])

  return authUser
}

export default useAuthentication
