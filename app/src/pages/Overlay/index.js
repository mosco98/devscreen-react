import React from 'react'

const Overlay = ({ setName }) => {
  return (
    <div className="w-100 vh-100 position-fixed text-center d-flex flex-column justify-content-center align-items-center animated fadeIn">
      <div
        className="container w-50 p-2 d-flex flex-column justify-content-around align-items-center"
        style={{ height: '15rem' }}
      >
        <h1>
          Hi, Developer
          <span className="ml-2" role="img" aria-label="smile">
            😄
          </span>
        </h1>
        <h4>What do I call you?</h4>
        <input
          className="w-75 text-center mt-3 p-2 h-25"
          type="text"
          placeholder="Enter Name..."
          style={{
            outline: 'none',
            fontSize: '25px',
            borderBottom: '1px solid black',
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none'
          }}
          autoFocus={true}
          onKeyPress={setName}
        />
      </div>
    </div>
  )
}

export default Overlay
