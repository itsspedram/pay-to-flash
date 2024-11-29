import { ethers,BrowserProvider } from 'ethers';
import FlashABI from './FlashABI.json'; // Path to your ABI

// Deployed contract address
const contractAddress = '0xYourDeployedContractAddress';

// Create a contract instance
export function getFlashContract(provider) {
  return new ethers.Contract(contractAddress, FlashABI, provider);
}

export async function getPoint(address, setLoading) {
  try {
    setLoading(true);
    if (!address) throw new Error('Wallet address is required');

    const provider = new BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getFlashContract(signer);

    const tx = await contract.getPoint({ value: ethers.utils.parseEther('1') });
    await tx.wait();
    console.log('Transaction successful');
    // Optionally return data or trigger additional actions
  } catch (err) {
    console.error(err.message);
    throw err; // Re-throw error for further handling in the caller
  } finally {
    setLoading(false);
  }
}
