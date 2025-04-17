import { useState } from 'react';
import { X, Calendar, Users, Heart } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

export default function HoneymoonBookingDetails({ package_, onClose }) {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    checkIn: null,
    guests: 2,
    specialRequests: '',
    includeMealPlan: true,
    includeAirport: true,
    includePhotography: false
  });

  const extraServices = [
    {
      id: 'mealPlan',
      name: 'Premium Meal Plan',
      description: 'Includes romantic dinners and premium dining experiences',
      price: 299,
      selected: booking.includeMealPlan
    },
    {
      id: 'airport',
      name: 'Airport Transfer',
      description: 'Private luxury transfer to and from the airport',
      price: 149,
      selected: booking.includeAirport
    },
    {
      id: 'photography',
      name: 'Professional Photography',
      description: 'Professional photoshoot session during your stay',
      price: 399,
      selected: booking.includePhotography
    }
  ];

  const calculateTotal = () => {
    let total = package_.price;
    if (booking.includeMealPlan) total += 299;
    if (booking.includeAirport) total += 149;
    if (booking.includePhotography) total += 399;
    return total;
  };

  const handleSubmit = () => {
    if (!booking.checkIn) {
      alert('Please select a check-in date');
      return;
    }

    const bookingData = {
      id: Math.random().toString(36).substr(2, 9),
      packageId: package_.id,
      packageTitle: package_.title,
      location: package_.location,
      ...booking,
      totalAmount: calculateTotal()
    };

    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    navigate(`/booking/${package_.id}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Book Honeymoon Package</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={package_.image}
                alt={package_.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{package_.title}</h3>
              <p className="text-gray-600 mb-4">{package_.description}</p>

              <div className="space-y-3 mb-6">
                {package_.perks.map((perk, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date
                </label>
                <div className="flex items-center border rounded-lg p-2">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <DatePicker
                    selected={booking.checkIn}
                    onChange={(date) => setBooking({ ...booking, checkIn: date })}
                    minDate={new Date()}
                    className="w-full focus:outline-none"
                    placeholderText="Select date"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center border rounded-lg p-2">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <select
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: Number(e.target.value) })}
                    className="w-full focus:outline-none"
                  >
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                    <option value={4}>4 guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Services
                </label>
                <div className="space-y-3">
                  {extraServices.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={service.selected}
                        onChange={(e) => setBooking({
                          ...booking,
                          [`include${service.id.charAt(0).toUpperCase() + service.id.slice(1)}`]: e.target.checked
                        })}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-500">{service.description}</div>
                        <div className="text-sm font-medium text-pink-600">${service.price}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  value={booking.specialRequests}
                  onChange={(e) => setBooking({ ...booking, specialRequests: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  placeholder="Any special requests or preferences?"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>Total Price</span>
                  <span>${calculateTotal()}</span>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Proceed to Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
