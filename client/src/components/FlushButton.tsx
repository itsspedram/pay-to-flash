import { motion } from 'framer-motion'
import {getPoint} from '../utils/flashContract'
import { useState } from 'react'
import { useAccount } from 'wagmi';
interface FlushButtonProps {
  onClick: () => void
  disabled: boolean
}

export default function FlushButton({ onClick, disabled }: FlushButtonProps) {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);  
  
  const handleGetPoint = async () => {
    try {
      await getPoint(address, setLoading);
    } catch (err) {
      console.error('Failed to get points:', err);
    }
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-8 py-4 rounded-full font-bold text-white
        shadow-lg backdrop-blur-sm border border-white/10
        ${disabled 
          ? 'bg-gray-500/20 cursor-not-allowed' 
          : 'bg-purple-500/20 hover:bg-purple-500/30'
        }
        transition-colors duration-300
      `}
      onClick={handleGetPoint}
      disabled={disabled}
    >
      {disabled ? '🚫 Out of Order' : '💦 Flush Your Fortune!'}
    </motion.button>
  )
}

