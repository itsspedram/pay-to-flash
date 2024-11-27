import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Achievements</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-2">{achievement.icon}</div>
            <h3 className="text-lg font-semibold text-white">{achievement.name}</h3>
            <p className="text-sm text-white/70">{achievement.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

