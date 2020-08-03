const convertCurrentTime = currTime => {
  if(!currTime) return '00:00'
  return `${Math.floor(currTime / 60) >= 10 ? Math.floor(currTime / 60) : '0'+Math.floor(currTime / 60)}:${Math.floor(currTime % 60) >= 10 ? Math.floor(currTime % 60) : '0'+Math.floor(currTime % 60)}`
}

export default convertCurrentTime