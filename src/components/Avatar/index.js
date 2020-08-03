import React from 'react'
import PropTypes from 'prop-types'
import generateGradient from '../../utils/helpers/generateGradient'
import './Avatar.scss'

const getAvatar = avatar => {
  if(avatar){
    return avatar
  }
  else{

  }
}

const Avatar = ({avatarSrc, hash, username}) => {
  const firstChar = username.charAt(0)
  return (
  <div className = "avatar">
    {avatarSrc  
      ? <img src={getAvatar(avatarSrc)} alt={`User avatar`}/>
      : <div 
        className="avatar__gradient" 
        style={
          {
            background: `linear-gradient(
              115deg, 
              ${generateGradient(hash).color}, 
              ${generateGradient(hash).lightenColor}
            )`
          }
        }
        >
          <span>{firstChar}</span>
        </div>
    }
  </div>
)}

Avatar.defaultProps = {
  username: 'none'
}

Avatar.propTypes = {
  avatarSrc: PropTypes.string,
  hash: PropTypes.string,
  username: PropTypes.string
}

export default Avatar