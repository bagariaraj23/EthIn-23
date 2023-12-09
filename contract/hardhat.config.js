require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-waffle");
require("dotenv").config();

const { POLYGON_API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  networks: {
    mumbai: {
      url: POLYGON_API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
