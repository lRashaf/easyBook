import { Heart, Gift, Sparkles, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import HoneymoonBookingDetails from '../components/HoneymoonBookingDetails';

const honeymoonPackages = [
  {
    id: 'hp1',
    title: 'Maldives Paradise Escape',
    location: 'Maldives',
    description: 'Experience ultimate luxury in an overwater villa with direct access to crystal clear waters',
    price: 3499,
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
    perks: [
      'Private overwater villa',
      'Couples spa treatment',
      'Sunset dinner cruise',
      'Underwater photography session'
    ]
  },
  {
    id: 'hp2',
    title: 'Santorini Romance',
    location: 'Greece',
    description: 'Enjoy breathtaking sunsets and private infinity pools in the magical setting of Santorini',
    price: 2899,
    duration: '6 nights',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    perks: [
      'Private caldera view suite',
      'Wine tasting tour',
      'Private yacht excursion',
      'Romantic photoshoot'
    ]
  },
  {
    id: 'hp3',
    title: 'Bali Bliss',
    location: 'Indonesia',
    description: 'Immerse yourself in the spiritual and natural beauty of Bali with luxurious amenities',
    price: 2499,
    duration: '8 nights',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    perks: [
      'Private pool villa',
      'Traditional spa rituals',
      'Temple tour',
      'Romantic beach dinner'
    ]
  },
  {
    id: 'hp4',
    title: 'Seychelles Serenity',
    location: 'Seychelles',
    description: 'Discover secluded beaches and luxury in this intimate island paradise',
    price: 4299,
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1543731068-7e0f5bec3816',
    perks: [
      'Beachfront villa',
      'Island hopping tour',
      "Couple's massage",
      'Private beach picnic'
    ]
  },
  {
    id: 'hp5',
    title: 'Amalfi Coast Romance',
    location: 'Italy',
    description: 'Experience Italian romance along the stunning Amalfi Coast',
    price: 3299,
    duration: '6 nights',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca',
    perks: [
      'Sea view suite',
      'Private cooking class',
      'Boat tour to Capri',
      'Wine tasting experience'
    ]
  },
  {
    id: 'hp6',
    title: 'Tahiti Overwater Dream',
    location: 'French Polynesia',
    description: 'Live your dream honeymoon in the heart of the South Pacific',
    price: 4599,
    duration: '8 nights',
    image: 'https://images.unsplash.com/photo-1578892097345-4f0ab5405c95',
    perks: [
      'Overwater bungalow',
      'Polynesian spa ritual',
      'Lagoon tour',
      'Sunset champagne service'
    ]
  }
];

export default function HoneymoonPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            <h1 className="text-4xl font-bold">Honeymoon Packages</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Begin your journey of love with our carefully curated honeymoon packages,
            designed to create unforgettable memories for newlyweds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {honeymoonPackages.map((package_) => (
            <div key={package_.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="relative">
                <img
                  src={package_.image}
                  alt={package_.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {package_.duration}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{package_.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{package_.location}</p>
                  <p className="text-gray-700">{package_.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {package_.perks.map((perk, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {index === 0 && <UtensilsCrossed className="w-4 h-4 text-pink-500" />}
                      {index === 1 && <Gift className="w-4 h-4 text-pink-500" />}
                      {index === 2 && <Sparkles className="w-4 h-4 text-pink-500" />}
                      {index === 3 && <Heart className="w-4 h-4 text-pink-500" />}
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-pink-600">
                      ${package_.price}
                    </span>
                    <span className="text-sm text-gray-500">/couple</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPackage(package_)}
                  className="block w-full text-center bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPackage && (
        <HoneymoonBookingDetails
          package_={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
}
