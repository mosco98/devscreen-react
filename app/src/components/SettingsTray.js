import '../assets/main.css'

import React, { Component } from 'react'

const getWorkMode = localStorage.getItem('WorkMode')
export default class SettingsTray extends Component {
  constructor() {
    super()
    this.state = {
      workMode: JSON.parse(getWorkMode) === null ? false : JSON.parse(getWorkMode)
    }
  }

  workModeToggle = () => {
    this.setState({ workMode: !this.state.workMode })
    const toggleCheckbox = document.querySelector('.toggle-checkbox')
    if (toggleCheckbox.checked) {
      localStorage.setItem('WorkMode', true)
    } else {
      localStorage.setItem('WorkMode', false)
    }
    this.props.mainWorkModeToggle()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = (node) => {
    this.wrapperRef = node
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closeSettingsHandler()
    }
  }

  render() {
    const { showSettings, userName } = this.props
    const { workMode } = this.state
    return (
      <div
        className={showSettings ? 'settings-tray ml-7 mb-9 p-3 rounded shadow animated fadeIn' : 'hide settings-tray'}
        ref={this.setWrapperRef}
      >
        <p className="text-center mt-2 p-2" style={{ fontSize: '0.85rem' }}>
          Settings
        </p>
        <ul className="list-group">
          <li
            className="list-group-item d-flex align-items-center justify-content-between p-4"
            style={{ border: 'none' }}
          >
            <button
              className="btn btn-sm btn-info p-2"
              onClick={() => {
                localStorage.removeItem('username')
                window.location.reload()
              }}
              style={{ opacity: '0.8', fontSize: '0.72rem' }}
            >
              Change Name
            </button>
            <small>{userName}</small>
          </li>
          <li
            className="list-group-item d-flex align-items-center justify-content-between p-4"
            style={{ border: 'none', fontSize: '0.9rem', color: '#fff', opacity: '0.8' }}
          >
            <span className="h-100">Work mode</span>
            <label className="switch mt-3">
              <input
                type="checkbox"
                className="float-right toggle-checkbox"
                style={{ cursor: 'pointer' }}
                checked={workMode ? true : false}
                onChange={this.workModeToggle}
              />
              <span className="slider round"></span>
            </label>
          </li>
          <li className="list-group-item p-4" style={{ border: 'none' }}>
            <a href="/" style={{ fontSize: '0.73rem', color: '#fff', opacity: '0.7' }}>
              Report & feedback
            </a>
          </li>
        </ul>
        <hr style={{ opacity: '0.5' }} />
      </div>
    )
  }
}
