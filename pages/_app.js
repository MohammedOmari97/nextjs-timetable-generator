import { Provider } from "react-redux"
import { useStore } from "../store/store"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
