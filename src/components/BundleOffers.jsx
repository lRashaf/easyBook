import { Plane, Hotel, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    duration: '7 nights'
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
    duration: '5 nights'
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
    duration: '6 nights'
  }
];

export default function BundleOffers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Flight + Hotel Bundles</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Save more when you book your flight and hotel together. Exclusive deals with our airline partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="relative">
                <img
                  src={bundle.image}
                  alt={bundle.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save ${bundle.originalPrice - bundle.bundlePrice}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{bundle.title}</h3>
                <p className="text-gray-600 mb-4">{bundle.location} • {bundle.duration}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-gray-400" />
                    <span>{bundle.hotel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-gray-400" />
                    <span>{bundle.airline}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      ${bundle.bundlePrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${bundle.originalPrice}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">per person</span>
                </div>

                <Link
                  to={`/bundles/${bundle.id}`}
                  className="block w-full text-center bg-primary text-white py-3 rounded-lg hover:bg-primary-hover transition-colors"
                >
                  View Bundle
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/bundles"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium"
          >
            View All Bundles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
