import '../assets/main.css'

import React from 'react'

const SettingsTray = ({ showSettings }) => {
  return (
    <div
      className={
        showSettings ? 'settings-tray ml-3 mb-8 p-4 shadow animated fadeIn' : 'hide settings-tray animated fadeOut'
      }
    >
      <p className="text-center mt-2" style={{ fontSize: '0.85rem' }}>
        Settings
      </p>
      <ul className="list-group">
        <li className="list-group-item" style={{ border: 'none' }}>
          <button
            className="btn btn-sm btn-info"
            onClick={() => {
              localStorage.removeItem('username')
              window.location.reload()
            }}
          >
            Change Name
          </button>
        </li>
        <li className="list-group-item d-flex align-items-center justify-content-between" style={{ border: 'none' }}>
          Work mode
          <input type="checkbox" className="float-right" style={{ cursor: 'pointer' }} checked={true} />
        </li>
        <li className="list-group-item" style={{ border: 'none' }}>
          <a href="/" style={{ fontSize: '0.8rem', color: '#fff', opacity: '0.7' }}>
            Report & feedback
          </a>
        </li>
      </ul>
      <hr />
    </div>
  )
}

export default SettingsTray
