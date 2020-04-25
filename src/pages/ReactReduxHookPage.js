import React, { useCallback } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from '../Jreact-redux/'

export default function ReactReduxHookPage(props) {
  const count = useSelector(({ count }) => count)
  const dispatch = useDispatch()
  const add = useCallback(() => {
    dispatch({ type: 'ADD' })
  }, [dispatch])
  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  )
}
