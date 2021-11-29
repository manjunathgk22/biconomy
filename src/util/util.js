export const onClickConnect = async () => {
  try {
    const newAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    return newAccounts
  } catch (error) {
    console.error(error)
  }
}