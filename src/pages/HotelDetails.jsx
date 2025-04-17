import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, Wifi, Dumbbell, Squircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { useLanguage } from '../contexts/LanguageContext';

export default function HotelDetails() {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    checkIn: null,
    checkOut: null,
    guests: 1,
    roomType: ''
  });

  // Mock hotel data - in a real app, this would come from an API
  const hotel = {
    id,
    name: 'Luxury Resort & Spa',
    location: 'Maldives',
    price: 499,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'
    ],
    description: 'Experience luxury at its finest in our beachfront resort. Each villa offers stunning ocean views and direct access to pristine white sand beaches.',
    amenities: ['Pool', 'Spa', 'Beach Access', 'Free WiFi', 'Restaurant', 'Gym'],
    rooms: [
      { id: 'standard', type: 'Standard Room', price: 499, capacity: 2 },
      { id: 'deluxe', type: 'Deluxe Suite', price: 799, capacity: 3 },
      { id: 'villa', type: 'Beach Villa', price: 1299, capacity: 4 }
    ]
  };

  const handleBooking = () => {
    if (!booking.checkIn || !booking.checkOut || !booking.roomType) {
      alert('Please fill in all booking details');
      return;
    }
    
    const bookingData = {
      id: Math.random().toString(36).substr(2, 9),
      hotelId: hotel.id,
      ...booking
    };
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    navigate(`/booking/${hotel.id}`);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-5 h-5" />;
      case 'pool': return <Squircle className="w-5 h-5" />;
      case 'restaurant': return <Squircle className="w-5 h-5" />;
      case 'gym': return <Dumbbell className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-96 object-cover rounded-lg col-span-2"
            />
            <img
              src={hotel.images[1]}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <img
              src={hotel.images[2]}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Hotel Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
            <p className="text-gray-600 mb-4">{hotel.location}</p>
            <p className="mb-6">{hotel.description}</p>

            {/* Amenities */}
            <h2 className="text-xl font-semibold mb-4">{t('hotel.amenities')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
            <h3 className="text-2xl font-bold mb-4">
              ${hotel.price}
              <span className="text-sm text-gray-500 font-normal"> / night</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.dates')}
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <DatePicker
                      selected={booking.checkIn}
                      onChange={(date) => setBooking({ ...booking, checkIn: date })}
                      className="w-full p-2 border rounded"
                      placeholderText={t('booking.checkIn')}
                    />
                  </div>
                  <div className="flex-1">
                    <DatePicker
                      selected={booking.checkOut}
                      onChange={(date) => setBooking({ ...booking, checkOut: date })}
                      className="w-full p-2 border rounded"
                      placeholderText={t('booking.checkOut')}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.guests')}
                </label>
                <div className="flex items-center border rounded p-2">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <select
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: Number(e.target.value) })}
                    className="flex-1 focus:outline-none"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num} {t('booking.guests')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.roomType')}
                </label>
                <div className="space-y-2">
                  {hotel.rooms.map((room) => (
                    <label
                      key={room.id}
                      className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50"
                    >
                      <div>
                        <div className="font-medium">{room.type}</div>
                        <div className="text-sm text-gray-500">Up to {room.capacity} guests</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold">${room.price}</div>
                        <input
                          type="radio"
                          name="roomType"
                          value={room.id}
                          checked={booking.roomType === room.id}
                          onChange={(e) => setBooking({ ...booking, roomType: e.target.value })}
                          className="w-4 h-4 text-blue-600"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('booking.reserve')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
