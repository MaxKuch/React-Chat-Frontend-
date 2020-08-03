import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import Dialog from '../components/Dialog'
import { currentDialogActions, dialogsActions } from '../redux/actions'

const CurrentDialogContainer = (
  {
    me, 
    isLoading, 
    socket, 
    dialogId, 
    dialogs, 
    messages, 
    fetchMessages, 
    addMessage, 
    updateIsReaded, 
  }) => {

  const [partner, setPartner] = useState({})
  const [isPartnerTyping, setIsPartnerTyping] = useState(false)
  const [partnerLastSeen, setPartnerLastSeen] = useState()
  const ref = useRef(null)
  const intervalId = useRef(null)
  const timeoutId = useRef(null)

  useEffect(() => {
    if(me && dialogs && dialogId){
      const {author, partner} = dialogs.filter(dialog => dialog._id === dialogId)[0]
      setPartner(author._id === me._id ? partner : author)
    }
  }, [dialogs, dialogId, me])

  useEffect(() => {
    clearInterval(intervalId.current)
    if(!isEmpty(partner) && !partner.isOnline){
      setPartnerLastSeen(formatDistanceToNow(
          new Date(partner.last_seen), 
          { addSuffix: true, locale: ru }
        )
      )
      intervalId.current = setInterval(() => {
        setPartnerLastSeen(formatDistanceToNow(
            new Date(partner.last_seen), 
            { addSuffix: true, locale: ru }
          )
        )
      }, 60000)
    }
    return () => {
      clearInterval(intervalId.current)
    }
  }, [dialogs, partner])

  useEffect(() => {
    if(dialogId)
      fetchMessages(dialogId)
    socket.on('SERVER:MESSAGE_CREATED', onMessageCreatedHandler)
    socket.on('MESSAGE_TYPING', onMessageTyping)
    socket.on('SERVER:MESSAGES_READED', onMessageReadedHandler)
    socket.on('USER_DISCONNECTED', onUserDisconnected)
    return () => {    
      socket.removeListener('SERVER:MESSAGE_CREATED', onMessageCreatedHandler)
      socket.removeListener('USER_DISCONNECTED', onUserDisconnected)
      socket.removeListener('MESSAGE_TYPING', onMessageTyping)
      socket.removeListener('SERVER:MESSAGE_READED', onMessageReadedHandler)
    }
  }, [dialogId, partner, me])

  useEffect(() => {
    if(ref.current)
      ref.current.scrollTo(0, 9999999)
  }, [messages])

  const onUserDisconnected = userId => {
    if(dialogId && userId === partner._id)
      setPartnerLastSeen(formatDistanceToNow(
          new Date(partner.last_seen), 
          { addSuffix: true, locale: ru } 
        )
      )
  }
  
  const onMessageReadedHandler = ({dialog_id, partner_id}) => {
    if(me && dialogId === dialog_id && partner_id === me._id){
      updateIsReaded(dialog_id)
    }
  }

  const onMessageCreatedHandler = msg => {
    if(dialogId && me && dialogId === msg.dialog._id){
      if( me && msg.user._id !== me._id) {
        setIsPartnerTyping(false)
        clearTimeout(timeoutId.current)
        addMessage(msg)
        let {author, partner} = dialogs.filter(dialog => dialog._id === dialogId)[0]
        partner = author._id === me._id ? partner : author
        socket.emit('DIALOG_ENTERED', {dialog_id: dialogId, partner_id: partner._id})
      }   
    }
  }

  const onMessageTyping = (({user, dialogId: typingDialogId}) => {
    if(me._id !== user._id && dialogId === typingDialogId && !isPartnerTyping){
      clearTimeout(timeoutId.current)
      setIsPartnerTyping(true)
      if(ref.current)
        ref.current.scrollTo(0, 9999999)
      timeoutId.current = setTimeout(() => {setIsPartnerTyping(false)}, 2000)
    }
  })
  
  return (
    <Dialog partner={partner} blockRef = {ref} typing={isPartnerTyping} partnerLastSeen={partnerLastSeen} isLoading = {isLoading} messages={messages}/>
  );
};

export default connect(({ currentDialog, dialogs, user }) =>  {
  return { me: user.data, socket: user.socket, dialogId: currentDialog.currentDialog, dialogs: dialogs.dialogs, messages: currentDialog.items, isLoading: currentDialog.loading}
},  {...currentDialogActions, ...dialogsActions})(CurrentDialogContainer);