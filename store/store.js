import reducer from "./reducers"
import { useMemo } from "react"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

let store

const initialState = {
  subjectsReducer: [],
  scheduleReducer: { schedule: null, error: null },
  colorsReducer: {},
}

function initStore(preloadedState = initialState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )

  // store.subscribe(() => console.log(store.getState()))
  return store
}

export function initializeStore(preloadedState) {
  // console.log(preloadedState)
  // console.log(store?.getState())
  let _store = store ?? initStore(preloadedState)
  // console.log(_store.getState())

  // why do i need this? to keep the state as is when navigating between pages instead of wiping it out
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  // if (preloadedState.subjectsReducer.length > 0 && store) {
  //   console.log("preloadedState")
  //   console.log(preloadedState)
  //   _store = initStore({
  //     ...store.getState(),
  //     ...preloadedState,
  //   })
  //   // Reset the current store
  //   store = undefined
  // }

  // console.log("++++++++++++++++")
  // console.log(_store.getState())
  // console.log("++++++++++++++++")

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") {
    // console.log("at the server")
    return _store
  }
  // Create the store once in the client
  if (!store) {
    store = _store
  }

  // console.log("------------------------------------")
  // console.log("the return value of initialize store is")
  // console.log(_store.getState())
  // console.log("------------------------------------")
  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])

  return store
}
