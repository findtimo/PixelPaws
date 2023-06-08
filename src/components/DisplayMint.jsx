import { useState, useEffect } from 'react';
import { ethers} from 'ethers';
import PixelPaws from '../artifacts/contracts/PixelPaws.sol/PixelPaws.json';
import { Box, Button, Flex, Image, Link, Spacer, Text, Input } from '@chakra-ui/react';

const DisplayMint = ({accounts, setAccounts, toggleComponent}) => {
    const isConnected = Boolean(accounts[0]);
    const [nftList, setNFTList] = useState([]);
    const [nftImages, setNFTImages] = useState([]);
    const baseURI = 'https://gateway.pinata.cloud/ipfs/';
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

    useEffect(() => {
        const fetchNFTs = async () => {
          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, PixelPaws.abi, signer);
            const address = await signer.getAddress();
            const ownedMints = await contract.getOwnedMints(address);
            const ownedMints1 = ownedMints.map((nftCid) => `${baseURI}${nftCid}`);
            
            setNFTList(ownedMints1);
          } catch (error) {
            console.error('Error fetching NFTs:', error);
          }
        };
    
        fetchNFTs();
      }, [CONFIG]);

      useEffect(() => {
        const fetchNFTImages = async () => {
          try {
            const responses = await Promise.all(nftList.map((nftUrl) => fetch(nftUrl)));
            const jsonResponses = await Promise.all(responses.map((response) => response.json()));
            const nftImages = jsonResponses.map((data) => data.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"));
            setNFTImages(nftImages);
            console.log(nftImages.length);
          } catch (error) {
            console.error('Error fetching NFT images:', error);
          }
        };
    
        fetchNFTImages();
      }, [nftList]);
    
    

    return (
      <Flex justify="center" align="center" height="100vh" width="70vw" paddingBottom="10rem">
            { isConnected ? (
              <div style={{ width: '100%'}}>
                {(nftImages.length != 0) ? (
                  <div className="horizontal-scroll-container">
                      {nftImages.map((image, index) => (
                        <ul className="nft-list">
                          <img key={index} src={image} alt={`NFT ${index + 1}`} style={{borderRadius: '10px', width: '17rem', height: '17rem', marginRight: '1em'}} />
                        </ul>
                      ))}
                  </div>
                  ) : (
                    <div className="placeholder-div" style={{paddingBottom: '3rem'}}>No NFT images available</div>
                  )
                }

                <Flex align="center" justify="center">
                  <div>
                    <Text>
                      <a href='https://testnets.opensea.io/collection/pixelpaws' target='_blank'> View on Opensea! </a>
                    </Text>
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
                      onClick={toggleComponent}>Go back to Mint!
                  </Button>
                  </div>
              </Flex>
            </div>
            ) : (
                <p>You must be connected to Mint to show your collection.</p>
            )
            }
        </Flex>
    );
}

export default DisplayMint;