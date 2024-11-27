import { motion } from 'framer-motion';

interface CuteToiletProps {
  isFlushing: boolean;
  onFlushComplete: () => void;
}

export const CuteToilet: React.FC<CuteToiletProps> = ({ isFlushing, onFlushComplete }) => {
  return (
    <svg
      viewBox="0 0 300 400"
      className="w-full max-w-md mx-auto"
    >
      {/* Toilet base */}
      <motion.path
        d="M50 200 Q150 250 250 200 L250 350 Q150 400 50 350 Z"
        fill="#E0F2FE"
        stroke="#38BDF8"
        strokeWidth="4"
        initial={{ y: 0 }}
        animate={{ y: isFlushing ? [0, -10, 0] : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Toilet bowl */}
      <motion.ellipse
        cx="150"
        cy="200"
        rx="90"
        ry="40"
        fill="#F0F9FF"
        stroke="#38BDF8"
        strokeWidth="4"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isFlushing ? [1, 0.9, 1] : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Water */}
      <motion.path
        d="M80 200 Q150 230 220 200 Q150 170 80 200"
        fill="#7DD3FC"
        initial={{ rotate: 0 }}
        animate={isFlushing ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        onAnimationComplete={onFlushComplete}
      />

      {/* Toilet tank */}
      <motion.rect
        x="100"
        y="50"
        width="100"
        height="80"
        rx="10"
        fill="#E0F2FE"
        stroke="#38BDF8"
        strokeWidth="4"
        initial={{ y: 0 }}
        animate={{ y: isFlushing ? [0, -5, 0] : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Flush button */}
      <motion.circle
        cx="150"
        cy="90"
        r="15"
        fill="#38BDF8"
        initial={{ scale: 1 }}
        animate={{ scale: isFlushing ? [1, 0.8, 1] : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Toilet seat */}
      <motion.path
        d="M70 190 Q150 230 230 190 Q150 150 70 190"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isFlushing ? [0, 30, 0] : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Cute face */}
      <motion.g
        initial={{ opacity: 1 }}
        animate={{ opacity: isFlushing ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Eyes */}
        <circle cx="120" cy="180" r="5" fill="#0369A1" />
        <circle cx="180" cy="180" r="5" fill="#0369A1" />
        {/* Smile */}
        <path
          d="M130 200 Q150 220 170 200"
          fill="none"
          stroke="#0369A1"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
};

