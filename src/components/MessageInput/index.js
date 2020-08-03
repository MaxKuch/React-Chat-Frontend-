import React, {useState} from 'react'
import './MessageInput.scss'
import {SendOutlined} from '@ant-design/icons'
import { Button, Input } from 'antd'

function MessageInput({ inputSubmitHandler, handleTyping }) {

  const [value, setValue] = useState()
  return (
    <div className = "message-input">
      <div className="message-input__textarea">
        <Input 
          onChange={e => { setValue(e.target.value)} } 
          onKeyUp = {(e) => {
            if(e.key === "Enter" && e.target.value){
              inputSubmitHandler(value)
              setValue('')
            }
            else
              handleTyping()
          }}
          placeholder="Введите текст сообщения..." 
          size = "large"
          value = {value}/>
      </div>
      <div className="message-input__actions">
        <Button onClick = {() => {
            if(value){
              inputSubmitHandler(value)
              setValue('')
            }
          }} 
          className="ant-btn--no-border" 
          shape="circle" 
          icon={<SendOutlined  
          style = {{fontSize: '20px'}}/>} />
      </div>
    </div>
  );
}

export default MessageInput;