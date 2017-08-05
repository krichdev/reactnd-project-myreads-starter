import React, { Component }from 'react'
import _ from "lodash";
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'


class SearchBooks extends Component {
  state = { 
    books: [] 
  }

  bookSearch(term) {
    BooksAPI.search(term).then((books) => {
                    this.setState({ books })
                    console.log(books)
                }).catch(this.setState({
                    books: undefined
                }))
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
    const bookSearch = _.debounce(term => {
      this.bookSearch(term);
    }, 300);

    return (
      <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={event => bookSearch(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              {this.state.books !== undefined && (
                 <BookShelf shelf="Search Results"
                            books={this.state.books} 
                            onShelfChange={this.updateBookShelf}/>
                 )}  
            </div>
          </div>
    )
  }
}

export default SearchBooks   
