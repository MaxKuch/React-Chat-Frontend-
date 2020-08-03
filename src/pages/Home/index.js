import React from 'react'
import './Home.scss'
import  CurrentDialogContainer  from '../../containers/CurrentDialogContainer'
import  SidebarContainer  from '../../containers/SidebarContainer'

const Home = () => 
  (
    <section className = "home">
      <div className="chat">
        <div className="chat__sidebar">
          <SidebarContainer/>
        </div>
        <div className="chat__dialog">
          <div className = "chat__dialog-messages">
            <CurrentDialogContainer/>
          </div>
        </div>
      </div>
    </section>
  )

export default Home