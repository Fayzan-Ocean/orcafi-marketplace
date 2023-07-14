import { useDispatch } from "react-redux";
import { walletModalShow } from "../../redux/counterSlice";
import { useMetaMask } from "metamask-react";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import useUserManagement from "../../hooks/user/useUserManagement";
import { useEffect } from "react";
import { useWeb3Modal } from '@web3modal/react'


export default function WalletButton() {
  const dispath = useDispatch();
  const { address, isConnecting, isDisconnected } = useAccount()
  const { loading, error, addUser, removeUser } = useUserManagement();
  const { open, close } = useWeb3Modal()


  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 

  useEffect( ()=>{
    if(address){
      console.log(new Date)
       addUser({wallet:address})
    }
    

  },[address])

  if (isDisconnected)
    return (
      <button
        onClick={ open}
        className="js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          className="h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
        </svg>
      </button>
    );

  if (isConnecting) return <div>Connecting...</div>;



  return null;
}
