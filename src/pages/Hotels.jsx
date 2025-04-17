import { useState, useMemo, useCallback } from 'react';
import { Star, Wifi, Dumbbell, Coffee, Forklift, Squircle, SlidersVertical } from 'lucide-react';
import HotelCard from '../components/HotelCard';
import { useLanguage } from '../contexts/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';

const MOCK_HOTELS = [
  {
    id: '1',
    name: 'Luxury Resort & Spa',
    location: 'Maldives',
    country: 'Maldives',
    city: 'Male',
    price: 499,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    description: 'Spectacular beachfront resort with private villas',
    amenities: ['Pool', 'Spa', 'Beach Access', 'Free WiFi']
  },
  {
    id: '2',
    name: 'Urban Boutique Hotel',
    location: 'New York',
    country: 'United States',
    city: 'New York',
    price: 299,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    description: 'Modern hotel in the heart of Manhattan',
    amenities: ['Gym', 'Restaurant', 'Bar', 'Business Center']
  },
  {
    id: '3',
    name: 'Mountain Lodge',
    location: 'Swiss Alps',
    country: 'Switzerland',
    city: 'Zermatt',
    price: 399,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    description: 'Cozy lodge with breathtaking mountain views',
    amenities: ['Ski Access', 'Fireplace', 'Restaurant', 'Spa']
  },
  {
    id: '4',
    name: 'Seaside Resort',
    location: 'Cancun',
    country: 'Mexico',
    city: 'Cancun',
    price: 450,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
    description: 'Beautiful beachfront resort with all-inclusive options',
    amenities: ['Pool', 'Beach Access', 'Spa', 'Restaurant']
  },
  {
    id: '5',
    name: 'City View Hotel',
    location: 'Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    price: 350,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e',
    description: 'Modern hotel with stunning city views',
    amenities: ['Restaurant', 'Bar', 'Gym', 'Free WiFi']
  },
  {
    id: '6',
    name: 'Desert Oasis Resort',
    location: 'Dubai',
    country: 'United Arab Emirates',
    city: 'Dubai',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    description: 'Luxury desert resort with private pools',
    amenities: ['Pool', 'Spa', 'Restaurant', 'Desert Tours']
  },
  {
    id: '7',
    name: 'Historic Palace Hotel',
    location: 'Paris',
    country: 'France',
    city: 'Paris',
    price: 799,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    description: 'Elegant hotel in a restored historic palace',
    amenities: ['Restaurant', 'Spa', 'Bar', 'Garden']
  },
  {
    id: '8',
    name: 'Tropical Paradise Resort',
    location: 'Bali',
    country: 'Indonesia',
    city: 'Bali',
    price: 299,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade',
    description: 'Peaceful resort surrounded by tropical gardens',
    amenities: ['Pool', 'Spa', 'Yoga Center', 'Restaurant']
  },
  {
    id: '9',
    name: 'Alpine Ski Lodge',
    location: 'Aspen',
    country: 'United States',
    city: 'Aspen',
    price: 699,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7',
    description: 'Ski-in/ski-out lodge with mountain views',
    amenities: ['Ski Access', 'Hot Tub', 'Restaurant', 'Bar']
  },
  {
    id: '10',
    name: 'Beachfront Villa Resort',
    location: 'Phuket',
    country: 'Thailand',
    city: 'Phuket',
    price: 459,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    description: 'Private villas with direct beach access',
    amenities: ['Private Pool', 'Beach Access', 'Spa', 'Restaurant']
  }
];


export default function Hotels() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const countries = useMemo(() =>
    Array.from(new Set(MOCK_HOTELS.map(hotel => hotel.country))).sort(),
    []
  );

  const cities = useMemo(() =>
    Array.from(new Set(MOCK_HOTELS
      .filter(hotel => !selectedCountry || hotel.country === selectedCountry)
      .map(hotel => hotel.city)))
      .sort(),
    [selectedCountry]
  );

  const filteredHotels = useMemo(() => {
    return MOCK_HOTELS.filter(hotel => {
      const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesRating = selectedRating ? hotel.rating >= selectedRating : true;
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = !selectedCountry || hotel.country === selectedCountry;
      const matchesCity = !selectedCity || hotel.city === selectedCity;
      
      return matchesPrice && matchesRating && matchesAmenities && matchesSearch && 
             matchesCountry && matchesCity;
    });
  }, [priceRange, selectedRating, selectedAmenities, searchQuery, selectedCountry, selectedCity]);

  const handleAmenityToggle = useCallback((amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  }, []);

  const handleCountryChange = useCallback((country) => {
    setSelectedCountry(country);
    setSelectedCity('');
  }, []);

  useState(() => {
    setTimeout(() => setLoading(false), 500);
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 animate-slide-up">
            <div>
              <h3 className="text-lg font-semibold mb-2">Search</h3>
              <input
                type="text"
                placeholder="Search hotels..."
                className="w-full p-2 border rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Country</h3>
              <select
                className="w-full p-2 border rounded"
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">City</h3>
              <select
                className="w-full p-2 border rounded"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedCountry}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Rating</h3>
              <div className="space-y-2">
                {[4, 4.5, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                      selectedRating === rating ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                    <span>{rating}+</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <div className="space-y-2">
                {['Pool', 'Spa', 'Restaurant', 'Gym', 'Free WiFi'].map(amenity => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded text-blue-600"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6 animate-slide-up">
            <h1 className="text-2xl font-bold mb-2">All Hotels</h1>
            <p className="text-gray-600">{filteredHotels.length} hotels found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animate">
            {filteredHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
