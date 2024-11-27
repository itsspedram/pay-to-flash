import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Header from '../components/Header'
import ToiletGame from '../components/ToiletGame'
import Footer from '../components/Footer'




const Home: NextPage = () => {

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f]">
    <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
    <Header />
    <main className="flex-grow flex items-center justify-center p-4 relative">
      <ToiletGame />
    </main>
    <Footer />
  </div>
  );
};

export default Home;
