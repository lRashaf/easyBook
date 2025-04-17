import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DISCOUNT_CODES = {
  'NEWLYWEDS': 20,
  'SUMMER2024': 15,
  'BUNDLE10': 10
};

export default function Payment() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  useEffect(() => {
    const savedBooking = localStorage.getItem('currentBooking');
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking));
    }
  }, []);

  const applyDiscountCode = () => {
    setDiscountError('');
    const discount = DISCOUNT_CODES[discountCode];
    if (discount) {
      setAppliedDiscount(discount);
      setDiscountError('');
    } else {
      setDiscountError('Invalid discount code');
      setAppliedDiscount(0);
    }
  };

  const calculateTotal = () => {
    if (!booking?.totalAmount) return 0;
    const discountAmount = (booking.totalAmount * appliedDiscount) / 100;
    return booking.totalAmount - discountAmount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    bookingHistory.push({
      ...booking,
      status: 'confirmed',
      paymentDate: new Date().toISOString(),
      appliedDiscount,
      finalAmount: calculateTotal()
    });
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
    localStorage.removeItem('currentBooking');
    navigate('/', { state: { paymentSuccess: true } });
  };

  if (!booking) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Lock className="w-5 h-5 text-green-500" />
          <h1 className="text-3xl font-bold">{t('payment.securePayment')}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{t('payment.orderSummary')}</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${booking.totalAmount}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span>-${(booking.totalAmount * appliedDiscount / 100).toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>{t('booking.total')}</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Code
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                    />
                    {discountError && (
                      <p className="text-red-500 text-sm mt-1">{discountError}</p>
                    )}
                  </div>
                  <button
                    onClick={applyDiscountCode}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  {t('payment.cardDetails')}
                </div>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('payment.cardName')}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('payment.cardNumber')}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    className="w-full p-2 border rounded"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value.replace(/\D/g, '') })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('payment.expiryDate')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full p-2 border rounded"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2);
                        }
                        setPaymentDetails({ ...paymentDetails, expiryDate: value });
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      className="w-full p-2 border rounded"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value.replace(/\D/g, '') })}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('payment.payNow')} ${calculateTotal()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
