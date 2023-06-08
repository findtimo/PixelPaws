const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PixelPaws", function() {
    it("Should mint and transfer an NFT to someone", async function() {
        const PixelPaws = await ethers.getContractFactory("PixelPaws");
        const pixelpaws = await PixelPaws.deploy();
        await pixelpaws.deployed();

        const recipient = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
        const metadataURI = 'cid/test.png';

        let balance = await pixelpaws.balanceOf(recipient);
        expect(balance).to.equal(0);
        const newlyMintedToken = await pixelpaws.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

        await newlyMintedToken.wait(); 

        balance = await pixelpaws.balanceOf(recipient);
        expect(balance).to.equal(1);

        expect(await pixelpaws.isContentOwned(metadataURI)).to.equal(true);
    });
});