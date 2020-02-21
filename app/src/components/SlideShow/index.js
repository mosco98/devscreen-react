import 'react-multi-carousel/lib/styles.css'

import React, { Component } from 'react'
import Carousel from 'react-multi-carousel'

import Card from './Card'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}
const url = 'https://cors-anywhere.herokuapp.com/https://quiet-bayou-45541.herokuapp.com/'

export default class SlideShow extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      isLoading: true,
      error: false
    }
  }

  fetchArticles = () => {
    this.setState({
      isLoading: true
    })
    fetch(url, { signal: this.abortController.signal })
      .then((res) => res.json())
      .then((articles) => {
        return this.setState({
          articles,
          isLoading: false
        })
      })
      .catch((error) => {
        if (error) {
          return this.setState({
            error: true
          })
        }
        if (error.name === 'AbortError') return
        throw error
      })
  }

  componentDidMount() {
    this.fetchArticles()
  }

  componentWillUnmount = () => this.abortController.abort()

  abortController = new window.AbortController()

  render() {
    const { articles, isLoading, error } = this.state
    if (isLoading) {
      return (
        <div className="w-100 p-6 d-flex justify-content-center align-items-center" style={{ height: '17rem' }}>
          {error ? (
            <p className="text-center">
              Oops! Couldn't fetch posts
              <br />
              <button className="mt-2" onClick={this.fetchArticles}>
                Refresh here
              </button>
            </p>
          ) : (
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      )
    }
    return (
      <Carousel
        responsive={responsive}
        draggable={true}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed="5000"
        className="p-5 container w-75 animated fadeIn shadow"
        centerMode={true}
      >
        {articles.map((article) => (
          <Card key={article.name} {...article} />
        ))}
      </Carousel>
    )
  }
}
