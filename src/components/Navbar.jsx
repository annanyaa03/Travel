import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Individual nav link component
const NavLink = ({ link, isActive, navigate }) => {
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
        color: isActive
          ? 'white'
          : hovered
          ? 'white'
          : 'rgba(255,255,255,0.55)',
        transition: 'color 0.2s ease',
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

// User avatar pill component
const UserPill = ({ 
  avatarUrl, initial, 
  firstName, onClick 
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        padding: '4px 12px 4px 4px',
        borderRadius: '999px',
        border: hovered
          ? '1px solid #C9A84C'
          : '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.06)',
        transition: 'all 0.2s ease'
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
          onError={(e) => {
            e.target.style.display = 'none';
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
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.02em',
        maxWidth: '80px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {firstName}
      </span>
    </div>
  );
};

// Small text button component
const NavTextButton = ({ 
  label, onClick, 
  color, hoverColor, icon 
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: '400',
        letterSpacing: '0.1em',
        fontFamily: 'Inter, sans-serif',
        color: hovered ? hoverColor : color,
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '4px 0',
        whiteSpace: 'nowrap'
      }}
    >
      {icon && (
        <span style={{ fontSize: '13px' }}>
          {icon}
        </span>
      )}
      {label}
    </button>
  );
};

// Plan a Trip CTA button component
const PlanATripButton = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? '#C9A84C' : '#1a1a1a',
        color: 'white',
        border: hovered
          ? '1px solid #C9A84C'
          : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '999px',
        padding: '10px 22px',
        fontSize: '11px',
        fontWeight: '500',
        letterSpacing: '0.1em',
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.25s ease',
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
      position: 'sticky',
      top: 0,
      zIndex: 999,
      background: 'rgba(15,15,15,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 40px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
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
        {/* Compass icon */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px'
        }}>
          ⊕
        </div>
        <span style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: '18px',
          fontWeight: '400',
          color: 'white',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em'
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
            navigate={navigate}
          />
        ))}
      </div>

      {/* ── RIGHT: AUTH + CTA ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0
      }}>
        {isAuthenticated ? (
          /* ── LOGGED IN ── */
          <>
            {/* User pill: avatar + name */}
            <UserPill
              avatarUrl={avatarUrl}
              initial={initial}
              firstName={firstName}
              onClick={() => navigate('/dashboard')}
            />

            {/* Dashboard link */}
            <NavTextButton
              label="Dashboard"
              onClick={() => navigate('/dashboard')}
              color="rgba(255,255,255,0.7)"
              hoverColor="#C9A84C"
            />

            {/* Divider */}
            <div style={{
              width: '1px',
              height: '14px',
              background: 'rgba(255,255,255,0.15)'
            }}/>

            {/* Sign out */}
            <NavTextButton
              label="Sign out"
              onClick={handleSignOut}
              color="rgba(255,255,255,0.4)"
              hoverColor="#ef4444"
            />
          </>
        ) : (
          /* ── LOGGED OUT ── */
          <>
            {/* Login */}
            <NavTextButton
              label="Login"
              onClick={() => navigate('/login')}
              color="rgba(255,255,255,0.65)"
              hoverColor="white"
              icon="👤"
            />
          </>
        )}

        {/* ── PLAN A TRIP button ── */}
        <PlanATripButton
          onClick={() => navigate('/destinations')}
        />
      </div>
    </nav>
  );
};

export default Navbar;
