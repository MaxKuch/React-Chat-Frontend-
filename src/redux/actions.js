import { dialogsListAPI, messagesAPI, userAPI } from '../utils/api'
import openNotification from '../utils/helpers/openNotification'
import io from 'socket.io-client'
import config from '../configs'

export const dialogsActions = {
  setDialogs: items => ({
    type: 'DIALOGS_SET_ITEMS',
    payload: items
  }),
  addDialog: dialog => ({
    type: 'ADD_DIALOG',
    payload: dialog
  }),
  clearDialogs: () => ({
    type: 'CLEAR_DIALOGS'
  }),
  setPartnerStatus: (partnerId, isOnline) => ({
    type: 'SET_PARTNER_STATUS',
    payload: {
      partnerId, 
      isOnline
    }
  }),
  updateUnreadedCount: (dialogId, unreadedCount) => ({
    type: 'UPDATE_UNREADED_COUNT',
    payload: {
      dialogId, 
      unreadedCount
    }
  }),
  setCurrentDialog: id => (dispatch, getState) => {
    const {user: {data, socket}, dialogs: {dialogs}} = getState()
    const currentDialog = dialogs.filter(dialog => dialog._id === id)[0]
    const partnerId = data._id === currentDialog.author._id ? currentDialog.partner._id : currentDialog.author._id
    socket.emit('DIALOG_ENTERED', {dialog_id: id, partner_id: partnerId})
    dispatch(dialogsActions.updateUnreadedCount(currentDialog._id, 0))
    dispatch({
      type: 'SET_CURRENT_DIALOG_ID',
      payload: id
    })
  },
  updateLastMessage: (dialogId, message) => ({
    type: 'UPDATE_LAST_MESSAGE',
    payload: {
      dialogId, 
      message
    }
  }),
  updateLastMessageReaded: dialogId => ({
    type: 'UPDATE_LAST_MESSAGE_READED',
    payload: dialogId
  }),
  createDialog: (partnerId, message) => (dispatch, getState) => {
    const {user: {data}} = getState()
    return dialogsListAPI.createDialog(data._id, partnerId, message).then(({data}) => {
      dispatch(dialogsActions.addDialog(data))
    })
  },
  fetchDialogs: () => dispatch => {
    return dialogsListAPI.getAllDialogs().then(({data}) => {
      if(data.length)
        dispatch(dialogsActions.setDialogs(data))
    })
  }
}
 
export const currentDialogActions = {
  setMessages: items => ({
    type: 'SET_CURRENT_DIALOG',
    payload: items
  }),
  clearCurrentDialog: () => ({
    type: 'CLEAR_CURRENT_DIALOG'
  }),
  addMessage: message => ({
    type: 'ADD_MESSAGE',
    payload: message
  }),
  updateIsReaded: (dialogId, partnerId) => (dispatch, getState) => {
    const {user: {data}} = getState()
    dispatch({
      type: 'UPDATE_IS_READED',
      payload: {dialogId, myId: data._id}
    })
  },
  sendMessage: text => (dispatch, getState) => {
    const {currentDialog: {currentDialog}} = getState()
    messagesAPI.sendMessage(text, currentDialog)
  },
  setLoading: (isLoading) => ({
    type: 'SET_LOADING',
    payload: isLoading
  }),
  fetchMessages: dialogId => dispatch => {
    dispatch(currentDialogActions.setLoading(true))
    messagesAPI.getAllByDialogId(dialogId).then(({data}) => {
      dispatch(currentDialogActions.setMessages(data || null))
    })
  }
}


export const userActions = {
  setUserData: data => ({
    type: 'USER_SET_DATA',
    payload: data
  }),
  clearUserData: () => (dispatch, getState) => {
    const {user: {socket}} = getState()
    socket.disconnect()
    window.localStorage.clear()
    dispatch({
      type: 'CLEAR_USER_DATA'
    })
  },
  setToken: token => ({
    type: 'SET_TOKEN',
    payload: token
  }),
  setIsAuth: isAuth => ({
    type: 'SET_IS_AUTH',
    payload: isAuth
  }),
  socketCreateConnection: token => ({
    type: 'SOCKET_CREATE_CONNECTION',
    payload: io.connect(`${config.development.API_URL}:${config.development.API_PORT}`, {
      query: {
        token
      }
    })
  }),
  fetchUserData: token => dispatch => {
    userAPI.getMe(token).then(({ data }) => {
      dispatch(userActions.setUserData(data))
    })
  },
  fetchUserLogin:  postData =>  (dispatch, getState) => {
    return userAPI.login(postData).then(({ data }) => {
        const {status, token} = data
        if(status === 'error'){
          openNotification({text: 'Неверный логин или пароль', title: 'Ошибка при авторизации', type: 'error'})
        }
        else{
          openNotification({title: 'Отлично!', text: 'Авторизация успешна', type: 'success'})
          window.localStorage.token = token
          const {user: {socket}} = getState()
          dispatch(userActions.socketCreateConnection(token))
          dispatch(userActions.setToken(token))
          dispatch(userActions.setIsAuth(true))
          dispatch(userActions.fetchUserData(token))
        }
        return status
      })
  },
  fetchUserRegistration: postData =>  (dispatch, getState)=> {
    return userAPI.register(postData).then(({ data }) => {
        const {status, token} = data
        if(status === 'error'){
          openNotification({text: 'Ошибка при регистрации', title: 'Упс', type: 'error'})
        }
        else{
          openNotification({title: 'Отлично!', text: 'Регистрация прошла успешно', type: 'success'})
          window.localStorage.token = token
          const {user: {socket}} = getState()
          socket.disconnect()
          dispatch(userActions.socketCreateConnection(token))
          dispatch(userActions.setToken(token))
          dispatch(userActions.setIsAuth(true))
          dispatch(userActions.fetchUserData(token))
        }
        return status
      })
  }
}