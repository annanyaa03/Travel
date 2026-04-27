import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import { 
  FiGrid, 
  FiMap, 
  FiHeart, 
  FiFileText, 
  FiNavigation, 
  FiHome, 
  FiSettings, 
  FiBell, 
  FiGlobe, 
  FiBookOpen, 
  FiLogOut, 
  FiChevronRight,
  FiPlusCircle,
  FiSearch,
  FiCamera,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi';

// --- SUB-COMPONENTS ---

const Sidebar = ({ activeTab, onTabChange, onSignOut, fullName, email, avatarUrl, initials, navigate }) => {
  const navItems = [
    { id: 'overview',    icon: <FiGrid size={18} />, label: 'Overview' },
    { id: 'trips',       icon: <FiMap size={18} />, label: 'My Trips' },
    { id: 'wishlist',    icon: <FiHeart size={18} />, label: 'Wishlist' },
    { id: 'bookings',    icon: <FiFileText size={18} />, label: 'Bookings' },
    { id: 'flights',     icon: <FiNavigation size={18} />, label: 'Flights' },
    { id: 'hotels',      icon: <FiHome size={18} />, label: 'Hotels' },
    { id: 'settings',    icon: <FiSettings size={18} />, label: 'Settings' }
  ];

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      background: '#0f0f0f',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      zIndex: 100,
      bottom: 0,
      overflowY: 'auto'
    }}>
      {/* Brand */}
      <div style={{ padding: '32px 28px 40px', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FiPlusCircle size={22} color="#C9A84C" />
          <span style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', letterSpacing: '0.05em' }}>Compass</span>
        </div>
      </div>

      {/* User Card */}
      <div style={{ padding: '0 20px 32px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={fullName} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>
            {initials}
          </div>
        )}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '14px', fontWeight: '400', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fullName}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</div>
        </div>
      </div>

      {/* Nav Menu */}
      <div style={{ padding: '20px 0', flex: 1, overflowY: 'auto' }}>
        {navItems.map(item => (
          <div
            key={item.id}
            onClick={() => onTabChange(item.id)}
            style={{
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              margin: '2px 12px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '300',
              fontFamily: 'Inter, sans-serif',
              background: activeTab === item.id ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === item.id ? '#C9A84C' : 'rgba(255,255,255,0.45)',
              border: activeTab === item.id ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
              }
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom Sign Out */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
        <div
          onClick={onSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.35)',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >
          <FiLogOut size={14} />
          <span>Sign out</span>
        </div>
      </div>
    </div>
  );
};

const TopBar = ({ greeting, firstName, date }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
    <div>
      <div style={{ fontSize: '10px', color: '#C9A84C', letterSpacing: '0.15em', fontWeight: '600', marginBottom: '8px' }}>COMPASS & CO. MEMBER</div>
      <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '38px', fontWeight: '300', color: '#1a1a1a', margin: 0, letterSpacing: '-0.02em' }}>
        {greeting}, {firstName}
      </h1>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '13px', color: '#9e9e9e', fontWeight: '300' }}>{date}</div>
      </div>
      <div
        style={{
          width: '40px',
          height: '40px',
          background: 'white',
          borderRadius: '50%',
          border: '1px solid rgba(0,0,0,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.25s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#C9A84C'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'}
      >
        <FiBell size={18} color="#4a4a4a" />
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, label, number, trend }) => (
  <div
    style={{
      background: 'transparent',
      borderRadius: '0',
      padding: '24px',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'white';
      e.currentTarget.style.borderBottomColor = '#C9A84C';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.08)';
    }}
  >
    <div style={{ fontSize: '20px', marginBottom: '16px' }}>{icon}</div>
    <div style={{ fontFamily: 'Fraunces, serif', fontSize: '42px', fontWeight: '300', color: '#1a1a1a', marginBottom: '8px' }}>{number}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: '12px', color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
      <div style={{ fontSize: '11px', color: '#C9A84C' }}>{trend}</div>
    </div>
  </div>
);


const OverviewTab = ({ user, destinations, bookings, wishlist, currentQuote, quotes, navigate }) => {
  return (
    <div>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
        <StatCard icon={<FiNavigation size={20} color="#C9A84C" />} label="Trips" number={bookings.length} trend="+0 this year" />
        <StatCard icon={<FiGlobe size={20} color="#C9A84C" />} label="Countries" number="0" trend="Explored" />
        <StatCard icon={<FiHeart size={20} color="#C9A84C" />} label="Wishlist" number={wishlist.length} trend="Saved places" />
        <StatCard icon={<FiFileText size={20} color="#C9A84C" />} label="Bookings" number={bookings.filter(b => b.status === 'upcoming').length} trend="Upcoming" />
      </div>

      {/* Two Column Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', gap: '48px', marginBottom: '48px' }}>
        {/* Featured Destinations */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', margin: 0 }}>Explore Destinations</h2>
              <p style={{ color: '#9e9e9e', fontSize: '13px', margin: '4px 0 0' }}>Handpicked gems for your next journey</p>
            </div>
            <span style={{ color: '#C9A84C', fontSize: '13px', cursor: 'pointer' }} onClick={() => navigate('/destinations')}>View all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {destinations.length > 0 ? destinations.map(dest => (
              <div key={dest.id} style={{ height: '160px', borderRadius: '14px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
                <img 
                  src={dest.image || dest.image_url} 
                  alt={dest.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} 
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} 
                  onError={(e) => {
                    const fallbacks = {
                      'Cusco': 'https://images.pexels.com/photos/3889891/pexels-photo-3889891.jpeg?auto=compress&cs=tinysrgb&w=1920',
                      'Tbilisi': 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1920',
                      'Cartagena': 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1920',
                    };
                    e.target.src = fallbacks[dest.name] || 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1920';
                    e.target.onerror = null;
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', color: 'white' }}>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: '16px' }}>{dest.name}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>{dest.country}</div>
                </div>
              </div>
            )) : (
              [1,2,3].map(i => (
                <div key={i} style={{ height: '160px', borderRadius: '14px', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                  Destination {i}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', marginBottom: '24px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Quick Action Item */}
            {[
              { icon: <FiSearch />, label: 'Search Flights', path: '/flights' },
              { icon: <FiHome />, label: 'Find Hotels', path: '/hotels' },
              { icon: <FiGlobe />, label: 'Browse Destinations', path: '/destinations' },
              { icon: <FiBookOpen />, label: 'Read Travel Journal', path: '/blog' }
            ].map(action => (
              <div
                key={action.label}
                onClick={() => navigate(action.path)}
                style={{
                  background: 'transparent',
                  borderRadius: '0',
                  padding: '18px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '12px';
                  e.currentTarget.style.paddingRight = '12px';
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.querySelector('.arrow').style.color = '#C9A84C';
                  e.currentTarget.querySelector('.arrow').style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '0';
                  e.currentTarget.style.paddingRight = '0';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#1a1a1a';
                  e.currentTarget.querySelector('.arrow').style.color = '#9e9e9e';
                  e.currentTarget.querySelector('.arrow').style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>{action.icon}</span>
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: '14px' }}>{action.label}</span>
                </div>
                <span className="arrow" style={{ color: '#9e9e9e', transition: 'all 0.2s ease' }}><FiChevronRight /></span>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Recent Activity & Quote */}
      <div style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', gap: '48px' }}>
        {/* Recent Activity */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '64px', 
            background: 'transparent', 
            borderRadius: '0', 
            border: '1px solid rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#C9A84C';
            e.currentTarget.style.background = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <div style={{ marginBottom: '24px' }}><FiNavigation size={48} color="#C9A84C" /></div>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', color: '#4a4a4a', margin: '0 0 12px' }}>Your journey begins here</h3>
          <p style={{ color: '#9e9e9e', fontSize: '13px', margin: 0, textAlign: 'center', maxWidth: '280px' }}>
            Start exploring destinations, saving hotels, and booking your dream trips.
          </p>
        </div>


        {/* Travel Quote */}
        <div style={{ background: '#0f0f0f', borderRadius: '0', padding: '36px 32px', position: 'relative', overflow: 'hidden', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          <div style={{ transition: 'opacity 0.5s ease', opacity: 1 }}>
            <blockquote style={{ margin: 0, fontFamily: 'Fraunces, serif', fontSize: '20px', fontWeight: '300', fontStyle: 'italic', color: 'white', lineHeight: '1.6', marginBottom: '20px' }}>
              "{quotes[currentQuote].text}"
            </blockquote>
            <div style={{ fontSize: '12px', color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {quotes[currentQuote].author}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '32px' }}>
            {quotes.map((_, i) => (
              <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === currentQuote ? '#C9A84C' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsTab = ({ user, avatarUrl, initials, fullName, activeToggles, setActiveToggles, onSignOut }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [localAvatar, setLocalAvatar] = useState(avatarUrl || null);
  const fileInputRef = useRef(null);

  const toggleItem = (key) => {
    setActiveToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a JPG, PNG, or WebP image');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be smaller than 5MB');
      return;
    }

    setUploadLoading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      // Show preview immediately
      const preview = URL.createObjectURL(file);
      setLocalAvatar(preview);

      // Create unique filename
      const fileExt = file.name.split('.').pop().toLowerCase();
      const fileName = `avatar_${user.id}_${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadErr) throw uploadErr;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // Update Supabase Auth user metadata
      const { error: updateErr } = await supabase.auth.updateUser({
        data: {
          avatar_url: publicUrl,
          full_name: user?.user_metadata?.full_name
        }
      });

      if (updateErr) throw updateErr;

      // Update local state
      setLocalAvatar(publicUrl);
      setUploadSuccess('Profile photo updated!');

      // Clear success after 3 seconds
      setTimeout(() => {
        setUploadSuccess('');
      }, 3000);


      // Refresh session to get new avatar
      await supabase.auth.refreshSession();

    } catch (err) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Upload failed. Try again.');
      // Revert preview on error
      setLocalAvatar(avatarUrl || null);
    } finally {
      setUploadLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Profile Section */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', marginBottom: '32px' }}>Profile Details</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            {/* ── AVATAR CIRCLE (clickable) ── */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'relative',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {/* Avatar image or initial */}
              {localAvatar || avatarUrl ? (
                <img
                  src={localAvatar || avatarUrl}
                  alt={fullName}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #C9A84C',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#C9A84C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  border: '3px solid #C9A84C'
                }}>
                  {initials}
                </div>
              )}

              {/* Hover overlay with camera icon */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: uploadLoading ? 1 : 0,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!uploadLoading) e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  if (!uploadLoading) e.currentTarget.style.opacity = '0';
                }}
              >
                {uploadLoading ? (
                  /* Loading spinner */
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}/>
                ) : (
                  /* Camera icon */
                  <>
                    <FiCamera style={{ fontSize: '20px', color: 'white', marginBottom: '2px' }} />
                    <span style={{
                      fontSize: '9px',
                      color: 'white',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}>Change</span>
                  </>
                )}

              </div>
            </div>

            {/* ── HIDDEN FILE INPUT ── */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
            />

            {/* ── EDIT PHOTO BUTTON (clickable) ── */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadLoading}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: uploadLoading ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                color: uploadLoading ? '#b0b0b0' : '#9e9e9e',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                letterSpacing: '0.02em',
                padding: '2px 0',
                transition: 'color 0.2s ease',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                textDecorationColor: 'rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                if (!uploadLoading) e.currentTarget.style.color = '#C9A84C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9e9e9e';
              }}
            >
              {uploadLoading ? 'Uploading...' : 'Edit Photo'}
            </button>

            {/* ── SUCCESS MESSAGE ── */}
            {uploadSuccess && (
              <p style={{
                fontSize: '12px',
                color: '#16a34a',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                justifyContent: 'center'
              }}>
                <FiCheckCircle size={14} /> {uploadSuccess}
              </p>
            )}


            {/* ── ERROR MESSAGE ── */}
            {uploadError && (
              <p style={{
                fontSize: '12px',
                color: '#dc2626',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '300',
                textAlign: 'center',
                maxWidth: '160px',
                lineHeight: '1.4',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                justifyContent: 'center'
              }}>
                <FiAlertCircle size={14} /> {uploadError}
              </p>
            )}

          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Full Name</div>
              <div style={{ fontSize: '14px', color: '#1a1a1a' }}>{fullName}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Email Address</div>
              <div style={{ fontSize: '14px', color: '#1a1a1a' }}>{user?.email}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Member Since</div>
              <div style={{ fontSize: '14px', color: '#1a1a1a' }}>{formatDate(user?.created_at)}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Auth Method</div>
              <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '999px', background: 'rgba(0,0,0,0.05)', fontSize: '11px', color: '#4a4a4a' }}>
                {user?.app_metadata?.provider === 'google' ? 'Google Account' : 'Email/Password'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', marginBottom: '32px' }}>Preferences</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { key: 'emailNotifications', label: 'Email Notifications' },
            { key: 'tripReminders', label: 'Trip Reminders' },
            { key: 'newsletter', label: 'Bespoke Newsletter' },
            { key: 'priceAlerts', label: 'Flight Price Alerts' }
          ].map(pref => (
            <div key={pref.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#1a1a1a' }}>{pref.label}</span>
              <div
                onClick={() => toggleItem(pref.key)}
                style={{
                  width: '40px',
                  height: '20px',
                  borderRadius: '20px',
                  background: activeToggles[pref.key] ? '#C9A84C' : '#e5e5e5',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  top: '2px',
                  left: activeToggles[pref.key] ? '22px' : '2px',
                  transition: 'left 0.3s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Section */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', marginBottom: '24px' }}>Account</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <button style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'white', fontSize: '13px', cursor: 'pointer' }}>Privacy Policy</button>
          <button style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'white', fontSize: '13px', cursor: 'pointer' }}>Terms of Service</button>
          <button style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #ff4444', color: '#ff4444', background: 'white', fontSize: '13px', cursor: 'pointer' }}>Delete Account</button>
          <button onClick={onSignOut} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #1a1a1a', background: '#1a1a1a', color: 'white', fontSize: '13px', cursor: 'pointer' }}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

const EmptyTab = ({ icon, title, description, btnLabel, onBtnClick }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0' }}>
    <div style={{ marginBottom: '24px' }}>{icon}</div>
    <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', margin: '0 0 12px' }}>{title}</h2>
    <p style={{ color: '#9e9e9e', fontSize: '14px', margin: '0 0 32px', maxWidth: '320px', textAlign: 'center' }}>{description}</p>
    <button
      onClick={onBtnClick}
      style={{
        background: '#1a1a1a',
        color: 'white',
        borderRadius: '999px',
        padding: '14px 32px',
        border: 'none',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background 0.25s ease'
      }}
      onMouseEnter={(e) => e.target.style.background = '#C9A84C'}
      onMouseLeave={(e) => e.target.style.background = '#1a1a1a'}
    >
      {btnLabel}
    </button>
  </div>
);

// --- MAIN DASHBOARD COMPONENT ---

const quotes = [
  { text: "The world is a book and those who do not travel read only one page.", author: "Saint Augustine" },
  { text: "Travel is the only thing you buy that makes you richer.", author: "Anonymous" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "To travel is to live.", author: "Hans Christian Andersen" },
  { text: "Life is short and the world is wide.", author: "Simon Raven" },
  { text: "Adventure is worthwhile in itself.", author: "Amelia Earhart" }
];

const fallbackDestinations = [
  {
    id: 'f1',
    name: 'Santorini',
    city: 'Santorini',
    country: 'Greece',
    category: 'Europe',
    slug: 'santorini-greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  },
  {
    id: 'f2',
    name: 'Kyoto',
    city: 'Kyoto',
    country: 'Japan',
    category: 'Asia',
    slug: 'kyoto-japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  },
  {
    id: 'f3',
    name: 'Maldives',
    city: 'Malé',
    country: 'Maldives',
    category: 'Islands',
    slug: 'maldives',
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  }
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || 'overview'
  );
  
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [activeToggles, setActiveToggles] = useState({
    emailNotifications: true,
    tripReminders: true,
    newsletter: false,
    priceAlerts: true
  });

  // Handle navigation to dashboard when already ON dashboard or from outside
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      // Clear the state so back button works correctly without re-triggering the tab
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Get user info
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Traveller';
  const firstName = fullName.split(' ')[0];
  const avatarUrl = user?.user_metadata?.avatar_url;
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Format today's date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fetch featured destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('/api/destinations?featured=true&limit=3');
        const data = await res.json();
        
        if (data.data && data.data.length > 0) {
          // Filter out entries with clearly broken/missing images if any
          const validDests = data.data.filter(d => d.image_url || d.image);
          setDestinations(validDests.length > 0 ? validDests : fallbackDestinations);
        } else {
          setDestinations(fallbackDestinations);
        }
      } catch (err) {
        setDestinations(fallbackDestinations);
      }
    };
    fetchDestinations();
  }, []);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(q => (q + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };


  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      width: '100%',
      position: 'relative',
      background: '#FAF9F6', 
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={handleSignOut}
        fullName={fullName}
        email={user?.email}
        avatarUrl={avatarUrl}
        initials={initials}
        navigate={navigate}
      />

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, marginLeft: '240px', padding: '48px 52px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <TopBar greeting={getGreeting()} firstName={firstName} date={todayFormatted} />

          {/* TAB CONTENT WITH FADE */}
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            {activeTab === 'overview' && (
              <OverviewTab
                user={user}
                destinations={destinations}
                bookings={bookings}
                wishlist={wishlist}
                currentQuote={currentQuote}
                quotes={quotes}
                navigate={navigate}
              />
            )}
            {activeTab === 'trips' && (
              <EmptyTab
                icon={<FiNavigation size={64} color="#C9A84C" />}
                title="No trips planned yet"
                description="Start exploring and save your dream destinations to build your first trip."
                btnLabel="Browse Destinations"
                onBtnClick={() => navigate('/destinations')}
              />
            )}
            {activeTab === 'wishlist' && (
              <EmptyTab
                icon={<FiHeart size={64} color="#C9A84C" />}
                title="Your wishlist is empty"
                description="Heart destinations you love while browsing to save them here."
                btnLabel="Explore Destinations"
                onBtnClick={() => navigate('/destinations')}
              />
            )}
            {activeTab === 'bookings' && (
              <EmptyTab
                icon={<FiFileText size={64} color="#C9A84C" />}
                title="No bookings yet"
                description="Start planning your first trip with our curated collections."
                btnLabel="Search Hotels"
                onBtnClick={() => navigate('/hotels')}
              />
            )}
            {activeTab === 'flights' && (
              <div style={{ background: 'white', borderRadius: '20px', padding: '40px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', marginBottom: '32px' }}>Search Flights</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '16px', background: '#f9f9f9', padding: '24px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '10px', color: '#9e9e9e', fontWeight: '600' }}>FROM</label>
                    <input type="text" placeholder="New York" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '10px', color: '#9e9e9e', fontWeight: '600' }}>TO</label>
                    <input type="text" placeholder="London" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '10px', color: '#9e9e9e', fontWeight: '600' }}>DATE</label>
                    <input type="date" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button style={{ background: '#1a1a1a', color: 'white', padding: '14px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>SEARCH</button>
                  </div>
                </div>
                <div style={{ marginTop: '40px' }}>
                  <h3 style={{ fontSize: '13px', color: '#9e9e9e', fontWeight: '400', marginBottom: '16px' }}>RECENT SEARCHES</h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ padding: '8px 16px', borderRadius: '999px', border: '1px solid #eee', fontSize: '12px', color: '#4a4a4a' }}>JFK → LHR · Jan 15</div>
                    <div style={{ padding: '8px 16px', borderRadius: '999px', border: '1px solid #eee', fontSize: '12px', color: '#4a4a4a' }}>SIN → DXB · Feb 2</div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'hotels' && (
              <div style={{ background: 'white', borderRadius: '20px', padding: '40px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', marginBottom: '32px' }}>Find Your Stay</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '12px', background: '#f9f9f9', padding: '24px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '10px', color: '#9e9e9e', fontWeight: '600' }}>DESTINATION</label>
                    <input type="text" placeholder="Paris" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '10px', color: '#9e9e9e', fontWeight: '600' }}>CHECK IN</label>
                    <input type="date" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '10px', color: '#9e9e9e', fontWeight: '600' }}>CHECK OUT</label>
                    <input type="date" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '10px', color: '#9e9e9e', fontWeight: '600' }}>GUESTS</label>
                    <input type="number" placeholder="2" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #eee', background: 'white' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button style={{ background: '#1a1a1a', color: 'white', padding: '14px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>FIND</button>
                  </div>
                </div>
                <div style={{ marginTop: '40px' }}>
                  <h3 style={{ fontSize: '13px', color: '#9e9e9e', fontWeight: '400', marginBottom: '16px' }}>POPULAR DESTINATIONS</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {['Paris', 'Tokyo', 'Dubai', 'London', 'Bali', 'Maldives'].map(city => (
                      <div key={city} style={{ padding: '8px 16px', borderRadius: '999px', border: '1px solid #eee', fontSize: '12px', color: '#4a4a4a', cursor: 'pointer' }}>{city}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <SettingsTab
                user={user}
                avatarUrl={avatarUrl}
                initials={initials}
                fullName={fullName}
                activeToggles={activeToggles}
                setActiveToggles={setActiveToggles}
                onSignOut={handleSignOut}
              />
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
