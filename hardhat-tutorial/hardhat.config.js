require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const ALCHEMY_API_KEY  = process.env.ALCHEMY_API_KEY;

const GOERLI_PRIVATE_KEY1 = process.env.GOERLI_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY1]
    }
  }
};