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
    BooksAPI.update(book, shelf).then(
      this.setState(prevState => ({
        books: prevState.books.map(b => {
          if(b.id === book.id) {
            b.shelf = shelf
          }
          return b
        })
      }))
    )
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


