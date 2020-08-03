import React, {useState, useEffect} from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { format, isToday, parseISO } from 'date-fns'
import IconReaded from '../IconReaded'
import "./DialogItem.scss"
import Avatar from '../Avatar'

const getMessageTime = created_at => {
  if(isToday(parseISO(created_at))){
    return format(new Date(created_at), 'kk:mm')
  }
  return format(new Date(created_at), 'd.MM.yy')
}

 const DialogItem = (
  { 
    id, 
    partner, 
    unreaded, 
    isTyping, 
    lastMessage, 
    user = lastMessage.user, 
    onSelect 
  }) => {
  const userData = useSelector(({user: {data}}) => data)
  const [isMe, setIsMe] = useState(false)

  useEffect(() => {
    if(userData && user){
      setIsMe(userData._id === user._id)
    }
  }, [userData, user])

  return(
  <div onClick = {onSelect.bind(this, id)} className = {classNames("dialogs__item", {"dialogs__item--online": partner.isOnline})}>
    <div className='dialogs__item-avatar'>
      <Avatar avatarSrc={partner.avatar} hash={partner._id} username={partner.fullname}/>
    </div>
    <div className="dialogs__item-info">
      <div className="dialogs__item-info-top">
        <b className="dialogs__username">{partner.fullname}</b>
        <span className="dialogs__date">
          {getMessageTime(lastMessage.createdAt)}
        </span>
      </div>
      <div className="dialogs__item-info-bottom">
        <p className="dialogs__text">
          {isTyping ? 'печатает...' : `${ isMe ? 'Вы' : partner.fullname}: ${lastMessage.text}`}
        </p>
      </div>
      {isMe ? <IconReaded className="dialogs__readed-icon" isReaded = {lastMessage.isReaded} /> : ''}
      {(!isMe && unreaded) ? <div className="dialogs__count">{unreaded}</div> : ''}
    </div>
  </div>
)}

DialogItem.propTypes = {
  id: propTypes.string, 
  partner: propTypes.object, 
  unreaded: propTypes.number, 
  isTyping: propTypes.bool, 
  lastMessage: propTypes.object, 
  user: propTypes.object, 
  onSelect: propTypes.func
}

export default DialogItem