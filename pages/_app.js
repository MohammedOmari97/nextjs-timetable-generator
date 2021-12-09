import { Provider } from "react-redux"
import { useStore } from "../store/store"
import "../styles/globals.css"
import { TimeProvider } from "../components/devtools.js"

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialState)

  return (
    <Provider store={store}>
      <TimeProvider>
        <Component {...pageProps} />
      </TimeProvider>
    </Provider>
  )
}

export default MyApp
