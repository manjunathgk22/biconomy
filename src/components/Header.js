import React from 'react'

const Header = ({account, balance, ...props}) => {
  console.log('====================================');
  console.log(account, balance);
  console.log('====================================');
  return (
    <div className="text-dark flex justify-end padding-md one-flx space-between dark-bg text-white">
      <div />
      <div>ID: {account}</div>
      <div>Balance: {balance}</div>
    </div>
  )
}

export default Header
