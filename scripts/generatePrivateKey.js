const { ethers } = require("hardhat");

function generatePrivateKey() {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const publicKey = wallet.publicKey; // compressed public key

  console.log("Generated Private Key:", privateKey);
  console.log("Derived Public Key:", publicKey);
}

generatePrivateKey();
