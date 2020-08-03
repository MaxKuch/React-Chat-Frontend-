import React, {useState, useRef, useEffect} from 'react'
import distanceInWordsToNow from 'date-fns/formatDistanceToNow'
import classNames from 'classnames'
import { ru } from 'date-fns/locale'
import PropTypes from 'prop-types'
import './Message.scss'
import IconReaded from '../IconReaded'
import Avatar from '../Avatar'

const Message = (
  {
    avatar, 
    text, 
    date, 
    user, 
    isMe, 
    isReaded, 
    audio, 
    attachments, 
    isTyping
  }) => {
  const [messageCreatedTime, setMessageCreatedTime] = useState()
  const intervalId = useRef(null)

  useEffect(() => {
    clearInterval(intervalId.current)
    if(date){
      setMessageCreatedTime(distanceInWordsToNow(new Date(date), { addSuffix: true, locale: ru }))
      intervalId.current = setInterval(() => {
        setMessageCreatedTime(distanceInWordsToNow(new Date(date), { addSuffix: true, locale: ru }))
      }, 60000)
    }
    return () => {
      clearInterval(intervalId.current)
    }
  }, [date])

  if(!(audio || text || isTyping || attachments.length))
    return <div></div>
  return (
   <div className = {classNames('message', 
    {
      'message--isme': isMe, 
      'message--is-typing': isTyping, 
      'message--image': attachments && attachments.length === 1,
      'message--audio': audio
    })}>
     <div className = "message__wrap">
      <div className="message__avatar">
        <Avatar avatarSrc={avatar} hash={user._id} username={user.fullname}/>
      </div>
      <div>
        <div className="message__content">
          {(audio || text || isTyping) && 
            <div className="message__bubble">
              <div className = "message__typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
              { text && <p className="message__text">{text}</p>}
            </div>}
          {attachments.length 
            ? <div className = "message__attachments">
                {attachments.map((item, index) => (
                  <div key = {index} className = "message__attachments-item">
                    <img src={item.url} alt={item.filename}/>
                  </div>
                ))}
              </div>
            : ''
          }
        </div>
        {!isTyping && <span className="message__date">{messageCreatedTime}</span>}
      </div>
        {isMe ? <IconReaded className="message__readed-icon" isReaded={isReaded}/> : ''}
     </div>
     
   </div>
)}

Message.defaultProps = {
  user: {},
  attachments: []
}

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  attachments: PropTypes.array,
  isTyping: PropTypes.bool
}

export default Message