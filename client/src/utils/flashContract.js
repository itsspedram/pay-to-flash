import { ethers,BrowserProvider } from 'ethers';
import FlashABI from './FlashABI.json'; 
import gameStore from '@/store/store'





// Deployed contract address
const contractAddress = '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B';

// Create a contract instance
export function getFlashContract(provider) {
  return new ethers.Contract(contractAddress, FlashABI, provider);
}


export async function getPoint(address, setLoading) {
  try {
    setLoading(true);
    if (!address) throw new Error('Wallet address is required');

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getFlashContract(signer);

    const tx = await contract.connect(signer).flush({ value: ethers.parseEther('0.001') });
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





// Function to fetch user data
export async function fetchUserData(userAddress) {
  // Connect to Ethereum
  if (!userAddress) return console.log('Wallet address is required')
    
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Contract instance
  const contract = getFlashContract(signer);
  // Fetch User data
  const [points, totalFlushes, lastFlushTimestamp, comboStreak, lastComboTime] = await contract.users(userAddress);

   const store = gameStore.getState(); // Access the raw store state
  store.setPoints(Number(points));
  store.setTotalFlushes(Number(totalFlushes));
  store.setLastFlushTimestamp(Number(lastFlushTimestamp));
  store.setComboStreak(Number(comboStreak));
  store.setLastComboTime(Number(lastComboTime));


  console.log("User Data:");
  console.log({ points, totalFlushes, lastFlushTimestamp, comboStreak, lastComboTime });

  // Check specific achievement
  // const achievementId = 1; // Example achievement ID
  // const hasAchievement = await contract.checkAchievement(userAddress, achievementId);
  // console.log(`Achievement ${achievementId}:`, hasAchievement);
}






// Function to fetch the leaderboard
export async function fetchLeaderboard() {
  // Connect to Ethereum
  const provider = new BrowserProvider(window.ethereum);
  const signer = provider.getSigner();

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, signer);

  // Call getLeaderboard
  const [addresses, scores] = await contract.getLeaderboard();

  // Combine addresses and scores into a leaderboard array
  const leaderboard = addresses.map((address, index) => ({
    address,
    score: scores[index].toString(), // Convert BigNumber to string
  }));

  console.log("Leaderboard:", leaderboard);
  return leaderboard;
}