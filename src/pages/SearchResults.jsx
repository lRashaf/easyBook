import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { useLanguage } from '../contexts/LanguageContext';

export default function SearchResults() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // بيانات فندقية تجريبية بدلاً من استدعاء API حقيقي
    const mockHotels = [
      {
        id: '1',
        name: 'Luxury Resort & Spa',
        location: searchParams.get('destination') || 'Maldives',
        price: 499,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
        description: 'Spectacular beachfront resort with private villas',
        amenities: ['Pool', 'Spa', 'Beach Access', 'Free WiFi']
      },
      {
        id: '2',
        name: 'Urban Boutique Hotel',
        location: searchParams.get('destination') || 'New York',
        price: 299,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        description: 'Modern hotel in the heart of Manhattan',
        amenities: ['Gym', 'Restaurant', 'Bar', 'Business Center']
      },
      {
        id: '3',
        name: 'Mountain Lodge',
        location: searchParams.get('destination') || 'Swiss Alps',
        price: 399,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        description: 'Cozy lodge with breathtaking mountain views',
        amenities: ['Ski Access', 'Fireplace', 'Restaurant', 'Spa']
      },
    ];

    setHotels(mockHotels);
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {t('search.results')} {searchParams.get('destination')}
        </h1>
        <p className="text-gray-600">
          {hotels.length} {t('search.properties')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
