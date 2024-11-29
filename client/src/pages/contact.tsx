import { NextPage } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Mail, Github, MessageCircle } from 'lucide-react'

const ContactPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            Contact Us
          </h1>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-white/80 mb-6 text-center">
              Have a question? Want to collaborate? Or just need to vent about your plumbing? We're all ears!
            </p>
            <div className="space-y-4">
              <a 
                href="mailto:flush@paytoflu.sh" 
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-white font-semibold">Email Us</span>
                <Mail className="text-purple-400" />
              </a>
              <a 
                href="https://github.com/itsspedram/pay-to-flash" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-white font-semibold">Check our GitHub</span>
                <Github className="text-purple-400" />
              </a>
              <a 
                href="https://discord.gg/paytoflu.sh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-white font-semibold">Join our Discord</span>
                <MessageCircle className="text-purple-400" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage

