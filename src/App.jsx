import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AuthCallback from './pages/AuthCallback';

import ScrollToTop from './components/ScrollToTop';
import ConciergePlanner from './pages/ConciergePlanner';
import About from './pages/AboutNew';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Experiences from './pages/Experiences';
import Blog from './pages/Blog';
import Flights from './pages/Flights';
import FlightBooking from './pages/FlightBooking';
import Booking from './pages/Booking';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import HelpCenter from './pages/HelpCenter';
import Safety from './pages/Safety';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

const NO_NAVBAR_ROUTES = ['/dashboard', '/login', '/auth/callback'];
const NO_FOOTER_ROUTES = ['/dashboard', '/login', '/auth/callback'];

function AppContent() {
  const location = useLocation();

  const showNavbar = !NO_NAVBAR_ROUTES.some(route => location.pathname.startsWith(route));
  const showFooter = !NO_FOOTER_ROUTES.some(route => location.pathname.startsWith(route));

  return (
    <div className="app">
      {showNavbar && <Navbar onLoginClick={null} />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:hotelId" element={<HotelDetail />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/concierge-plan" element={<ConciergePlanner />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/book-flight" element={<FlightBooking />} />
        <Route path="/hotel-booking" element={<Booking />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
      </Routes>

      {showFooter && <Footer />}

    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
