import {useState} from 'react';
import {ethers} from 'ethers';
import {
  Web3Modal,
  useConnectModal,
  useAccount,
  useBalance,
  useDisconnect,
} from '@web3modal/react';
import './App.css';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const {isOpen, open, close} = useConnectModal();
  const {account, isReady} = useAccount();
  const {data, error, isLoading, refetch} = useBalance({
    addressOrName: account.address,
  });
  const disconnect = useDisconnect();

  console.log('account ', account);
  console.log('isReady ', isReady);

  // if (account.address) {
  //   setDefaultAccount(account.address);
  // }

  const config = {
    projectId: '2a3b76921352d314e321aa9f1a41d9a2',
    theme: 'dark',
    accentColor: 'default',
    ethereum: {
      appName: 'web3Modal',
    },
  };

  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  } else {
    console.log('Need install MetaMask!');
  }

  // const connectWalletHandler = () => {
  //   if (window.ethereum) {
  //     window.ethereum
  //       .request({method: 'eth_requestAccounts'})
  //       .then((account) => {
  //         accountChangedHandler(account[0]);
  //       });
  //   } else {
  //     setErrorMessage('Install MetaMask');
  //   }
  // };

  // const accountChangedHandler = (newAccount) => {
  //   setDefaultAccount(newAccount);
  //   setConnButtonText('Connected');
  //   getUserBalance(newAccount);
  // };

  // const getUserBalance = (userAddress) => {
  //   window.ethereum
  //     .request({method: 'eth_getBalance', params: [userAddress, 'latest']})
  //     .then((balance) => {
  //       console.log('balance:', balance);
  //       setUserBalance(ethers.utils.formatEther(balance));
  //     });
  // };

  // const addFooToUserAssets = async (userAddress) => {
  //   try {
  //     const wasAdded = await window.ethereum.request({
  //       method: 'wallet_watchAsset',
  //       params: {
  //         type: 'ERC20',
  //         options: {
  //           address: userAddress,
  //           symbol: 'FOO',
  //           decimals: 18,
  //         },
  //       },
  //     });
  //     if (wasAdded) {
  //       console.log('Token added to MetaMask');
  //     } else {
  //       console.log("Token wasn't added to MetaMask");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className='App'>
      <h2>Ready: {isReady ? 'yes' : 'no'}</h2>
      <h2>is connected: {account.isConnected ? 'Yes' : 'No'}</h2>
      <h2>Connector: {account.connector?.id}</h2>
      <h2>Address: {account.address}</h2>
      <Web3Modal config={config} />
      <button onClick={open}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}

export default App;
