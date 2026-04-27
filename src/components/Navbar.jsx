import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiChevronDown,
  FiUser,
  FiGrid,
  FiHeart,
  FiClipboard,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';

// Individual nav link component
const NavLink = ({ link, isActive, scrolled, navigate }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => navigate(link.path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: '500',
        letterSpacing: '0.12em',
        fontFamily: 'Inter, sans-serif',
        color: scrolled
          ? (isActive ? '#1a1a1a' : hovered ? '#1a1a1a' : 'rgba(0,0,0,0.65)')
          : (isActive ? 'white' : hovered ? 'white' : 'rgba(255,255,255,0.85)'),
        transition: 'all 0.3s ease',
        padding: '4px 0',
        position: 'relative',
        whiteSpace: 'nowrap'
      }}
    >
      {link.label}
      {/* Active underline */}
      {isActive && (
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          right: 0,
          height: '1px',
          background: '#C9A84C'
        }}/>
      )}
    </button>
  );
};

// Dropdown Item Component
const DropdownItem = ({
  icon: Icon, label, onClick,
  isSignOut = false
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '10px',
        padding: '11px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        background: hovered
          ? isSignOut
            ? 'rgba(239,68,68,0.06)'
            : 'rgba(201,168,76,0.06)'
          : 'transparent'
      }}
    >
      {/* Icon */}
      <span style={{
        fontSize: '16px',
        width: '20px',
        textAlign: 'center',
        flexShrink: 0,
        opacity: hovered ? 1 : 0.75,
        transition: 'opacity 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hovered
          ? isSignOut
            ? '#ef4444'
            : '#C9A84C'
          : isSignOut
          ? '#ef4444'
          : '#7a7a7a'
      }}>
        {Icon && <Icon />}
      </span>

      {/* Label */}
      <span style={{
        fontSize: '13px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '300',
        letterSpacing: '0.01em',
        transition: 'color 0.15s ease',
        color: hovered
          ? isSignOut
            ? '#ef4444'
            : '#C9A84C'
          : isSignOut
          ? '#ef4444'
          : '#3a3a3a'
      }}>
        {label}
      </span>

      {/* Arrow on hover */}
      {!isSignOut && hovered && (
        <span style={{
          marginLeft: 'auto',
          fontSize: '11px',
          color: '#C9A84C',
          opacity: 0.7
        }}>
          →
        </span>
      )}
    </div>
  );
};

// User Dropdown Component
const UserDropdown = ({
  user, avatarUrl, initial,
  fullName, onClose,
  navigate, onSignOut
}) => {

  const menuItems = [
    { icon: FiUser,      label: 'My Profile',   tab: 'settings'  },
    { icon: FiGrid,      label: 'Dashboard',    tab: 'overview'  },
    { icon: FiHeart,     label: 'Wishlist',     tab: 'wishlist'  },
    { icon: FiClipboard, label: 'My Bookings',  tab: 'bookings'  },
    { icon: FiSettings,  label: 'Settings',     tab: 'settings'  }
  ];

  const handleItemClick = (tab) => {
    navigate('/dashboard', {
      state: { activeTab: tab }
    });
    onClose();
  };

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 12px)',
      right: 0,
      background: 'white',
      borderRadius: '18px',
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow:
        '0 20px 60px rgba(0,0,0,0.14),' +
        '0 4px 16px rgba(0,0,0,0.06)',
      minWidth: '230px',
      padding: '8px',
      zIndex: 9999,
      animation: 'dropdownIn 0.2s ease'
    }}>

      {/* User header */}
      <div style={{
        padding: '14px 14px 16px',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #C9A84C',
              flexShrink: 0
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: '#C9A84C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            flexShrink: 0
          }}>
            {initial}
          </div>
        )}

        {/* Name + email */}
        <div style={{ 
          overflow: 'hidden',
          flex: 1
        }}>
          <p style={{
            fontSize: '15px',
            fontWeight: '400',
            color: '#1a1a1a',
            fontFamily: 'Fraunces, Georgia, serif',
            marginBottom: '3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {fullName}
          </p>
          <p style={{
            fontSize: '11px',
            color: '#9e9e9e',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '300',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {user?.email}
          </p>
        </div>
      </div>

      {/* Menu items */}
      <div style={{ padding: '2px 0 4px' }}>
        {menuItems.map((item) => (
          <DropdownItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            onClick={() => handleItemClick(item.tab)}
          />
        ))}
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'rgba(0,0,0,0.06)',
        margin: '4px 0'
      }}/>

      {/* Sign out */}
      <DropdownItem
        icon={FiLogOut}
        label="Sign Out"
        isSignOut={true}
        onClick={() => {
          onSignOut();
          onClose();
        }}
      />
    </div>
  );
};


// Plan a Trip CTA button component
const PlanATripButton = ({ onClick, scrolled }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? (scrolled ? '#C9A84C' : 'rgba(255,255,255,0.12)')
          : 'transparent',
        color: 'white',
        border: hovered
          ? (scrolled ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.5)')
          : '1px solid transparent',
        borderRadius: '999px',
        padding: '10px 22px',
        fontSize: '11px',
        fontWeight: '500',
        letterSpacing: '0.12em',
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      PLAN A TRIP
      <span style={{ fontSize: '12px' }}>→</span>
    </button>

  );
};

const Navbar = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const SOLID_NAV_ROUTES = [
    '/about',
    '/privacy',
    '/terms',
    '/help',
    '/safety',
    '/press',
    '/partners',
    '/careers',
    '/cookies',
    '/contact',
    '/blog',
    '/experiences'
  ];

  const isSolidNavRoute = SOLID_NAV_ROUTES.some(route => location.pathname.startsWith(route));
  const isNavScrolled = scrolled || isSolidNavRoute;

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const firstName = fullName.split(' ')[0];
  const initial = firstName.charAt(0).toUpperCase();
  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'DESTINATIONS', path: '/destinations' },
    { label: 'HOTELS', path: '/hotels' },
    { label: 'FLIGHTS', path: '/flights' },
    { label: 'EXPERIENCES', path: '/experiences' },
    { label: 'BLOG', path: '/blog' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 48px',
      transition: 'all 0.3s ease',
      background: isNavScrolled ? 'rgba(250,249,246,0.96)' : 'transparent',
      backdropFilter: isNavScrolled ? 'blur(12px)' : 'none',
      borderBottom: isNavScrolled ? '1px solid rgba(0,0,0,0.07)' : 'none',
      boxShadow: isNavScrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none'
    }}>

      {/* ── LEFT: LOGO ── */}
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: scrolled ? '1px solid rgba(0,0,0,0.15)' : '1px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isNavScrolled ? '#1a1a1a' : 'white',
          fontSize: '14px',
          transition: 'all 0.3s ease'
        }}>
          ⊕
        </div>
        <span style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: '18px',
          fontWeight: '400',
          color: isNavScrolled ? '#1a1a1a' : 'white',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em',
          transition: 'all 0.3s ease'
        }}>
          Compass & Co.
        </span>
      </div>

      {/* ── CENTER: NAV LINKS ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '28px',
        flex: 1,
        justifyContent: 'center'
      }}>
        {navLinks.map(link => (
          <NavLink
            key={link.path}
            link={link}
            isActive={isActive(link.path)}
            scrolled={isNavScrolled}
            navigate={navigate}
          />
        ))}
      </div>

      {/* ── RIGHT: AUTH + CTA ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexShrink: 0
      }}>
        {isAuthenticated ? (
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            {/* Clickable pill */}
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '5px 12px 5px 5px',
                borderRadius: '999px',
                border: dropdownOpen
                  ? (isNavScrolled ? '1px solid #C9A84C' : '1px solid rgba(255,255,255,0.4)')
                  : '1px solid transparent',
                background: dropdownOpen
                  ? (isNavScrolled ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.15)')
                  : 'transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!dropdownOpen) {
                  if (isNavScrolled) {
                    e.currentTarget.style.borderColor = '#C9A84C';
                    e.currentTarget.style.background = 'rgba(201,168,76,0.06)';
                  } else {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (!dropdownOpen) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}

            >
              {/* Avatar */}
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={firstName}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #C9A84C'
                  }}
                />
              ) : (
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#C9A84C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  flexShrink: 0
                }}>
                  {initial}
                </div>
              )}

              {/* Name */}
              <span style={{
                fontSize: '12px',
                fontWeight: '400',
                color: isNavScrolled ? '#1a1a1a' : 'white',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.02em',
                maxWidth: '80px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}>
                {firstName}
              </span>

              {/* Chevron */}
              <FiChevronDown style={{
                fontSize: '14px',
                color: isNavScrolled ? '#6b6b6b' : 'rgba(255,255,255,0.6)',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                marginLeft: '-2px'
              }} />
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <UserDropdown
                user={user}
                avatarUrl={avatarUrl}
                initial={initial}
                fullName={fullName}
                onClose={() => setDropdownOpen(false)}
                navigate={navigate}
                onSignOut={handleSignOut}
              />
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '0.1em',
              fontFamily: 'Inter, sans-serif',
              color: isNavScrolled ? '#1a1a1a' : 'rgba(255,255,255,0.65)',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 0',
              whiteSpace: 'nowrap'
            }}
          >
            Login
          </button>
        )}

        {/* ── PLAN A TRIP button ── */}
        <PlanATripButton
          onClick={() => navigate('/destinations')}
          scrolled={isNavScrolled}
        />
      </div>
    </nav>
  );
};

export default Navbar;


