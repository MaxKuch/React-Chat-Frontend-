const initialState = {
  dialogs: [], 
}

const handlers = {
  DIALOGS_SET_ITEMS: (state, payload) => ({...state, dialogs: payload}),
  CLEAR_DIALOGS: () => (initialState),
  ADD_DIALOG: (state, payload) => ({...state, dialogs: [...state.dialogs, payload]}),
  UPDATE_LAST_MESSAGE: (state, {dialogId, message}) => 
    ({...state, 
      dialogs: state.dialogs.map(dialog => {
        if(dialogId === dialog._id) {
          dialog.lastMessage = message
        }
        return dialog
      })
    }),
  UPDATE_LAST_MESSAGE_READED: (state, payload) => 
    ({...state, dialogs: state.dialogs.map(dialog => {
        if(payload === dialog._id) {
          dialog.lastMessage.isReaded = true
        }
        return dialog
      })
    }),
  UPDATE_UNREADED_COUNT: (state, {dialogId, unreadedCount}) => 
  ({...state, dialogs: state.dialogs.map(dialog => {
      if(dialogId === dialog._id) {
        dialog.unreaded = unreadedCount
      }
      return dialog
    })
  }),
  SET_PARTNER_STATUS: (state, {partnerId, isOnline}) => 
  ({...state, dialogs: state.dialogs.map(dialog => {
      if(partnerId === dialog.author._id){
        dialog.author.isOnline = isOnline
        dialog.author.last_seen = new Date().toISOString()
      }
      if(partnerId === dialog.partner._id){
        dialog.partner.isOnline = isOnline
        dialog.partner.last_seen = new Date().toISOString()
      }
      return dialog
    })
  }),
  DEFAULT: state => state
}

export default (state = initialState, { type, payload }) => {
  const handle = handlers[type] || handlers.DEFAULT
  return handle(state, payload)
}