import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram } from 'lucide-react';

interface SocialShareProps {
  flushCount: number;
}

export default function SocialShare({ flushCount }: SocialShareProps) {
  const shareMessage = `I've flushed ${flushCount} times on Pay to Flush! Join the DeFi toilet revolution! 🚽💰`;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL, so we'll just copy the message to clipboard
    navigator.clipboard.writeText(shareMessage);
    alert('Message copied! You can now paste it on Instagram.');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Share Your Flush</h2>
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-400 p-3 rounded-full"
          onClick={shareOnTwitter}
        >
          <Twitter className="text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-600 p-3 rounded-full"
          onClick={shareOnFacebook}
        >
          <Facebook className="text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-pink-500 p-3 rounded-full"
          onClick={shareOnInstagram}
        >
          <Instagram className="text-white" />
        </motion.button>
      </div>
    </div>
  );
}

