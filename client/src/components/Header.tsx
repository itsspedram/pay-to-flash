import Link from 'next/link'
import { GithubIcon, TwitterIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
        >
          🚽 FlushCoin
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                Tokenomics
              </Link>
            </li>
            <li>
              <Link href="#" className="text-white/70 hover:text-white transition-colors">
                Roadmap
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <a href='#' className="text-white/70 hover:text-white">
            <TwitterIcon className="h-5 w-5" />
          </a>
          <a   href='https://github.com/itsspedram/pay-to-flash' className="text-white/70 hover:text-white">
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  )
}

