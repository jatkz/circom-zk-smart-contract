require("@nomicfoundation/hardhat-toolbox");
require("hardhat-circom");

if (!process.env.PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY Environment Variable");
}

if (!process.env.SEPOLIA_URL) {
  throw new Error("Please set your SEPOLIA_URL Environment Variable");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.11",
  circom: {
    inputBasePath: "./circuits",
    ptau: "https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_15.ptau",
    circuits: [
      {
        name: "quadratic",
      },
    ],
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
