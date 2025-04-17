import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
    deals: 234,
    averagePrice: 199
  },
  {
    id: 2,
    city: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    deals: 189,
    averagePrice: 299
  },
  {
    id: 3,
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    deals: 167,
    averagePrice: 159
  },
  {
    id: 4,
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    deals: 345,
    averagePrice: 249
  },
  {
    id: 5,
    city: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
    deals: 156,
    averagePrice: 179
  }
];

export default function PopularDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(current => Math.max(current - 1, 0));
    } else {
      setCurrentIndex(current => Math.min(current + 1, destinations.length - 3));
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold">Popular Destinations</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border hover:bg-gray-50 transition-colors hover-scale"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border hover:bg-gray-50 transition-colors hover-scale"
              disabled={currentIndex >= destinations.length - 3}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div 
            className="flex gap-6 transition-all duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
          >
            {destinations.map(destination => (
              <Link
                key={destination.id}
                to={`/hotels?destination=${destination.city}`}
                className="flex-none w-full md:w-1/3 group hover-lift"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.city}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{destination.city}</h3>
                    <p className="text-sm mb-2">{destination.country}</p>
                    <div className="flex items-center gap-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {destination.deals} deals
                      </span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        from ${destination.averagePrice}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
