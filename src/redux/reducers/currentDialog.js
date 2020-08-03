const initialState = {
  items: null,
  loading: false,
  currentDialog: null
}

const handlers = {
  SET_LOADING: (state, isLoading) => ({...state, loading: isLoading }),
  SET_CURRENT_DIALOG: (state, payload) => ({...state, loading: false, items: payload}),
  CLEAR_CURRENT_DIALOG: () => (initialState),
  ADD_MESSAGE: (state, payload) => ({...state, items: [...state.items, payload]}),
  SET_CURRENT_DIALOG_ID: (state, payload) => ({...state, currentDialog: payload}),
  UPDATE_IS_READED: (state, {dialogId, myId}) => ({...state, items: state.items.map(message => {
    if(message.dialog._id === dialogId && message.user._id === myId) {
      message.isReaded = true
    }
    return message
  })}),
  DEFAULT: state => state
}

export default (state = initialState, { type, payload }) => {
  const handle = handlers[type] || handlers.DEFAULT
  return handle(state, payload)
}