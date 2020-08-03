import React from 'react'
import PropTypes from 'prop-types'
import { Button as BaseButton } from 'antd'
import './Button.scss'
import ClassNames from 'classnames'

const Button = ({className, size, disabled, ...restProps}) => (
   <BaseButton 
    disabled={disabled} 
    className={ClassNames("button", className, {"button--large": size === "large"})} {...restProps}/>
)

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button