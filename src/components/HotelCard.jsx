import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memo } from 'react';

const HotelCard = memo(({ hotel }) => {
  return (
    <Link to={`/hotel/${hotel.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden hover-lift animate-slide-up">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm">{hotel.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">{hotel.location}</p>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-bold">
              ${hotel.price}
              <span className="text-sm font-normal text-gray-500">/night</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
});

HotelCard.displayName = 'HotelCard';

export default HotelCard;
