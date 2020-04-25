import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { bindActionCreators, connect } from '../Jreact-redux/'

export default connect(
  ({ count }) => ({ count }),
  // {
  //   add: () => ({ type: 'ADD' }),
  //   minus: () => ({ type: 'MINUS' }),
  // },
  (dispatch) => {
    // const add = () => dispatch({ type: 'ADD' })
    // const minus = () => dispatch({ type: 'MINUS' })
    let creators = {
      add: () => ({ type: 'ADD' }),
      minus: () => ({ type: 'MINUS' }),
    }
    creators = bindActionCreators(creators, dispatch)
    return {
      // add,
      // minus,
      ...creators,
      dispatch,
    }
  }
)(
  class ReactReduxPage extends Component {
    dispatchAdd = () => {
      this.props.dispatch({
        type: 'ADD',
      })
    }
    render() {
      const { count, add, minus } = this.props
      console.log(this.props)

      return (
        <div>
          <h3>react-redux</h3>
          <p>{count}</p>
          <button onClick={this.dispatchAdd}>dispatchAdd</button>
          <button onClick={add}>add</button>
          <button onClick={minus}>minus</button>
        </div>
      )
    }
  }
)
