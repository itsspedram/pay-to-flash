import { NextPage } from 'next'
import Header from '../components/Header'
import Achievements from '../components/Achievements'
import Footer from '../components/Footer'

const mockAchievements = [
  { id: '1', name: 'Bronze Flusher', description: 'Flush 10 times', icon: '🥉' },
  { id: '2', name: 'Silver Flusher', description: 'Flush 50 times', icon: '🥈' },
  { id: '3', name: 'Gold Flusher', description: 'Flush 100 times', icon: '🥇' },
  { id: '4', name: 'Platinum Plunger', description: 'Flush 500 times', icon: '🚽' },
  { id: '5', name: 'Diamond Drainer', description: 'Flush 1000 times', icon: '💎' },
  { id: '6', name: 'Legendary Loo', description: 'Maintain a 30-day streak', icon: '🏆' },
]

const AchievementsPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            Flush Achievements
          </h1>
          <Achievements achievements={mockAchievements} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AchievementsPage

