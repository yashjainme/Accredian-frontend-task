const ReferralForm = ({ onOpenModal }) => (
    <button
      className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 flex items-center"
      onClick={onOpenModal}
    >
      <img src="/referral-icon.svg" alt="Refer Icon" className="w-6 h-6 mr-2" />
      Refer Now
    </button>
  );
  
  export default ReferralForm;