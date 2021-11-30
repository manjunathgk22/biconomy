import React from 'react'
import WhiteLoader from './Loader'

export const TYPE={
  OUTLINE: 'outline',
  FLAT: 'flat'
}
export const COLOR = {
  DARK: 'dark',
  WHITE: 'white',
  YELLOW: 'yellow'
}
function Button({color=COLOR.DARK, Loading=false, type=TYPE.FLAT, text, onClick=()=>{}}) {
  return (
    <div onClick={onClick} className={`btn pointer ${type} padding-md text-white br5 ${color}`}>
      {Loading? <WhiteLoader style={{ height: 30, width: 30 }} />  :text}
    </div>
  )
}

export default Button
