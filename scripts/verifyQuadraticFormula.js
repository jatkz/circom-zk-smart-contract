const { ethers } = require("hardhat");
const {
  TASK_COMPILE_SOLIDITY_COMPILE,
} = require("hardhat/builtin-tasks/task-names");
const contractJson = require("../artifacts/contracts/QuadraticVerifier.sol/Verifier.json");

async function main() {
  const [signer] = await ethers.getSigners();

  const contractAddress = "0x4cf784B985d9674bdaEa7c320B1027B2f08472A2";

  const contractABI = [
    "function verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[1]) view returns (bool)",
  ];
  const verifier = new ethers.Contract(
    contractAddress,
    contractJson.abi,
    signer
  );

  const sampleInput = {
    x: "2",
  };

  // Generate the proof using snarkjs
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    sampleInput,
    "circuits/quadratic.wasm",
    "circuits/quadratic.zkey"
  );
  // Construct the raw calldata to be sent to the verifier contract
  const rawcalldata = await snarkjs.groth16.exportSolidityCallData(
    proof,
    publicSignals
  );
  jsonCalldata = JSON.parse("[" + rawcalldata + "]");

  const resp = await verifier.verifyProof(
    jsonCalldata[0],
    jsonCalldata[1],
    jsonCalldata[2],
    jsonCalldata[3]
  );

  console.log(resp);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
