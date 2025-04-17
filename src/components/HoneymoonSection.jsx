import { Heart, Gift, Sparkles, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredPackages = [
  {
    id: 'hp1',
    title: 'Maldives Paradise',
    description: 'Experience ultimate luxury in an overwater villa',
    price: 3499,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
    perks: [
      'Private overwater villa',
      'Couples spa treatment',
      'Sunset dinner cruise',
      'Underwater photography'
    ]
  },
  {
    id: 'hp2',
    title: 'Santorini Romance',
    description: 'Enjoy breathtaking sunsets and private infinity pools',
    price: 2899,
    discount: 15,
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
    description: 'Immerse yourself in spiritual and natural beauty',
    price: 2499,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    perks: [
      'Private pool villa',
      'Traditional spa rituals',
      'Temple tour',
      'Romantic beach dinner'
    ]
  }
];

export default function HoneymoonSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            <h2 className="text-3xl font-bold">Honeymoon Specials</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Begin your journey together with our carefully curated honeymoon packages,
            designed to create unforgettable moments for newlyweds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((package_) => (
            <div key={package_.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="relative">
                <img
                  src={package_.image}
                  alt={package_.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {package_.discount}% OFF
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{package_.title}</h3>
                <p className="text-gray-600 mb-4">{package_.description}</p>

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
                      ${Math.round(package_.price * (1 - package_.discount / 100))}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${package_.price}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">per couple</span>
                </div>

                <Link
                  to={`/booking/honeymoon/${package_.id}`}
                  className="block w-full text-center bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/honeymoon-packages"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            View All Honeymoon Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
