import { toast } from 'react-toastify';

const ReferralLink = ({ link }) => (
  <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">Your Referral Link:</h3>
    <p className="text-blue-600 break-all">{link}</p>
    <button
      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      onClick={() => {
        navigator.clipboard.writeText(link);
        toast.info('Referral link copied to clipboard!');
      }}
    >
      Copy Link
    </button>
  </div>
);

export default ReferralLink;