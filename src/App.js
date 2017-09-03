import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class BookCase extends Component {

  render(){
    return (
      <div>
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf shelf="Currently Reading" 
                     books={this.props.books.filter(book => book.shelf === "currentlyReading")}
                     onShelfChange={this.props.updateBookShelf}
          />
          <BookShelf shelf="Want To Read" 
                     books={this.props.books.filter(book => book.shelf === "wantToRead")}
                     onShelfChange={this.props.updateBookShelf}
          />
          <BookShelf shelf="Read" 
                     books={this.props.books.filter(book => book.shelf === 'read')}
                     onShelfChange={this.props.updateBookShelf}
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
