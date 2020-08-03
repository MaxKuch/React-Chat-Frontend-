import React from 'react';
import { connect } from 'react-redux'
import InputMessage from '../components/MessageInput'
import { currentDialogActions } from '../redux/actions'



const InputMessageContainer = ({me, dialogId, socket, sendMessage, addMessage }) => {
  
  const handleTyping = () => {
    socket.emit('MESSAGE_TYPING', {user: me, dialogId})
  }
  const inputSubmitHandler = (value) => {
    if(dialogId){
      addMessage(
        {
          text: value, 
          isReaded: false, 
          user: me, 
          createdAt: new Date().toISOString(), 
          dialog: {_id: dialogId}
        }
      )
      sendMessage(value)
    }
  }
    
  return (
    <InputMessage inputSubmitHandler = {inputSubmitHandler} handleTyping={handleTyping}/>
  );
};

export default connect(({user, currentDialog}) =>  (
  {
    me: user.data, 
    socket: user.socket, 
    dialogId: currentDialog.currentDialog
  }),  currentDialogActions)(InputMessageContainer);