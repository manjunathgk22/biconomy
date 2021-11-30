import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {ethers} from "ethers";
import Modal from './components/Modal';
import Header from './components/Header';
import Button, {COLOR, TYPE} from './components/Button';
import Popup from './components/Popup';
import Constant from './constant/Constant';
import {setnotif} from './util/util';



function App() {
  const [netowrk, setnetowrk] = useState(null)
  const [account, setaccount] = useState(null)
  const [balance, setbalance] = useState(null)
  const [state, setstate] = useState(Constant.STATE.LOADING)
  const [showmodal, setshowmodal] = useState(false)
  const [errormsg, seterrormsg] = useState("")
  
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    // check for etherium object
    if(!window.ethereum){
      setstate(Constant.STATE.ERROR)
      seterrormsg('Web3 not supported')
    }
    
    Constant.provider.on("network", async (newNetwork, oldNetwork) => {

      handleNewNetwork(newNetwork)

      // set account 
      let acc;
      try {
        acc  = await Constant.provider.listAccounts()
      } catch (error) {
        setstate(Constant.STATE.ERROR)
        seterrormsg('Please connect to Metamask')
        return
      }
      if(!acc || acc.length === 0){
        setstate(Constant.STATE.ERROR)
        seterrormsg('Please connect to Metamask')
        return
      }
      handleNewAccounts(acc)

      // set notification 
      setnotif(newNetwork)

      if(!acc || !acc.length){
        setstate(Constant.STATE.ERROR)
        return
      }

      const bal = await Constant.signer.getBalance()
      setbalance(ethers.utils.formatEther(bal))
      
      setstate(Constant.STATE.SUCCESS)
      setshowmodal(true)
      
    });

  }


  const handleNewNetwork = (addr) => {
    setnetowrk(addr)
  }
  const handleNewAccounts = (acc) => {
    setaccount(acc)
  }
  const closeModal = ()=>{
    setshowmodal(false)
  }
  const openModal = ()=>{
    setshowmodal(true)
  }
  return (
    
      state === Constant.STATE.LOADING ? 
        <div className="App flex-column align-center justify-center text-dark">
          <h3>Connecting to Metamask...</h3>
        </div>
        :state === Constant.STATE.ERROR ? <div className="App f align-center justify-center text-dark">
        <h3>{errormsg}</h3>
      </div>: <div className="App flex-column">
        <Header account={account[0]} balance={balance} />
        {showmodal ?<Popup closeModal={closeModal} />:<div className="flex align-center one-flex"><Button onClick={openModal} color={COLOR.YELLOW} text={'Pay gas fee'} /></div>}
      </div>
    
    
  );
}

export default App;
