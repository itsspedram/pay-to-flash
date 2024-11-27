import { motion } from 'framer-motion';

interface StreakProps {
  currentStreak: number;
  bestStreak: number;
}

export default function Streak({ currentStreak, bestStreak }: StreakProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Flush Streak</h2>
      <div className="flex justify-between">
        <motion.div
          className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex-1 mr-4"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Current Streak</h3>
          <p className="text-3xl font-bold text-purple-400">{currentStreak} days</p>
        </motion.div>
        <motion.div
          className="bg-white/10 rounded-lg p-4 backdrop-blur-sm flex-1"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Best Streak</h3>
          <p className="text-3xl font-bold text-blue-400">{bestStreak} days</p>
        </motion.div>
      </div>
    </div>
  );
}

