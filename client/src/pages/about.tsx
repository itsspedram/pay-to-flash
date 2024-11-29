import { NextPage } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'

const AboutPage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            About Us: The Flush Founders
          </h1>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm space-y-6">
            <p className="text-white/80 text-lg">
              Once upon a time, in a small apartment with questionable plumbing, two broke developers had an epiphany while staring at their toilet: "What if we could monetize every flush?"
            </p>
            <div className="flex justify-center">
              <Image 
                src="/placeholder.svg?height=200&width=200" 
                alt="Flush Founders" 
                width={200} 
                height={200} 
                className="rounded-full border-4 border-purple-400"
              />
            </div>
            <p className="text-white/80 text-lg">
              Meet Bob "The Plunger" Smith and Alice "Overflow" Johnson, two visionaries who turned their bathroom breaks into a business plan. Armed with nothing but a dream, a laptop, and an unhealthy amount of coffee, they set out to revolutionize the world of cryptocurrency... one flush at a time.
            </p>
            <h2 className="text-2xl font-bold text-purple-400 mt-6">Our Mission</h2>
            <p className="text-white/80 text-lg">
              To become millionaires by convincing people to pay for something they used to do for free. Oh, and something about saving water and the environment too.
            </p>
            <h2 className="text-2xl font-bold text-purple-400 mt-6">Our Vision</h2>
            <p className="text-white/80 text-lg">
              A world where every toilet is a potential gold mine, every flush a step towards financial freedom, and every bathroom break an opportunity to save the planet.
            </p>
            <div className="bg-white/5 p-4 rounded-lg mt-6">
              <h3 className="text-xl font-bold text-white mb-2">Fun Facts:</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                <li>Our first investor was Bob's grandma, who thought she was funding a "real plumbing business".</li>
                <li>We've been accused of "taking the piss" out of cryptocurrency. We consider that a compliment.</li>
                <li>Our office is a renovated porta-potty. We call it "The Think Tank".</li>
              </ul>
            </div>
            <p className="text-white/80 text-lg italic mt-6">
              Remember: In the world of Pay to Flush, every cent counts, and every flush matters. We're not just a company; we're a movement. A bowel movement.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage

