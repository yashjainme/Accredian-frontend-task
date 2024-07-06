

// ReferEarn.js
import { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import ReferralForm from './ReferralForm';
import ReferralModal from './ReferralModal';
import ReferralLink from './ReferralLink';
import UserPoints from './UserPoints';

const ReferEarn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referralLink, setReferralLink] = useState('');

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* <Header /> */}
      <main className="flex flex-1 flex-col items-center justify-center w-full px-4 text-center">
        <UserPoints />
        <div className="relative mt-8">
          <h2 className="text-4xl font-bold mb-6 text-indigo-900">Refer a Friend and Earn Rewards</h2>
          <img src="/coin.svg" alt="Coins" className="absolute -top-8 -left-8 w-16 h-16 animate-bounce" />
          <img src="/gift-box.svg" alt="Gift" className="absolute -bottom-8 -right-8 w-16 h-16 animate-pulse" />
        </div>
        <p className="text-lg text-gray-600 mb-8">Share the love and get rewarded for every friend you bring on board!</p>
        <ReferralForm onOpenModal={() => setIsModalOpen(true)} />
        {isModalOpen && (
          <ReferralModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onReferralSubmit={(link) => setReferralLink(link)}
          />
        )}
        {referralLink && <ReferralLink link={referralLink} />}
      </main>
      <footer className="w-full bg-indigo-900 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
      
    </div>
  );
}

export default ReferEarn;