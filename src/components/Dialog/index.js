import React from 'react';
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import  Message  from '../Message'
import  MessageInputContainer  from '../../containers/InputMessageContainer'
import { Empty } from 'antd'
import './Dialog.scss'
import { Spin } from 'antd';
import classNames from 'classnames'


const renderMessagesWithCondition = (isLoading, messages, myData) => {
  if(isLoading || !myData){
    return <Spin tip="Загрузка сообщений..." size="large"/>
  }
  else if (!messages){
    return <Empty description="Откройте диалог"/> 
  }
  else if(messages.length === 0){
    return <Empty description="Диалог пуст"/> 
  }
  return messages.map( (message, index) => 
    (
      <Message
        key={index}
        avatar = {message.user.avatar} 
        text={message.text} 
        date={message.createdAt} 
        attachments = {message.attachments}
        user={message.user}
        isMe = {message.user._id === myData._id}
        isReaded = {message.isReaded}
      />
    )
  )
}

const Dialog = (
  {
    blockRef, 
    isLoading, 
    typing, 
    messages, 
    partnerLastSeen, 
    partner 
  }) => {
  const myData = useSelector(({user: {data}}) => data)
  return (
    <div className = "dialog">
      <div className="dialog__header">
        <div className="dialog__header-center">
          <b className="dialog__header-username">{partner.fullname}</b>
          <div className="dialog__header-status">
            {partner.last_seen && <div className = {classNames("status", {"status--online": partner.isOnline})}>{ partner.isOnline ? 'онлайн' : `был(а) в сети ${partnerLastSeen}`}</div>}
          </div>
        </div>
      </div>
      <div ref={blockRef} className = "dialog__messages">
        {renderMessagesWithCondition(isLoading, messages, myData)}
        {messages && <Message isTyping={typing} user={partner} avatar={partner.avatar} isMe={false}/> }
      </div>
      <div className="dialog__input">
        <MessageInputContainer />
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  messages: [],
  partnerLastSeen: 'меньше минуты назад'
}


Dialog.propTypes = {
  blockRef: propTypes.oneOfType([
    propTypes.func, 
    propTypes.shape({ current: propTypes.instanceOf(Element) })
  ]),
  isLoading: propTypes.bool, 
  typing: propTypes.bool, 
  messages: propTypes.array, 
  partnerLastSeen: propTypes.string, 
  partner: propTypes.object
}

export default Dialog;