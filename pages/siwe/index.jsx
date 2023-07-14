import { getCsrfToken, signIn, useSession } from "next-auth/react"
import { SiweMessage } from "siwe"
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"

import { InjectedConnector } from 'wagmi/connectors/injected'
import { useEffect, useState } from "react"
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useDisconnect } from "wagmi"

function Siwe() {
  const projectId = '89dcee8edbbce0996e1c57d8f6ff62d2'

  const { signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: w3mConnectors({ projectId, version: 2, chain })
  });
  const { data: session, status } = useSession()


  const loading = status === "loading"
  const { disconnect } = useDisconnect()




  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected"
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      signIn("credentials", {
        message: message,
        redirect: false,
        signature,
        callbackUrl,
      })
    } catch (error) {
   
    }
  }

  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
      handleLogin()
    }
  }, [isConnected])

  return (
   <section className="flex justify-center my-20">  
   
   <button
        onClick={(e) => {
          e.preventDefault()
          if (!isConnected) {
            connect()
          } else {
            handleLogin()
          }
        }}
      >
        Sign-in
      </button>

      <p
          className={`nojs-show `}
        >
          {!session && (
            <>
              <span>
                You are not signed in
              </span>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                 
                />
              )}
              <span >
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
              
                onClick={(e) => {
                  e.preventDefault()
                  disconnect()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      
      
      </section>
    
   
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}



export default Siwe