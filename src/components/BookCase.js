import React, { Component }from 'react'
import { Link } from 'react-router-dom'

class BookCase extends Component {
  render(){
    return (
        <div>
          <h1>Book Case</h1>
          <Link to='/search'>Search</Link>
        </div>
    )
  }
}

export default BookCase


