import React, { Component }from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

class BookCase extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBookShelf = (book, shelf) => {
    // updating this book with shelf passed in as target.value
    book.shelf = shelf
    // setting state with new shelf
    this.setState((state) => ({
      books: state.books.filter(book => book)
    }))
    // API call to update book with new shelf on backend so when
    // app is reloaded the shelf stays the same
    BooksAPI.update(book, shelf)
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
                     onShelfChange={this.updateBookShelf}
          />
          <BookShelf shelf="Want To Read" 
                     books={this.state.books.filter(book => book.shelf === "wantToRead")}
                     onShelfChange={this.updateBookShelf}
          />
          <BookShelf shelf="Read" 
                     books={this.state.books.filter(book => book.shelf === 'read')}
                     onShelfChange={this.updateBookShelf}
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


