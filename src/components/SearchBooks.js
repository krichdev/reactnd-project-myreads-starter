import React, { Component }from 'react'
import _ from "lodash";
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'


class SearchBooks extends Component {

  render(){
    const bookSearch = _.debounce(term => {
      this.props.searchBooks(term);
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
              {this.props.books &&
                this.props.books.length > 0 && (
                 <BookShelf shelf="Search Results"
                            books={this.props.books} 
                            onShelfChange={this.props.updateBookShelf}/>
                 )}  
            </div>
          </div>
    )
  }
}

export default SearchBooks 