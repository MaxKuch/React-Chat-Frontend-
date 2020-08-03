import React from 'react'
import readedSvg from '../../assets/img/readed.svg'
import noRreadedSvg from '../../assets/img/noreaded.svg'

const IconReaded = ({ isReaded, className }) =>(
  <div className = {className}>
    <img src={isReaded ? readedSvg : noRreadedSvg} alt=""/>
  </div>
)

export default IconReaded