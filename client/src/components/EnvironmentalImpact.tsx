import { motion } from 'framer-motion';

interface EnvironmentalImpactProps {
  totalDonation: number;
}

export default function EnvironmentalImpact({ totalDonation }: EnvironmentalImpactProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Environmental Impact</h2>
      <motion.div
        className="bg-green-500/20 rounded-lg p-6 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-semibold text-white mb-2">Your Contribution</h3>
        <p className="text-white/80 mb-4">
          Your flushes have contributed {totalDonation.toFixed(2)} ETH to water conservation efforts!
        </p>
        <div className="bg-white/20 rounded p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Did You Know?</h4>
          <p className="text-white/80">
            Every flush in a traditional toilet uses about 1.6 gallons of water. By using water-efficient toilets,
            we can save up to 13,000 gallons of water per year!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

