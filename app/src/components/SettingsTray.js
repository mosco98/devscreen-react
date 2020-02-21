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

  workModeToggle = (e) => {
    this.setState({ workMode: !this.state.workMode })
    const toggleCheckbox = document.querySelector('.toggle-checkbox')
    if (toggleCheckbox.checked) {
      localStorage.setItem('WorkMode', true)
    } else {
      localStorage.setItem('WorkMode', false)
    }
    this.props.mainWorkModeToggle()
  }

  render() {
    const { showSettings, userName } = this.props
    const { workMode } = this.state
    return (
      <div
        className={showSettings ? 'settings-tray ml-3 mb-8 p-2 shadow animated fadeIn' : 'hide settings-tray'}
        onMouseDown={this.clickOutsideHandler}
      >
        <p className="text-center mt-2 p-2" style={{ fontSize: '0.85rem' }}>
          Settings
        </p>
        <ul className="list-group">
          <li className="list-group-item d-flex align-items-center justify-content-between" style={{ border: 'none' }}>
            <button
              className="btn btn-sm btn-info p-3"
              onClick={() => {
                localStorage.removeItem('username')
                window.location.reload()
              }}
              style={{ opacity: '0.8', fontSize: '0.75rem' }}
            >
              Change Name
            </button>
            <small>{userName}</small>
          </li>
          <li
            className="list-group-item d-flex align-items-center justify-content-between"
            style={{ border: 'none', fontSize: '0.9rem', color: '#fff', opacity: '0.8' }}
          >
            Work mode
            <input
              type="checkbox"
              className="float-right toggle-checkbox"
              style={{ cursor: 'pointer' }}
              checked={workMode ? true : false}
              onChange={this.workModeToggle}
            />
          </li>
          <li className="list-group-item" style={{ border: 'none' }}>
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
