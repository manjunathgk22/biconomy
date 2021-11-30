import {ethers} from "ethers";
import {mobileAndTabletCheck} from '../util/util';

const STATE = {
  LOADING: 'loading',
  ERROR_APPROVAL:'error_approval',
  SUCCESS: 'success',
  ERROR: 'error'
}
let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
let signer = provider.getSigner()
export default{
  provider,
  signer,
  notify: {},
  STATE,
  isMobile: mobileAndTabletCheck()
}
