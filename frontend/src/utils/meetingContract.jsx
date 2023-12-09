import abi from "../../ABI/meeting.json";
import { ethers } from 'ethers';

// Contract address and ABI on Polygon Mumbai
const contractAddress1 = '0xA5Bb567A147020Db4c6D1f11469b586dDFbA9218'; 
const contractABI1 = abi.abi;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const meetingContract = new ethers.Contract(contractAddress1, contractABI1, signer);

async function scheduleMeeting(hostWalletAddress, participantAddress, startTime, amount, roomId) {
  try {
    // Estimate gas cost
    const estimateGas = await meetingContract.estimateGas.scheduleMeeting(hostWalletAddress, participantAddress, startTime, amount, roomId);

    // Send transaction
    const tx = await meetingContract.scheduleMeeting(hostWalletAddress, participantAddress, startTime, amount, roomId, {
      gasLimit: estimateGas.mul(2) // Add some buffer to the gas limit
    });

    // Wait for the transaction to be mined
    await tx.wait();

    console.log('Meeting scheduled successfully!');
  } catch (error) {
    console.error('Error scheduling meeting:', error);
  }
}

// Transfer check
async function transferCheck(roomId, duration) {
  try {
    // Estimate gas cost
    const estimateGas = await meetingContract.estimateGas.transferCheck(roomId, duration);

    // Send transaction
    const tx = await meetingContract.transferCheck(roomId, duration, {
      gasLimit: estimateGas.mul(2) // Add some buffer to the gas limit
    });

    // Wait for the transaction to be mined
    await tx.wait();

    console.log('Transfer check completed successfully!');
  } catch (error) {
    console.error('Error transferring check:', error);
  }
}
