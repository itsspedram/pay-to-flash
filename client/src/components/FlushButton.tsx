import { motion } from 'framer-motion'

interface FlushButtonProps {
  onClick: () => void
  disabled: boolean
}

export default function FlushButton({ onClick, disabled }: FlushButtonProps) {
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
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? '🚫 Out of Order' : '💦 Flush Your Fortune!'}
    </motion.button>
  )
}

