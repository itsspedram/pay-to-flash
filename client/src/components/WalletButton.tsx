import { motion } from 'framer-motion'

interface WalletButtonProps {
  connected: boolean
  onClick: () => void
}

export default function WalletButton({ connected, onClick }: WalletButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-8 py-4 rounded-full font-bold text-white shadow-lg
        backdrop-blur-sm border border-white/10
        ${connected 
          ? 'bg-green-500/20 hover:bg-green-500/30' 
          : 'bg-blue-500/20 hover:bg-blue-500/30'
        }
        transition-colors duration-300
      `}
      onClick={onClick}
    >
      {connected ? '🧻 Wallet Connected' : '🚰 Connect Wallet'}
    </motion.button>
  )
}

