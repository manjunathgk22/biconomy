import React from 'react'

export const TYPE={
  OUTLINE: 'outline',
  FLAT: 'flat'
}
function Button({type=TYPE.FLAT, text, onClick=()=>{}}) {
  return (
    <div onClick={onClick} className={`btn pointer ${type} padding-md text-white br5`}>
      {text}
    </div>
  )
}

export default Button
