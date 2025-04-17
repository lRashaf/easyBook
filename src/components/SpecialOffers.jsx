import { Tag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const offers = [
  {
    id: 1,
    title: 'Summer Holiday Special',
    description: 'Get 30% off on beach resorts',
    validUntil: '2024-08-31',
    code: 'SUMMER30',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
  },
  {
    id: 2,
    title: 'Last Minute Deals',
    description: 'Up to 50% off on bookings within 48 hours',
    validUntil: '2024-12-31',
    code: 'LAST50',
    image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a'
  },
  {
    id: 3,
    title: 'Luxury Experience',
    description: 'Free spa treatment with 3-night stays',
    validUntil: '2024-09-30',
    code: 'LUXSPA',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874'
  }
];

export default function SpecialOffers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Special Offers & Deals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Limited Time
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4" />
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {offer.code}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/hotels?offer=${offer.code}`}
                  className="block text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
