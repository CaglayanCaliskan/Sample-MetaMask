import {useState} from 'react';
import {ethers} from 'ethers';
import {
  Web3Modal,
  useConnectModal,
  useAccount,
  useBalance,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
  ConnectButton,
} from '@web3modal/react';
import './App.css';
import {chains, providers} from '@web3modal/ethereum';

function App() {
  const {isOpen, open, close} = useConnectModal();
  const disconnect = useDisconnect();
  const {account} = useAccount();

  const {data, isLoading, refetch} = useBalance({
    addressOrName: account.address,
    watch: true,
  });
  console.log('data', data);

  console.log(account);

  const config = {
    projectId: '2a3b76921352d314e321aa9f1a41d9a2',
    theme: 'dark',
    accentColor: 'default',
    ethereum: {
      appName: 'web3Modal',
      chains: [chains.binanceSmartChainTestnet, chains.binanceSmartChain],
      providers: [
        providers.walletConnectProvider({
          projectId: '2a3b76921352d314e321aa9f1a41d9a2',
        }),
      ],
      autoConnect: true,
    },
  };

  return (
    <div className='App'>
      {!account.isConnected ? (
        <button onClick={open}>connect</button>
      ) : (
        <>
          <h2>Wallet Address: {account.address}</h2>
          Balance Data:{' '}
          {!data ? (
            'Loading...'
          ) : (
            <span>
              {data.formatted} {data.symbol}
            </span>
          )}
          <br />
          <br />
          <button onClick={disconnect} style={{color: 'red'}}>
            disconnect
          </button>
        </>
      )}
      <Web3Modal config={config} />
    </div>
  );
}

export default App;
