'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import WalletButton from './WalletButton'
import FlushButton from './FlushButton'
import Image from 'next/image'
import Achievements from './Achievements'
import Leaderboard from './Leaderboard'
import Streak from './Streak'
import SocialShare from './SocialShare'
import EnvironmentalImpact from './EnvironmentalImpact'
import RoadmapPreview from './RoadmapPreview'

// Mock data for achievements and leaderboard
const mockAchievements = [
  { id: '1', name: 'Bronze Flusher', description: 'Flush 10 times', icon: '🥉' },
  { id: '2', name: 'Silver Flusher', description: 'Flush 50 times', icon: '🥈' },
  { id: '3', name: 'Gold Flusher', description: 'Flush 100 times', icon: '🥇' },
]

const mockLeaderboard = [
  { id: '1', name: 'FlushMaster', score: 1000 },
  { id: '2', name: 'ToiletKing', score: 850 },
  { id: '3', name: 'PlungerPro', score: 720 },
]

export default function ToiletGame() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [flushing, setFlushing] = useState(false)
  const [flushCount, setFlushCount] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [totalDonation, setTotalDonation] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Check if the user has flushed today
    const lastFlushDate = localStorage.getItem('lastFlushDate')
    const today = new Date().toDateString()

    if (lastFlushDate === today) {
      const storedStreak = Number(localStorage.getItem('currentStreak') || '0')
      setCurrentStreak(storedStreak)
    } else {
      setCurrentStreak(0)
    }

    setBestStreak(Number(localStorage.getItem('bestStreak') || '0'))
    setFlushCount(Number(localStorage.getItem('flushCount') || '0'))
    setTotalDonation(Number(localStorage.getItem('totalDonation') || '0'))
  }, [])

  const handleWalletConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWalletConnected(true)
        const walletAddress = accounts[0];
      console.log("Connected wallet address:", walletAddress);
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert('Please install MetaMask! No wallet, no flush!')
    }
  }

  const handleFlush = async () => {
    if (!walletConnected) {
      alert('Connect your wallet first! No free flushes here!')
      return
    }

    setFlushing(true)
    if (audioRef.current) {
      audioRef.current.play()
    }

    // Update flush count and streak
    const newFlushCount = flushCount + 1
    setFlushCount(newFlushCount)
    localStorage.setItem('flushCount', newFlushCount.toString())

    const newStreak = currentStreak + 1
    setCurrentStreak(newStreak)
    if (newStreak > bestStreak) {
      setBestStreak(newStreak)
      localStorage.setItem('bestStreak', newStreak.toString())
    }

    // Update last flush date
    const today = new Date().toDateString()
    localStorage.setItem('lastFlushDate', today)
    localStorage.setItem('currentStreak', newStreak.toString())

    // Update total donation (10% of flush cost)
    const flushCost = 0.01 // ETH
    const donation = flushCost * 0.1
    const newTotalDonation = totalDonation + donation
    setTotalDonation(newTotalDonation)
    localStorage.setItem('totalDonation', newTotalDonation.toString())

    setTimeout(() => {
      setFlushing(false)
    }, 3000)
  }

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  })

  

  return (
    <animated.div style={fadeIn} className="w-full max-w-4xl px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
          Pay to Flush! 💰🚽
        </h1>
        <p className="text-white/70 text-lg">The world's first toilet-based DeFi protocol</p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
        <motion.div
          className="relative aspect-video"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* <Image
            src={require("../pics/t.jpgg")}
            alt="Luxury Toilet"
            className="w-full h-full object-cover"
          />           */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 p-8">
            <WalletButton
              connected={walletConnected}
              onClick={handleWalletConnect}
            />
            <FlushButton onClick={handleFlush} disabled={!walletConnected || flushing} />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {flushCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 text-center"
          >
            <div className="inline-block px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-2xl font-bold text-white mb-2">
                Flush Count: {flushCount}
              </p>
              <p className="text-white/70">
                You've earned {flushCount} FLC (≈ {(flushCount * 0.01).toFixed(3)} ETH)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Streak currentStreak={currentStreak} bestStreak={bestStreak} />
      <Achievements achievements={mockAchievements} />
      <Leaderboard entries={mockLeaderboard} />
      <SocialShare flushCount={flushCount} />
      <EnvironmentalImpact totalDonation={totalDonation} />
      <RoadmapPreview />


      <audio ref={audioRef} src="../audio/toilet-flush-quite-aggressive.mp3" />
    </animated.div>
  )
}

