import tinycolor from 'tinycolor2'

const getCorrectIndex = number => {
  if(number > 255) return number % 255
  if(number < 0) return -number % 255
  return number
}

export default hash => {
  const [r, g, b] = hash.substr(-3, 3).split('').map(char => getCorrectIndex(char.charCodeAt()))
  return {
    color: tinycolor({r, g , b}).lighten(10).saturate(20).toHexString(), 
    lightenColor: tinycolor({r, g , b}).saturate(20).lighten(30).toHexString()
  }
}