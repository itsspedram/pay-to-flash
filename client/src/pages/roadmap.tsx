import { NextPage } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Rocket, Users, Gamepad2, TrendingUp, Recycle } from 'lucide-react'

const roadmapItems = [
  {
    phase: "Phase 1: Foundation (Q2 2024)",
    title: "Launch & Infrastructure",
    icon: Rocket,
    items: [
      { text: "Token Launch (Pay to Flush Token)", icon: "✨" },
      { text: "Smart Contract Audit (No leaks in our code!)", icon: "🔐" },
      { text: "Website Launch with Interactive Toilet Game", icon: "🌐" },
      { text: "Initial DEX Listing (Flush your savings here!)", icon: "💼" },
      { text: "Community Building (Discord, Twitter, Telegram)", icon: "🤝" },
    ]
  },
  {
    phase: "Phase 2: Growth (Q3 2024)",
    title: "Community & Engagement",
    icon: Users,
    items: [
      { text: "Community DAO Launch (Democracy in the bathroom)", icon: "🏃‍♂️" },
      { text: "Staking Rewards Program (Earn while you sit!)", icon: "🎁" },
      { text: "Strategic Partnerships (Toilet paper brands, anyone?)", icon: "🤝" },
      { text: "Exclusive NFT Collections (Digital toilet art)", icon: "🎨" },
    ]
  },
  {
    phase: "Phase 3: Expansion (Q4 2024)",
    title: "Ecosystem Development",
    icon: Gamepad2,
    items: [
      { text: "Mobile App Launch (Flush on the go!)", icon: "📱" },
      { text: "Multi-Chain Integration (Spread the flush)", icon: "🌍" },
      { text: "Mini-Games Ecosystem (Toilet-themed fun)", icon: "🎮" },
      { text: "Tournament System (The ultimate flush-off)", icon: "🏆" },
    ]
  },
  {
    phase: "Phase 4: Innovation (Q1-Q2 2025)",
    title: "Advanced Features",
    icon: TrendingUp,
    items: [
      { text: "3D Metaverse Integration (Virtual toilet world)", icon: "🎮" },
      { text: "AI-Powered Features (Smart toilets are here)", icon: "🤖" },
      { text: "Major Exchange Listings (Flush with the big boys)", icon: "🤝" },
      { text: "Global Marketing Campaign (Flush heard 'round the world)", icon: "🌍" },
    ]
  },
  {
    phase: "Phase 5: Sustainability (Q3-Q4 2025)",
    title: "Long-term Growth",
    icon: Recycle,
    items: [
      { text: "Real-World Utility Expansion (Beyond the bathroom)", icon: "📈" },
      { text: "Environmental Initiatives (Save water, earn tokens)", icon: "🌱" },
      { text: "Community-Led Development (You decide the future)", icon: "👥" },
      { text: "Global Events & Meetups (Flush-Con 2025, anyone?)", icon: "🌍" },
    ]
  }
]

const RoadmapPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            🚽 Pay to Flush Roadmap 2024-2025
          </h1>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 transform -translate-x-1/2" />
            
            {roadmapItems.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className="flex items-center mb-4 justify-center md:justify-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <phase.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-bold text-purple-400">{phase.phase}</h2>
                        <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <span className="text-2xl mr-2">{item.icon}</span>
                          <span className="text-white/80">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Circle on the timeline */}
                <div className="absolute left-1/2 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 transform -translate-x-1/2" />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">🎯 Key Metrics & Goals</h2>
              <ul className="space-y-2 text-white/80">
                <li>👥 User Base: 100K by end of 2024 (That's a lot of toilets!)</li>
                <li>🏃‍♂️ Daily Active Users: 25K by Q4 2024 (Flush addicts unite!)</li>
                <li>🎨 NFT Collections: 5 unique collections (Digital toilet art for everyone)</li>
                <li>🌍 Community Size: 
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>Discord: 50K members (The largest toilet-talk forum)</li>
                    <li>Twitter: 100K followers (Trending toilets, anyone?)</li>
                    <li>Telegram: 30K members (Instant flush updates)</li>
                  </ul>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-purple-400 mb-4">💰 Tokenomics Distribution</h2>
              <ul className="space-y-2 text-white/80">
                <li>30% - Community Rewards (Flush and earn!)</li>
                <li>20% - Development Fund (Building better toilets)</li>
                <li>15% - Marketing (Spreading the word, one flush at a time)</li>
                <li>15% - Team & Advisors (Toilet experts unite)</li>
                <li>10% - Liquidity Pool (Keep the flushes flowing)</li>
                <li>10% - Treasury (For rainy days and clogged pipes)</li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/80 text-lg italic">
              Remember, in the world of Pay to Flush, every flush counts! 
              Are you ready to join the revolution and make your toilet time profitable?
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RoadmapPage

