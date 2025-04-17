import HotelCard from '../components/HotelCard';
import PopularDestinations from '../components/PopularDestinations';
import SpecialOffers from '../components/SpecialOffers';
import HoneymoonSection from '../components/HoneymoonSection';
import BundleOffers from '../components/BundleOffers';

const featuredHotels = [
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
];

export default function Home() {
  return (
    <div className="page-transition">
      <PopularDestinations />
      
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      <HoneymoonSection />
      <BundleOffers />
      <SpecialOffers />
    </div>
  );
}
