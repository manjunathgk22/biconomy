import {useState} from 'react'
import Button, {TYPE} from './Button'
import Modal from './Modal'

const Popup = ({closeModal}) => {
  const [favCoin, setfavCoin] = useState("USDC")
  const handleChange = ({target})=>{
    console.log(target)
    const {value} = target
    setfavCoin(value)
    console.log(value)
  }
  return (
    <Modal>
      <div className="dark-bg text-white padding-md br5">
        <div className="f space-between align-center">
          <div />
          <h3>Select Tokens to pay gas fees</h3>
          <div className="pointer" onClick={closeModal} style={{padding: 5, marginLeft: 20}}>X</div>
        </div>
        <div className="padding-md flex space-between" style={{width: 300}}>
          <Button text={"Ether"} onClick={closeModal} type={TYPE.OUTLINE} />
          <Button text={'Stable Coin'} onClick={() => { }} />
        </div>
        <div className="white-border padding-md br5">
          <div className="flex space-between padding-md">
            <div><input onChange={handleChange} type="radio" id="USDC" name="fav_coin" value="USDC" />
              <label for="USDC">USDC</label></div>
            <div><input onChange={handleChange} type="radio" id="USDT" name="fav_coin" value="USDT" />
              <label for="USDT">USDT</label></div>
            <div><input onChange={handleChange} type="radio" id="DAI" name="fav_coin" value="DAI" />
              <label for="DAI">DAI</label></div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Popup
