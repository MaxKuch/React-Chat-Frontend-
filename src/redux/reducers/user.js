import io from 'socket.io-client'
import config from '../../configs'

const initialState = {
  data: null,
  token: window.localStorage.token || '',
  socket: io.connect(`${config.development.API_URL}:${config.development.API_PORT}`, {
    query: {
      token: window.localStorage.token || ''
    }
  }),
  isAuth: !!window.localStorage.token
}

const handlers = {
  USER_SET_DATA: (state, payload) => ({...state, data: payload}),
  CLEAR_USER_DATA: () => ({data: null, token: '', socket: null, isAuth: false}),
  SOCKET_CREATE_CONNECTION: (state, payload) => ({...state, socket: payload}),
  SET_TOKEN: (state, payload) => ({...state, token: payload}),
  SET_IS_AUTH: (state, payload) => ({...state, isAuth: payload}),
  DEFAULT: state => state
}

export default (state = initialState, { type, payload }) => {
  const handle = handlers[type] || handlers.DEFAULT
  return handle(state, payload)
}