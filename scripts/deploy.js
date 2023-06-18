const { ethers } = require("hardhat");
const {
  TASK_COMPILE_SOLIDITY_COMPILE,
} = require("hardhat/builtin-tasks/task-names");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const VerifierFactory = await ethers.getContractFactory(
    "contracts/QuadraticVerifier.sol:Verifier"
  );
  const quadraticVerifier = await VerifierFactory.deploy();

  console.log("Contract address:", await quadraticVerifier.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
