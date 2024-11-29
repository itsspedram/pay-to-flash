import { NextPage } from 'next'
import Header from '../components/Header'
import Leaderboard from '../components/Leaderboard'
import Footer from '../components/Footer'

const mockLeaderboard = [
  { id: '1', name: 'FlushMaster', score: 1000 },
  { id: '2', name: 'ToiletKing', score: 850 },
  { id: '3', name: 'PlungerPro', score: 720 },
  { id: '4', name: 'LooLegend', score: 650 },
  { id: '5', name: 'SanitationSage', score: 600 },
  { id: '6', name: 'DrainDominator', score: 550 },
  { id: '7', name: 'CommodeCrusader', score: 500 },
  { id: '8', name: 'FlushFanatic', score: 450 },
  { id: '9', name: 'BowlBaron', score: 400 },
  { id: '10', name: 'ThroneThriller', score: 350 },
]

const LeaderboardPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            Flush Leaderboard
          </h1>
          <Leaderboard entries={mockLeaderboard} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LeaderboardPage

