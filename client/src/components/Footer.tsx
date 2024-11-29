import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 backdrop-blur-sm bg-black/20">
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-white/70">&copy; 2023 FlushCoin. All rights down the drain.</p>
          <p className="text-sm text-white/50 mt-1">
            Not financial advice. DYOR (Do Your Own Restroom).
          </p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end gap-4">
          <Link href="/about" className="text-white/70 hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/impact" className="text-white/70 hover:text-white transition-colors">
            Impact
          </Link>
          <a href="https://github.com/itsspedram/pay-to-flash" className="text-white/70 hover:text-white transition-colors">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}

