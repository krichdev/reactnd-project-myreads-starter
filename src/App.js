import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookCase from './components/BookCase'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  
  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookCase />
        )}/>

        <Route path="/search" render={() => (
          <SearchBooks />
        )}/>
       
      </div>
    )
  }
}

export default BooksApp