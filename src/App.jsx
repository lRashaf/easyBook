import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Hotels = lazy(() => import('./pages/Hotels'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const HotelDetails = lazy(() => import('./pages/HotelDetails'));
const Booking = lazy(() => import('./pages/Booking'));
const Payment = lazy(() => import('./pages/Payment'));
const HoneymoonPackages = lazy(() => import('./pages/HoneymoonPackages'));
const Bundles = lazy(() => import('./pages/Bundles'));

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/hotel/:id" element={<HotelDetails />} />
                <Route path="/booking/:hotelId" element={<Booking />} />
                <Route path="/payment/:bookingId" element={<Payment />} />
                <Route path="/honeymoon-packages" element={<HoneymoonPackages />} />
                <Route path="/bundles" element={<Bundles />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
