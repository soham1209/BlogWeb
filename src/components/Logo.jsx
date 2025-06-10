import React from 'react'
import Blog from '../assets/blog1.svg'

function Logo({ClassName="", width = '100px'}) {
  return (
    <img src={Blog} alt="Logo"
    className={` ${ClassName}`}
     style={{ width }} />
  )
}

export default Logo

