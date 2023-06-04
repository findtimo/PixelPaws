import React from 'react';
import { ethers } from 'ethers';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import LinkedIn from '../assets/icons/linkedin_pixel_logo_icon_181925.png';
import Github from '../assets/icons/github.png';
import Email from '../assets/icons/email_32x32.png';

const NavBar = ({ accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        console.log('Connecting');
        if(window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            console.log(accounts[0]);
            setAccounts(accounts);
            console.log(accounts[0]);
            console.log(setAccounts(accounts));
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">
            {/* {left side} */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link isExternal href="https://findtimo.github.io">
                    <Image src={Github} boxSize="42px" margin="0 15px" />
                </Link>
                <Link isExternal href="https://www.linkedin.com/in/timothykohyj/">
                    <Image src={LinkedIn} boxSize="42px" margin="0 15px" />
                </Link>
                <Link isExternal href="mailto:timothy6110@gmail.com">
                    <Image src={Email} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex>


            <Flex justify="space-around" align="center" width="40%" padding="20px">
            {/* {right side} */}
            <Box margin="0 15px">About</Box>
            <Spacer />
            <Box margin="0 15px">Mint</Box>
            <Spacer />

            {/* {is connected} */}
            {isConnected ? (
                <Box margin="0 15px">Connected</Box>) : (
                    <Button 
                    backgroundColor="#D6517D" 
                    borderRadius="5px" 
                    color="white"
                    padding="15px"
                    margin="0 15px"
                    onClick={connectAccount}>
                        Connect
                    </Button>
                )
            }
            </Flex>
        </Flex>
    )
}


export default NavBar;