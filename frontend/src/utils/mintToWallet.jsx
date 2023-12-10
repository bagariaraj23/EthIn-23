import { ethers } from 'ethers';
import abi from "../../ABI/nftMint.json";

// Contract address and ABI
const contractAddress3 = '0x7F78F424606E4587Dc8C0D983a4293c00269BCc2';
const contractABI3 = abi.abi;

// Create an ethers provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Connect to your contract
const nftContract = new ethers.Contract(contractAddress3, contractABI3, signer);

// Function to mint NFTs
async function mintNFT(quantity) {
    try {
        // Call the mint function on the smart contract
        const tx = await nftContract.mint(quantity);

        // Wait for the transaction to be mined
        await tx.wait();

        console.log('NFT minted successfully!');
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
}

// Example: Mint one NFT when a button is clicked
// document.getElementById('mintButton').addEventListener('click', () => {
//     const quantityToMint = 1; // You can change this to mint multiple NFTs
//     mintNFT(quantityToMint);
// });
