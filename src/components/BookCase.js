import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class BookCase extends Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render(){
    return (
      <div>
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf shelf="Currently Reading" 
                     books={this.state.books.filter(book => book.shelf === "currentlyReading")}
          />
          <BookShelf shelf="Want To Read" 
                     books={this.state.books.filter(book => book.shelf === "wantToRead")}
          />
          <BookShelf shelf="Read" 
                     books={this.state.books.filter(book => book.shelf === 'read')}
          />
        </div>
        <div className="open-search">
          <Link to='/search'>Search</Link>
        </div>
      </div>
    )
  }
}

export default BookCase


