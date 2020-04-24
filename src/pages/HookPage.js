import React, {
  useReducer,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react'
import { counterReducer } from '../store/'

function HookPage(props) {
  const [state, dispatch] = useReducer(counterReducer, 0)
  const add = useCallback(() => {
    dispatch({
      type: 'ADD',
    })
  }, [])

  useEffect(() => {
    // 会在组件渲染到屏幕以后延迟执行
    console.log('useEffect') //sy-log
  })
  useLayoutEffect(() => {
    // 所有Dom变更以后同步执行
    console.log('useLayoutEffect') //sy-log
  })

  console.log('---') //sy-log

  return (
    <div>
      <h3>HookPage</h3>
      <p>{state}</p>
      <button onClick={add}>add</button>
    </div>
  )
}

export default HookPage
