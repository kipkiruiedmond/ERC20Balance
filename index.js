const Web3 = require("web3");
const { ethers } = require("ethers");
var ERC20Abi = require('./ERC20.json')

// Allows us to connect to a blockchain node without running one
const provider =
  "https://polygon-mumbai.infura.io/v3/INFURAKEYID"

// Infura is a service which you can use to connect to a node



// We instantiate a web3 client (web3js & ethers) with the RPC provider
const web3Client = new Web3(new Web3.providers.HttpProvider(provider));
const ethersClient = new ethers.providers.JsonRpcProvider(provider);
// We set our token address we created yesterday
const tokenAddress = "0x172370d5Cd63279eFa6d502DAB29171933a610AF";
// We set our wallet address
const walletAddress = "0xb4ed960387e67f5354e29ea2dbc31e1ad2de8ff0";
// We instantiate our contract in code so that we can call view and State
const web3contract = new web3Client.eth.Contract(ERC20Abi.abi, tokenAddress);
const ethersContract = new ethers.Contract(tokenAddress, ERC20Abi.abi, ethersClient);

async function getBalanceWeb3() {
  const result = await web3contract.methods.balanceOf(walletAddress).call(); 
  
  const format = web3Client.utils.fromWei(result); 

  console.log("Web3 - " + format);
}

async function getBalanceEthers() {
    const result = await ethersContract.balanceOf(walletAddress); 
    
    const format = ethers.utils.formatUnits(result, 18);

    console.log("Ethers - " + format);
}

getBalanceWeb3();
getBalanceEthers();