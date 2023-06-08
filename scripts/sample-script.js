const hre = require("hardhat");

async function main() {

    const PixelPaws = await ethers.getContractFactory("PixelPaws");
    const pixelpaws = await PixelPaws.deploy();

    await pixelpaws.deployed();

    console.log("PixelPaws deployed to:", pixelpaws.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });