import React from 'react'
import propTypes from 'prop-types'
import  DialogItem  from '../DialogItem'
import orderBy from 'lodash/orderBy'
import { Input, Empty, Spin } from 'antd'
import './Dialogs.scss'


const DialogItems = ({dialogs, me, onSelectDialog}) => {
  if(me){
    return dialogs.length
      ? orderBy(
        dialogs,
        ({lastMessage}) => lastMessage.createdAt,
        ["desc"]
      ).map(dialog => {
        const partner = me._id === dialog.partner._id ? dialog.author : dialog.partner
        return(
          <DialogItem onSelect={onSelectDialog} partner={partner} isTyping={dialog.isTyping || false}  key={dialog._id} id={dialog._id} lastMessage={dialog.lastMessage} unreaded = {dialog.unreaded}/>
      )})
      : <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{height: 80}} 
          description="Диалоги не найдены" 
        />
  }
  return <Spin size="large"/>
}

const Dialogs = ({ me, dialogs, onSearch, inputValue, onSelectDialog }) =>{
  
  return (
  <div className="dialogs">
    <div className="dialogs__search">
      <Input.Search 
        onChange={e => onSearch(e.target.value.toLowerCase())} 
        placeholder="Поиск среди контактов" 
        size="large" 
        value={inputValue}
      />
    </div>
    <DialogItems dialogs={dialogs} me={me} onSelectDialog = {onSelectDialog}/>
  </div>
)}

Dialogs.defaultProps = {
  inputValue: '',
  me: {},
  dialogs: []

}

Dialogs.propTypes = {
  me: propTypes.object, 
  dialogs: propTypes.array, 
  onSearch: propTypes.func,
  inputValue: propTypes.string, 
  onSelectDialog: propTypes.func
}

export default Dialogs