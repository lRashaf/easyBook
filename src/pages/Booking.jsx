import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Booking() {
  const { t } = useLanguage();
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const savedBooking = localStorage.getItem('currentBooking');
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking));
    }
  }, []);

  if (!booking) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * 499; // In a real app, this would use the actual room price
  };

  const handleConfirm = () => {
    const bookingWithTotal = {
      ...booking,
      totalAmount: calculateTotal()
    };
    localStorage.setItem('currentBooking', JSON.stringify(bookingWithTotal));
    navigate(`/payment/${booking.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('booking.confirmation')}</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('booking.details')}</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{t('booking.dates')}</p>
                  <p className="text-gray-600">
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{t('booking.guests')}</p>
                  <p className="text-gray-600">{booking.guests} {t('booking.people')}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">{t('booking.priceDetails')}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{calculateNights()} {t('booking.nights')}</span>
                  <span>${499} x {calculateNights()}</span>
                </div>
                <div className="flex justify-between font-semibold pt-4 border-t">
                  <span>{t('booking.total')}</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('booking.proceedPayment')}
        </button>
      </div>
    </div>
  );
}
