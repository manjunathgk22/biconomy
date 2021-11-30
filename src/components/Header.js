import React from 'react'
import Constant from '../constant/Constant';

const Header = ({account, balance, ...props}) => {
  return (
    <div className={`text-dark flex justify-end padding-md space-between dark-bg text-white`}>
      <div />
      <div>ID: {Constant.isMobile ? account.substring(0,10) + '...': account}</div>
      <div>Balance: {balance}</div>
    </div>
  )
}

export default Header
