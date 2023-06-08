import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';


import MainMint from './MainMint';
import DisplayMint from './DisplayMint';
import { Box, Button, Flex, Image, Link, Spacer, Text, Input } from '@chakra-ui/react';


import PixelPaws from '../artifacts/contracts/PixelPaws.sol/PixelPaws.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, PixelPaws.abi, signer);

const Home  = ({accounts, setAccounts}) => {
  const [showMainMint, setShowMainMint] = useState(true);

  const toggleComponent = () => {
    setShowMainMint(!showMainMint);
  };

  return (
    <div>

      <Text fontSize="3em" textShadow="0 5px #000000" paddingTop="1em">PixelPaws</Text>
        <Flex justify="center" align="center" height="100vh" paddingBottom="10rem">
        {showMainMint ? (
          <MainMint accounts={accounts} setAccounts={setAccounts} toggleComponent={toggleComponent} />
        ) : (
          <DisplayMint accounts={accounts} setAccounts={setAccounts} toggleComponent={toggleComponent} />
        )}
      </Flex>
    </div>
  );
};


export default Home;