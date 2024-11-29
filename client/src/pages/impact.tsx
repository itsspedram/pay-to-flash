import { NextPage } from 'next'
import Header from '../components/Header'
import EnvironmentalImpact from '../components/EnvironmentalImpact'
import Footer from '../components/Footer'

const ImpactPage: NextPage = () => {
  // In a real application, you would fetch this data from your backend
  const totalDonation = 10.5 // Example value

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
            Environmental Impact
          </h1>
          <EnvironmentalImpact totalDonation={totalDonation} />
          <div className="mt-8 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-white/80 mb-4">
              At Pay to Flush, we're committed to making a real difference in global water conservation efforts. 
              Every flush contributes to our mission of creating a more sustainable future.
            </p>
            <h3 className="text-xl font-semibold text-white mb-2">How We Help</h3>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Partnering with leading water conservation organizations</li>
              <li>Funding innovative water-saving technologies</li>
              <li>Supporting education initiatives about responsible water usage</li>
              <li>Contributing to clean water projects in developing countries</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ImpactPage

