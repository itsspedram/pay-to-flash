import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GithubIcon, TwitterIcon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleRouteChange = () => {
      closeMenu()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/impact', label: 'Impact' },
    { href: '/about', label: 'About Us' },
    { href: '/roadmap', label: 'roadmap'  },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
        >
          🚽 The Flush
        </Link>
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-white/70 hover:text-white transition-colors ${
                router.pathname === item.href ? 'text-white font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <a href='#' className="text-white/70 hover:text-white">
            <TwitterIcon className="h-5 w-5" />
          </a>
          <a href='https://github.com/itsspedram/pay-to-flash' className="text-white/70 hover:text-white">
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
        <button
          className="md:hidden text-white/70 hover:text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md"
          >
            <nav className="flex flex-col p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white/70 hover:text-white py-2 ${
                    router.pathname === item.href ? 'text-white font-semibold' : ''
                  }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 mt-4">
                <a href='#' className="text-white/70 hover:text-white">
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a href='https://github.com/itsspedram/pay-to-flash' className="text-white/70 hover:text-white">
                  <GithubIcon className="h-5 w-5" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

