import React, { Component } from 'react'

import Main from './pages/Main'
import Overlay from './pages/Overlay'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      userName: localStorage.getItem('username'),
      isLoggedIn: false,
      error: ''
    }
  }
  componentDidMount() {
    this.checkName()
  }
  setName = (e) => {
    const { value } = e.target
    if (e.key === 'Enter' && value !== '') {
      const name = value.charAt(0).toUpperCase() + value.slice(1)
      localStorage.setItem('username', name)

      return this.setState({
        isLoggedIn: true
      })
    } else
      return this.setState({
        error: 'Please submit a name'
      })
  }

  checkName = () => {
    const { userName } = this.state
    if (userName === null) {
      return this.setState({
        isLoggedIn: false
      })
    } else {
      return this.setState({
        isLoggedIn: true
      })
    }
  }
  render() {
    const { isLoggedIn } = this.state
    const CurrentView = isLoggedIn ? Main : Overlay
    return (
      <div>
        <CurrentView setName={this.setName} />
      </div>
    )
  }
}
