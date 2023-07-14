import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import { MetaMaskProvider } from "metamask-react";
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { useEffect, useRef, useState } from "react";
import { createPublicClient, http } from 'viem'
import { mainnet, polygon } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import '@rainbow-me/rainbowkit/styles.css';

import { SessionProvider } from "next-auth/react"

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';





const projectId = '89dcee8edbbce0996e1c57d8f6ff62d2'

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [alchemyProvider({ apiKey: 'yARH1tpi16CXQDsn1-GXF-kt8DFnf6x6' }), publicProvider()],
)
 


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)





function MyApp({ Component, pageProps }) {

  const [ready,setReady] = useState(false);

  useEffect(()=>{
    setReady(true)
  },[])



  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0,
  });

  return (
    ready?
    <>
      
      <Meta title="Home 1" />
      <WagmiConfig config={wagmiConfig}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>
            <UserContext.Provider value={{ scrollRef: scrollRef }}>
              {pid === "/login" ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </UserContext.Provider>
          </MetaMaskProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

     
    </> :<></>
  );
}

export default MyApp;
 // <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />