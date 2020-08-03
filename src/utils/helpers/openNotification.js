import { notification } from 'antd'

export default ({text, title, type = 'info'}) => notification[type]({
  message: title,
  description: text
})