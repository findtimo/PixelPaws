import { useState, useEffect } from 'react';
import { ethers, BigNumber} from 'ethers';
import { Box, Button, Flex, Image, Link, Spacer, Text, Input } from '@chakra-ui/react';
import PixelPaws from '../artifacts/contracts/PixelPaws.sol/PixelPaws.json';

const MainMint = ({accounts, setAccounts, toggleComponent}) => {
    const [mintAmount, setMintAmount] = useState(0);
    const isConnected = Boolean(accounts[0]);
    const [CONFIG, SET_CONFIG] = useState({
      CONTRACT_ADDRESS: "",
      SCAN_LINK: "",
      NETWORK: {
        NAME: "",
        SYMBOL: "",
        ID: 0,
      },
      NFT_NAME: "",
      SYMBOL: "",
      MAX_SUPPLY: 1,
      WEI_COST: 0,
      PRICE: 0,
      DISPLAY_COST: 0,
      GAS_LIMIT: 0,
      MARKETPLACE: "",
      MARKETPLACE_LINK: "",
    });

    const getConfig = async () => {
        const configResponse = await fetch("/config/config.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        });
        const config = await configResponse.json();
        SET_CONFIG(config);
    };

    useEffect(() => {
        getConfig();
    }, []);

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();    // get the end user
            const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, PixelPaws.abi, signer);   // get the smart contract

            const getMintedStatus = async () => {
                const result = await contract.getOwnedMints(signer.getAddress());
                console.log(result)
            };

            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    // from: signer.getAddress(),
                    // to: CONFIG.CONTRACT_ADDRESS,
                    value: ethers.utils.parseEther((CONFIG.PRICE*BigNumber.from(mintAmount)).toString()),
                    // gasLimit: String(CONFIG.GAS_LIMIT * BigNumber.from(mintAmount)),
                  });
                console.log(response);
                getMintedStatus();
            } catch (err){
                console.log(err);
            }
        };
    }

    const handleDecrement = () => {
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if(mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="10rem">
            <Box width="36vw">
                <Box paddingBottom="3em">
                    <div>
                        {/* <Text fontSize="3em" textShadow="0 5px #000000">PixelPaws</Text> */}
                        <Text fontSize="1.4em" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #000000">
                            Experience a whimsical universe where your pets transform into valiant heroes. 
                            Join them in a vibrant digital realm and unleash your creativity to save the world!
                        </Text>
                        <Text fontSize="1em" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #000000">
                            Created as an NFT initiative project by Timothy Koh.
                        </Text>
                    </div>
                </Box>

            { isConnected ? (
                <div>
                    <p>Save the world!</p>
                    <Flex align="center" justify="center">
                        <div>
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="10px"
                                onClick={handleDecrement}>-</Button>
                            <Input readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                marginTop="10px"
                                type="number" value={mintAmount} />
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="10px"
                                onClick={handleIncrement}>+</Button>
                        </div>
                    </Flex>
                    <Flex align="center" justify="center">
                      <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleMint}>Mint now!
                        </Button>
                    </Flex>
                    <Flex align="center" justify="center">
                        <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            fontSize="0.6em"
                            onClick={toggleComponent}>Show Collection
                        </Button>
                    </Flex>
                </div>
            ) : (
                <p>You must be connected to Mint. {CONFIG.NETWORK.NAME} Network.</p>
            )
            }
            </Box>
        </Flex>
    );
}

export default MainMint;