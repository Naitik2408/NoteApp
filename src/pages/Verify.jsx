import React from 'react'
import { Link } from 'react-router-dom'


function Verify() {
  return (
    <div>
      <h1>verified</h1>
      <Link to={"/login"}>Go to login page</Link>
    </div>
  )
}

export default Verify
