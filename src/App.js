import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './components/SearchBooks'
import BookCase from './components/BookCase'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    bookSearch: []
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
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return b
        })
      }))
    )
  }

  searchBooks(term) {
    BooksAPI.search(term).then((books) => {
      if (!books || books.error) return

      books.map(book => {
        const bookOnShelf = this.state.books.find(b => b.id === book.id)
        book.shelf = bookOnShelf ? bookOnShelf.shelf : 'none'
        return book
      })

      this.setState({ bookSearch: books })
  
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookCase 
            books={this.state.books}
            updateBookShelf={(book, shelf) => {
              this.updateBookShelf(book, shelf)
            }}
            />
        )}/>

        <Route path="/search" render={() => (
          <SearchBooks 
            books={this.state.bookSearch}
            searchBooks={(term) => {
              this.searchBooks(term)
            }}
            updateBookShelf={(book, shelf) => {
              this.updateBookShelf(book, shelf)
            }}
            />
        )}/>
       
      </div>
    )
  }
}

export default BooksApp