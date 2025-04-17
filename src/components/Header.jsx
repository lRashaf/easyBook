import { MapPin, Users, Calendar, DollarSign } from 'lucide-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would trigger a search
    console.log('Search params:', searchParams);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            BookEasy
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-4">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-full border">
              <div className="flex items-center flex-1">
                <MapPin className="w-5 h-5 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder={t('header.whereGoing')}
                  className="w-full px-2 bg-transparent focus:outline-none"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams(prev => ({...prev, destination: e.target.value}))}
                />
              </div>
              <div className="flex items-center border-l px-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <DatePicker
                  selected={searchParams.checkIn}
                  onChange={(date) => setSearchParams(prev => ({...prev, checkIn: date}))}
                  placeholderText={t('booking.checkIn')}
                  className="w-24 bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex items-center border-l px-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <DatePicker
                  selected={searchParams.checkOut}
                  onChange={(date) => setSearchParams(prev => ({...prev, checkOut: date}))}
                  placeholderText={t('booking.checkOut')}
                  className="w-24 bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex items-center border-l px-2">
                <Users className="w-5 h-5 text-gray-400" />
                <select
                  className="bg-transparent focus:outline-none"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams(prev => ({...prev, guests: Number(e.target.value)}))}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} {t('header.guests')}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-hover">
                {t('header.search')}
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/hotels" className="text-gray-600 hover:text-primary">
              {t('header.hotels')}
            </Link>
            <div className="flex items-center border divide-x rounded-full border-gray-200">
              <LanguageSelector />
              <button className="p-2 hover:bg-gray-100 transition-colors">
                <DollarSign className="w-5 h-5" />
              </button>
            </div>
            <Link to="/signin" className="px-4 py-2 text-primary hover:bg-primary/5 rounded-full">
              {t('header.signIn')}
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-hover">
              {t('header.register')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
