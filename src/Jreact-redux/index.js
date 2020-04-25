import React, { useContext, useReducer, useLayoutEffect } from 'react'
// import { useStore } from 'react-redux'

const Context = React.createContext()
export const connect = (mapStateToProps, mapDispatchToProps) => (
  WrappedComponent
) => (props) => {
  const store = useContext(Context)
  const { getState, subscribe, dispatch } = store
  const stateProps = mapStateToProps(getState())
  let dispatchProps = { dispatch }

  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch)
  } else if (typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
  }

  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate()
    })
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [store, subscribe])
  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}

export function Provider({ children, store }) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export function bindActionCreators(creators, dispatch) {
  let obj = {}
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
  return obj
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function useSelector(selector) {
  const store = useStore()
  const { getState, subscribe } = store
  // 返回store state
  const selectState = selector(getState())

  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate()
    })
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [store, subscribe])
  return selectState
}

export function useDispatch() {
  const store = useStore()
  return store.dispatch
}

export function useStore() {
  const store = useContext(Context)
  return store
}
