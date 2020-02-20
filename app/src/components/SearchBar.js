import React, { Component } from 'react'

import google from '../assets/icons/google.png'
import medium from '../assets/icons/medium.png'
import stackOverflow from '../assets/icons/stack-overflow.png'
import youtube from '../assets/icons/youtube.png'

export default class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery: '',
      error: false
    }
  }

  // Google search Handler
  googleSearch = () => {
    const URL = 'https://www.google.com/search?q='
    const { searchQuery } = this.state
    if (searchQuery.length === 0) {
      return false
    }

    const searchParam = searchQuery
      .split(' ')
      .filter(Boolean)
      .join('+')

    const searchURL = URL + searchParam

    return window.open(searchURL, '_blank')
  }

  // Stackoverflow search Handler
  stackOverflowSearch = () => {
    const URL = 'https://stackoverflow.com/search?q='
    const { searchQuery } = this.state
    if (searchQuery.length === 0) {
      return false
    }

    const searchParam = searchQuery
      .split(' ')
      .filter(Boolean)
      .join('+')

    const searchURL = URL + searchParam

    return window.open(searchURL, '_blank')
  }

  // Youtube search Handler
  youTubeSearch = () => {
    const URL = 'https://www.youtube.com/results?search_query='
    const { searchQuery } = this.state
    if (searchQuery.length === 0) {
      return false
    }

    const searchParam = searchQuery
      .split(' ')
      .filter(Boolean)
      .join('+')

    const searchURL = URL + searchParam

    return window.open(searchURL, '_blank')
  }

  // Medium search handler
  mediumSearch = () => {
    const URL = 'https://medium.com/search?q='
    const { searchQuery } = this.state
    if (searchQuery.length === 0) {
      return false
    }

    const searchParam = searchQuery
      .split(' ')
      .filter(Boolean)
      .join('+')

    const searchURL = URL + searchParam

    return window.open(searchURL, '_blank')
  }

  checkInput = (e) => {
    if (e.key === 'Enter') {
      this.props.searchErrorHandler()
    }
  }

  inputHandler = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }
  render() {
    return (
      <div className="container w-50 d-flex flex-column justify-content-center align-items-center">
        <div className="container w-50 mb-1 p-3 d-flex align-items-center justify-content-around">
          <img
            className="img-fluid icons"
            src={google}
            alt="google"
            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
            onClick={this.googleSearch}
          />
          <img
            className="img-fluid icons"
            src={stackOverflow}
            alt="stack-overflow"
            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
            onClick={this.stackOverflowSearch}
          />
          <img
            className="img-fluid icons"
            src={youtube}
            alt="youtube"
            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
            onClick={this.youTubeSearch}
          />
          <img
            className="img-fluid icons"
            src={medium}
            alt="medium"
            style={{ cursor: 'pointer', width: '25px', height: '25px' }}
            onClick={this.mediumSearch}
          />
        </div>
        <input
          className="w-100 form-control"
          type="text"
          placeholder="Enter Search..."
          onKeyPress={this.checkInput}
          autoFocus={true}
          onChange={this.inputHandler}
        />
      </div>
    )
  }
}
