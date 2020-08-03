import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux'
import { dialogsActions } from '../redux/actions'
import Dialogs from '../components/Dialogs'

const DialogsContainer = ({ 
    me, 
    dialogs, 
    socket,
    currentDialogId, 
    updateLastMessage,  
    updateLastMessageReaded, 
    setCurrentDialog, 
    fetchDialogs, 
    addDialog, 
    updateUnreadedCount, 
    setPartnerStatus
  }) => {
  const [inputValue, setValue] = useState()
  const [filtered, setFiltered] = useState(dialogs)
  const timeoutId = useRef(null)

  const onChangeInput = value => {
    setFiltered(dialogs.filter(dialog => {
      const partner = me._id === dialog.partner._id ? 'author' : 'partner'
      return dialog[partner].fullname.toLowerCase().indexOf(value) >= 0 
    }))
    setValue(value)
  }

  useEffect(() => {
    if(!dialogs.length)
      fetchDialogs()
    else setFiltered(dialogs)
  }, [dialogs])

  useEffect(() => {
    socket.on('SERVER:DIALOG_CREATED', onDialogCreated)
    socket.on('SERVER:MESSAGES_READED', onMessageReadedHandler)
    return () => {
      socket.removeListener('SERVER:MESSAGE_READED', onMessageReadedHandler)
      socket.removeListener('SERVER:DIALOG_CREATED', onDialogCreated)
    }
  }, [me, currentDialogId])

  useEffect(() => {
    socket.on('USER_CONNECTED', onUserConnected)
    socket.on('USER_DISCONNECTED', onUserDisconnected)
    socket.on('SERVER:MESSAGE_CREATED', onMessageCreatedHandler)
    socket.on('MESSAGE_TYPING', onMessageTyping)
    return () => {
      socket.removeListener('USER_CONNECTED', onUserConnected)
      socket.removeListener('USER_DISCONNECTED', onUserDisconnected) 
      socket.removeListener('SERVER:MESSAGE_CREATED', onMessageCreatedHandler)
      socket.removeListener('MESSAGE_TYPING', onMessageTyping)
    }
  }, [me, dialogs, currentDialogId, filtered])

  const onMessageCreatedHandler = msg => {
    setPartnerTyping(false, msg.dialog._id)
    clearTimeout(timeoutId.current)
    if(currentDialogId !== msg.dialog._id && me._id !== msg.user._id){
      for(let dialog of dialogs ){
        if(dialog._id === msg.dialog._id){
          updateUnreadedCount(msg.dialog._id, msg.dialog.unreaded++)
        }
      }
    }
    if(me && msg.dialog.author === me._id || msg.dialog.partner === me._id)
      updateLastMessage(msg.dialog._id, msg) 
  }

  const onMessageReadedHandler = ({dialog_id, partner_id}) => {
    if(me && partner_id === me._id)
      updateLastMessageReaded(dialog_id)
  }

  const onDialogCreated = dialog => {
    if(me && me._id === dialog.partner._id){
      addDialog(dialog)
    }
  }

  const onUserConnected = userId => {
    setPartnerStatus(userId, true)
  }
  const onUserDisconnected = userId => {
    setPartnerStatus(userId, false)
  }

  const setPartnerTyping = (isTyping, dialogId) => {
    console.log(filtered)
    setFiltered(filtered.map((dialog => {
      if(dialogId === dialog._id)
        dialog.isTyping = isTyping
      return dialog
    })))
  }

  const onMessageTyping = ({user, dialogId}) => {
    console.log(filtered)
    if(me && me._id !== user._id){
      clearTimeout(timeoutId.current)
      setPartnerTyping(true, dialogId)
      timeoutId.current = setTimeout(() => {
        setPartnerTyping(false, dialogId)
      }, 2000)
    }
  }

  return (
    <Dialogs 
      me={me} 
      dialogs={filtered} 
      onSearch={onChangeInput} 
      inputValue={inputValue} 
      onSelectDialog={setCurrentDialog}
    />
  );
};

export default connect(({user, dialogs: {dialogs}, currentDialog: {currentDialog} }) => ({dialogs: dialogs, socket: user.socket, currentDialogId: currentDialog, me: user.data}), dialogsActions)(DialogsContainer);