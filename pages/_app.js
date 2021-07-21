import '../styles/globals.css'
import firebase, {FirebaseContext} from '../firebase';
import useAuthentication from '../hooks/useAuthentication';

function MyApp({ Component, pageProps }) {
  const user = useAuthentication();
  console.log(user);
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
