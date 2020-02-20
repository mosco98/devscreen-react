import '../../assets/main.css'

import React from 'react'

const Card = ({ name, url, image }) => {
  return (
    <div className="card promoting-card shadow-lg rounded p-2" style={{ width: '13rem', height: '15rem' }}>
      <div className="view overlay" style={{ height: '120px' }}>
        <img className="w-100 rounded-0" src={image} alt="Card" style={{ height: '120px' }} />
      </div>

      <div className="card-body p-3 d-flex justify-content-center align-items-center flex-column">
        <p className="card-text text-left post-title" style={{ fontSize: '0.75rem', height: '70px' }}>
          {name}
        </p>
        <div className="d-flex align-items-center justify-content-center w-75 p-0 mb-2">
          <small>
            <a href={url} title="Read post" style={{ fontSize: '0.6rem' }}>
              Read post >>
            </a>
          </small>
        </div>
      </div>
    </div>
  )
}

export default Card
