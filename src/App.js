import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {ethers} from "ethers";
import Notify from "bnc-notify"
import Modal from './components/Modal';
import Header from './components/Header';
import Button, {TYPE} from './components/Button';
import Popup from './components/Popup';

const provider =   new ethers.providers.Web3Provider(window.ethereum, "any");
const signer = provider.getSigner()

let notify
const STATE = {
  LOADING: 'loading',
  ERROR:'error',
  SUCCESS: 'success'
}
function App() {
  const [netowrk, setnetowrk] = useState(null)
  const [account, setaccount] = useState(null)
  const [balance, setbalance] = useState(null)
  const [state, setstate] = useState(STATE.LOADING)
  const [showmodal, setshowmodal] = useState(false)
  
  useEffect(() => {
    debugger
    init()
  }, [])

  const init = async () => {
    provider.on("network", async (newNetwork, oldNetwork) => {
      console.log('network', newNetwork, oldNetwork)
      handleNewNetwork(newNetwork)
      const acc = await provider.listAccounts()
      console.log('====================================');
      console.log(acc);
      console.log('====================================');
      handleNewAccounts(acc)
      notify = Notify({
        dappId: '4638048e-4265-4ff9-8ced-707a8e1d9d71',       // [String] The API key created by step one above
        networkId: newNetwork.chainId  // [Integer] The Ethereum network ID your Dapp uses.
      });
      // const balance = await provider.getBalance("ethers.eth")
      // setbalance(ethers.utils.formatEther(balance))
      const addr = await signer.getAddress()
      const bal = await signer.getBalance()
      console.log('add', addr);
      console.log('bal', ethers.utils.formatEther(bal));
      setbalance(ethers.utils.formatEther(bal))
      if(!acc || !acc.length){
        setstate(STATE.ERROR)
        return
      }
      setstate(STATE.SUCCESS)
      setshowmodal(true)
      // const notificationObject = {
      //   eventCode: "dbUpdate",
      //   type: "pending",
      //   message: "Updating the database with your information"
      // }
      // notify.notification(notificationObject)
    });

  }

  const contract = () => {
    // You can also use an ENS name for the contract address
    const daiAddress = "dai.tokens.ethers.eth";

    // The ERC-20 Contract ABI, which is a common contract interface
    // for tokens (this is the Human-Readable ABI format)
    const daiAbi = [
      // Some details about the token
      "function name() view returns (string)",
      "function symbol() view returns (string)",

      // Get the account balance
      "function balanceOf(address) view returns (uint)",

      // Send some of your tokens to someone else
      "function transfer(address to, uint amount)",

      // An event triggered whenever anyone transfers to someone else
      "event Transfer(address indexed from, address indexed to, uint amount)"
    ];

    // The Contract object
    const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);
    return daiContract
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
  return (
    
      state === STATE.LOADING ? 
        <div className="App f align-center justify-center text-dark">
          <h3>Loading...</h3>
        </div>
        :state === STATE.ERROR ? <div className="App f align-center justify-center text-dark">
        <h3>Etherium is not loaded.</h3>
      </div>: <div className="App f">
        <Header account={account[0]} balance={balance} />
        {showmodal ?<Popup closeModal={closeModal} />:null}
      </div>
    
    
  );
}

export default App;
