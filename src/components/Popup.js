import {useState} from 'react'

import Button, {COLOR, TYPE} from './Button'
import Modal from './Modal'
import {ethers} from "ethers";
import Constant from '../constant/Constant';

const Popup = ({closeModal}) => {
  const [favCoin, setfavCoin] = useState("USDC")
  const [loading, setloading] = useState(false)
  const [approve, setapprove] = useState(false)


  const handleChange = ({target}) => {
    const {value} = target
    setfavCoin(value)
  }


  const approveContract = async () => {
    setloading(true)
    let abi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]

    const signer1 = Constant.provider.getSigner()

    let contract = new ethers.Contract('0x6043fD7126e4229d6FcaC388c9E1C8d333CCb8fA', abi, signer1)
    try {
      const res = await contract.approve("0xbc4de0Fa9734af8DB0fA70A24908Ab48F7c8D75d", 1)

      const notificationObject = {
        eventCode: "dbUpdate",
        type: "success",
        message: "Successfully approved"
      }
      Constant.notify.notification(notificationObject)
      setapprove(true)
    } catch (error) {
      const notificationObject = {
        eventCode: "dbUpdate",
        type: "error",
        message: "Approve failed"
      }
      Constant.notify.notification(notificationObject)
      return
    } finally {
      setloading(false)
    }

  }
  const notifyProceed = () => {
    const notificationObject = {
      eventCode: "dbUpdate",
      type: "success",
      message: "Successfully transferred"
    }
    Constant.notify.notification(notificationObject)
    closeModal()
  }
  return (
    <Modal>
      <div className="white-bg text padding-md br5 popup-width" style={{paddingBottom:40}}>
        <div className="f space-between align-center">
          <div />
          <h3>Select Tokens to pay gas fees</h3>
          <div className="pointer cross" onClick={closeModal}>X</div>
        </div>
        <div className="padding-md flex justify-center margin-auto" >
          <Button text={"Ether"} onClick={closeModal} type={TYPE.OUTLINE} />
          <div style={{marginLeft: 20}}>
            <Button text={'Stable Coin'} onClick={() => { }} />
          </div>
        </div>
        <div className="border padding-md br5 flex-column justify-center align-center margin-auto" style={{maxWidth: 350}}>
          <div className="flex space-between padding-md">
            <div className="mr-md">
              <label className="radio-container">USDC
                <input onChange={handleChange} value="USDC" type="radio" defaultChecked name="fav_coin" />
                <span className="radio-checkmark"></span>
              </label>
            </div>
            <div className="mr-md">
              <label className="radio-container">USDT
                <input onChange={handleChange} type="radio" id="USDT" name="fav_coin" value="USDT" />
                <span className="radio-checkmark"></span>
              </label>
            </div>
            <div className="mr-md">
              <label className="radio-container">DAI
                <input onChange={handleChange} type="radio" id="DAI" name="fav_coin" value="DAI" />
                <span className="radio-checkmark"></span>
              </label>

            </div>
          </div>
          <div>
            {
              approve ? <div className="padding-md">
                <p>
                  Estimated transaction Fee: <span className="semi-bold">5.67 USDC</span>
                </p>
                <div className="flex align-center">
                  <Button text={"Cancel"} onClick={closeModal} type={TYPE.OUTLINE} />
                  <div style={{marginLeft: 20}}>
                    <Button text={'Proceed'} onClick={notifyProceed} color={COLOR.YELLOW} />
                  </div>
                </div>
              </div> : <div className="padding-md flex-column align-center">

                <div>
                  <p className="text text-center">Give approval to Biconomy ERC-20 Forwardr Contract, so it can deduct transaction fee in selected token.</p>
                </div>
                <Button color={COLOR.YELLOW} Loading={loading} text={"Approve"} onClick={approveContract} />
              </div>
            }

          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Popup
