import { combineReducers } from 'redux'
import dialogs from './dialogs'
import currentDialog from './currentDialog'
import user from './user'

export default combineReducers({ dialogs, currentDialog, user })