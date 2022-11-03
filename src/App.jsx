import {useState} from 'react';
import {ethers} from 'ethers';
import './App.css';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  // if (typeof window.ethereum !== 'undefined') {
  //   console.log('MetaMask is installed!');
  // }

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({method: 'eth_requestAccounts'})
        .then((account) => {
          accountChangedHandler(account[0]);
        });
    } else {
      setErrorMessage('Install MetaMask');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    setConnButtonText('Connected');
    getUserBalance(newAccount);
  };

  const getUserBalance = (userAddress) => {
    window.ethereum
      .request({method: 'eth_getBalance', params: [userAddress, 'latest']})
      .then((balance) => {
        console.log('balance:', balance);
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  const addFooToUserAssets = async (userAddress) => {
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: userAddress,
            symbol: 'FOO',
            decimals: 18,
          },
        },
      });
      if (wasAdded) {
        console.log('Token added to MetaMask');
      } else {
        console.log("Token wasn't added to MetaMask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function ConnectToPhoneMetaMask() {
    // const origin = window.location.href.replace(/(^\w+:|^)\/\//, '');
    // console.log(origin);
    const metamaskAppDeepLink =
      'https://metamask.app.link/dapp/' + '192.168.1.5:8888';
    return (
      <a href={metamaskAppDeepLink}>
        <button>Connect to MetaMask on Mobile</button>
      </a>
    );
  }

  return (
    <div className='App'>
      <h2>Address: {defaultAccount}</h2>
      <h2>Ballace: {userBalance}</h2>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <br />
      <br />
      <button onClick={() => addFooToUserAssets(defaultAccount)}>
        Add Foo to Assets
      </button>
      <br />
      <br />
      {<ConnectToPhoneMetaMask />}
      <h2 style={{color: 'red'}}>{errorMessage}</h2>
    </div>
  );
}

export default App;
