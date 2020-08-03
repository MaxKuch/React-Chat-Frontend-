import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { dialogsActions, userActions, currentDialogActions } from '../redux/actions'
import { userAPI } from '../utils/api'


const SidebarContainer = ({createDialog, clearUserData, clearCurrentDialog, clearDialogs, history}) => {

  const [usersSearchState, setUsersSearchState] = useState({
    data: [],
    fetching: false,
    value: undefined,
  }) 
  const [modalState, setModalState] = useState({
    visible: false, 
    confirmLoading: false
  })

  const [message, setMessage] = useState('')

  const messageHandleChange = ({target: { value }}) => {
    setMessage(value)
  }

  const usersHandleSearch = value => {
    if (value) {
      setUsersSearchState({...usersSearchState, fetching: true})
      userAPI.find(value).then((response) => {
        if(response.status === 200){
          setUsersSearchState({...usersSearchState, fetching: false, data: response.data})
        }
      }).catch(err => {
        setUsersSearchState({...usersSearchState, fetching: false})
      });
    } else {
      
      setUsersSearchState({...usersSearchState, data: []})
    }
  };

  const usersHandleChange = value => {
    setUsersSearchState({...usersSearchState, value})
  };

  const showModal = () => {
    setModalState({...modalState, visible: true});
  };

  const modalHandleOk = () => {
    if(usersSearchState.value){
      setModalState({...modalState, confirmLoading: true})
      createDialog(usersSearchState.value, message).then(() => {
        setModalState({visible: false, confirmLoading: false})
        setUsersSearchState({
          data: [],
          fetching: false,
          value: undefined,
        })
        setMessage('')
      })  
    }
  };

  const modalHandleCancel = () => {
    setModalState({...modalState, visible: false});
  };

  const logout = () => {
    clearUserData()
    clearCurrentDialog()
    clearDialogs()
    history.push('/login')
  }

  return (
    <Sidebar 
      showModal={showModal} 
      modalHandleCancel={modalHandleCancel} 
      modalHandleOk={modalHandleOk} 
      modalState={modalState} 
      usersHandleSearch={usersHandleSearch}
      usersHandleChange={usersHandleChange} 
      usersSearchState={usersSearchState}
      messageHandleChange={messageHandleChange}
      message={message}
      logout={logout}
    />
  );
};

export default connect((state) =>  state, 
  {
    ...dialogsActions, 
    ...userActions, 
    ...currentDialogActions
  }
)(withRouter(SidebarContainer));