import { motion } from 'framer-motion';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Top Flushers</h2>
      <div className="bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            className="flex items-center justify-between p-4 border-b border-white/10 last:border-b-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4">{index + 1}</span>
              <span className="text-white">{entry.name}</span>
            </div>
            <span className="text-white font-bold">{entry.score} FLC</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

