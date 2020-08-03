import React from 'react';
import './Sidebar.scss'
import { TeamOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons'
import { Modal,  Button, Select, Spin, Tooltip, Input } from 'antd'
import  DialogsContainer  from '../../containers/DialogsContainer'

const Sidebar = (
  {
    modalHandleOk, 
    showModal, 
    modalHandleCancel, 
    modalState, 
    usersHandleChange, 
    usersHandleSearch, 
    usersSearchState, 
    message,
    messageHandleChange,
    logout
  }) => {
  const {visible, confirmLoading} = modalState
  const {value, fetching, data} = usersSearchState
  const options = data.map(d => <Select.Option key={d._id}>{d.fullname}</Select.Option>);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div>
          <TeamOutlined  style={{ fontSize: '18px'}}/>
          <span>Список диалогов</span>
        </div>
        <div>
          <Tooltip title="Создать диалог">
          <Button 
            onClick={showModal} 
            className="ant-btn--no-border" 
            form="circle" 
            icon={<FormOutlined 
            style={{ fontSize: '18px'}}/>}
          />
          </Tooltip>
          <Modal
            title="Создание диалога"
            visible={visible}
            onCancel={modalHandleCancel}
            footer={[
              <Button key="back" onClick={modalHandleCancel}>
                Отмена
              </Button>,
              <Button 
                disabled={!value || !message} 
                key="submit" 
                type="primary" 
                loading={confirmLoading} 
                onClick={modalHandleOk}
              >
                Создать
              </Button>,
            ]}
          >
            <Select
              showSearch
              value={value}
              placeholder="Введите username или e-mail пользователя"
              style={{width: '100%'}}
              defaultActiveFirstOption={false}
              notFoundContent={fetching ? <Spin size="small" /> : <span>{'Пользователи не найдены'}</span>}
              showArrow={false}
              filterOption={false}
              onSearch={usersHandleSearch}
              onChange={usersHandleChange}
            >
              {options}
            </Select>
            <div style={{marginTop: '15px'}}>
              <Input.TextArea 
                value={message}
                placeholder="Введите сообщение" 
                autoSize={{ minRows: 3, maxRows: 5 }} 
                onChange={messageHandleChange}
              />
            </div>
          </Modal>
          <Tooltip title="Выйти из аккаунта">
            <Button 
              onClick={logout} 
              className="ant-btn--no-border" 
              form="circle" 
              icon={<LogoutOutlined style={{ fontSize: '18px'}}/>}
            />
          </Tooltip>
        </div>
      </div>
      <div className = "sidebar__dialogs">
        <DialogsContainer/>
      </div>
    </div>
  );
};

export default Sidebar;