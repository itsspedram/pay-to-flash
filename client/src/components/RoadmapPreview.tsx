import Link from 'next/link'
import { motion } from 'framer-motion'
import { Rocket, Users, Gamepad2, TrendingUp } from 'lucide-react'

const roadmapItems = [
  {
    title: "Launch",
    description: "Token Launch & Infrastructure",
    explanation: "Flush your way into the crypto world with our revolutionary token!",
    icon: Rocket,
    position: "top"
  },
  {
    title: "Community",
    description: "Build & Engage",
    explanation: "Join the most entertaining DAO in the cryptosphere!",
    icon: Users,
    position: "bottom"
  },
  {
    title: "Utility",
    description: "Games & Features",
    explanation: "Earn while you... well, you know. Games that make every second count!",
    icon: Gamepad2,
    position: "top"
  },
  {
    title: "Growth",
    description: "Scale & Expand",
    explanation: "Taking over the world, one flush at a time!",
    icon: TrendingUp,
    position: "bottom"
  }
]

export default function RoadmapPreview() {
  return (
    <section className="w-full max-w-4xl mb-16 relative overflow-hidden">
      <div className="relative p-4 md:p-8 lg:p-12">
        <h2 className="text-3xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
          ChillFlush Roadmap 2024-2025
        </h2>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 transform -translate-y-1/2" />
          
          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col items-center ${
                  item.position === "top" ? "md:pb-16" : "md:pt-16"
                }`}
              >
                {/* Glowing circle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center ${
                    item.position === "top" ? "md:order-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-20 blur-md" />
                  <div className="relative z-10">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                
                {/* Text content */}
                <div className={`mt-4 md:mt-0 text-center ${item.position === "top" ? "md:order-1 md:mb-4" : "md:mt-4"}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-purple-200/80 text-sm mb-2">{item.description}</p>
                  <p className="text-pink-200/70 text-xs italic">{item.explanation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/roadmap" passHref>
            <motion.p
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 hover:from-purple-500/30 hover:via-pink-500/30 hover:to-blue-500/30 rounded-full text-white font-bold transition-colors duration-300 border border-purple-500/20"
            >
              View Full Roadmap
            </motion.p>
          </Link>
        </div>
      </div>
    </section>
  )
}

