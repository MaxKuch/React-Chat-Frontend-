import React from 'react'
import './Block.scss'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

const Block = ({ children, className }) => 
(
  <div className={ClassNames('block', className)}> {children} </div>
)

Block.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired
}

export default Block