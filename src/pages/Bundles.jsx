import { useState, useMemo } from 'react';
import { Plane, Hotel, Package, Calendar, Users, MapPin } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Extended bundle data with more details
const bundles = [
  {
    id: 'b1',
    title: 'Maldives Escape',
    hotel: 'Luxury Resort & Spa',
    airline: 'Emirates',
    originalPrice: 2999,
    bundlePrice: 2499,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
    location: 'Maldives',
    duration: '7 nights',
    departureCity: 'New York',
    hotelDetails: {
      rating: 5,
      amenities: ['Private Beach', 'Spa', 'Pool', 'Fine Dining'],
      roomType: 'Overwater Villa'
    },
    flightDetails: {
      class: 'Business',
      type: 'Round-trip',
      includedBaggage: '2 x 23kg'
    },
    inclusions: [
      'Airport Transfers',
      'Daily Breakfast',
      'Sunset Cruise',
      "Couple's Spa Treatment"
    ]
  },
  {
    id: 'b2',
    title: 'Paris Romance',
    hotel: 'Le Grand Hotel',
    airline: 'Air France',
    originalPrice: 2499,
    bundlePrice: 1999,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    location: 'Paris',
    duration: '5 nights',
    departureCity: 'London',
    hotelDetails: {
      rating: 4.5,
      amenities: ['City View', 'Restaurant', 'Bar', 'Fitness Center'],
      roomType: 'Deluxe Suite'
    },
    flightDetails: {
      class: 'Economy Premium',
      type: 'Round-trip',
      includedBaggage: '1 x 23kg'
    },
    inclusions: [
      'Seine River Cruise',
      'Skip-the-line Eiffel Tower Access',
      'Daily Breakfast',
      'City Tour'
    ]
  },
  {
    id: 'b3',
    title: 'Bali Retreat',
    hotel: 'Tropical Paradise Resort',
    airline: 'Singapore Airlines',
    originalPrice: 2799,
    bundlePrice: 2299,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    location: 'Bali',
    duration: '6 nights',
    departureCity: 'Singapore',
    hotelDetails: {
      rating: 4.8,
      amenities: ['Private Pool', 'Spa', 'Beach Access', 'Yoga Center'],
      roomType: 'Pool Villa'
    },
    flightDetails: {
      class: 'Economy',
      type: 'Round-trip',
      includedBaggage: '2 x 23kg'
    },
    inclusions: [
      'Traditional Massage',
      'Temple Tour',
      'Cooking Class',
      'Daily Breakfast'
    ]
  },
  {
    id: 'b4',
    title: 'Dubai Luxury',
    hotel: 'Desert Palace Resort',
    airline: 'Etihad Airways',
    originalPrice: 3299,
    bundlePrice: 2799,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    location: 'Dubai',
    duration: '5 nights',
    departureCity: 'Mumbai',
    hotelDetails: {
      rating: 5,
      amenities: ['Private Beach', 'Infinity Pool', 'Spa', 'Multiple Restaurants'],
      roomType: 'Premium Suite'
    },
    flightDetails: {
      class: 'Business',
      type: 'Round-trip',
      includedBaggage: '2 x 32kg'
    },
    inclusions: [
      'Desert Safari',
      'Burj Khalifa Access',
      'Dinner Cruise',
      'Airport Transfer'
    ]
  }
];

export default function Bundles() {
  const [filters, setFilters] = useState({
    destination: '',
    departureCity: '',
    priceRange: [0, 5000],
    date: null,
    duration: '',
    passengers: 2
  });

  // Filter bundles based on user selection
  const filteredBundles = useMemo(() => {
    return bundles.filter(bundle => {
      const matchesDestination = !filters.destination || 
        bundle.location.toLowerCase().includes(filters.destination.toLowerCase());
      const matchesDeparture = !filters.departureCity || 
        bundle.departureCity.toLowerCase().includes(filters.departureCity.toLowerCase());
      const matchesPrice = bundle.bundlePrice >= filters.priceRange[0] && 
        bundle.bundlePrice <= filters.priceRange[1];
      const matchesDuration = !filters.duration || 
        bundle.duration.includes(filters.duration);
      
      return matchesDestination && matchesDeparture && matchesPrice && matchesDuration;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Package className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Flight + Hotel Bundles</h1>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="pl-10 w-full p-2 border rounded-lg"
                  placeholder="Where to?"
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure From</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="pl-10 w-full p-2 border rounded-lg"
                  placeholder="City"
                  value={filters.departureCity}
                  onChange={(e) => setFilters({ ...filters, departureCity: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <DatePicker
                  selected={filters.date}
                  onChange={(date) => setFilters({ ...filters, date })}
                  className="pl-10 w-full p-2 border rounded-lg"
                  placeholderText="Select date"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 w-full p-2 border rounded-lg"
                  value={filters.passengers}
                  onChange={(e) => setFilters({ ...filters, passengers: Number(e.target.value) })}
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBundles.map(bundle => (
            <div key={bundle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="flex flex-col md:flex-row">
                <img src={bundle.image} alt={bundle.title} className="md:w-2/5 w-full object-cover" />
                <div className="md:w-3/5 p-6">
                  <h3 className="text-xl font-bold mb-2">{bundle.title}</h3>
                  <p className="text-gray-600">{bundle.location} • {bundle.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
