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
