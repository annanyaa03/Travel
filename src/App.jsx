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
import AIChatbot from './components/AIChatbot';
import ScrollToTop from './components/ScrollToTop';
import ConciergePlanner from './pages/ConciergePlanner';
import About from './pages/About';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Experiences from './pages/Experiences';
import Blog from './pages/Blog';
import Flights from './pages/Flights';
import FlightBooking from './pages/FlightBooking';
import Booking from './pages/Booking';

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
      </Routes>

      {showFooter && <Footer />}
      <AIChatbot />
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
