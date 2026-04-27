import React, { useState } from 'react';
import { FaRegClock, FaRegEye, FaArrowRight } from 'react-icons/fa6';
import './TravelInspiration.css';

const articlesData = [
  {
    numeral: 'i.',
    category: 'DESTINATIONS',
    title: '10 Hidden Gems in Southeast Asia',
    author: 'Sarah Jenkins',
    date: 'Mar 12, 2026',
    readTime: '4 min',
    views: '1.2k',
    excerpt: 'Discover secluded lagoons in Palawan and ancient misty temples in Northern Laos away from the crowds.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800', 
    link: 'https://www.sandinmyshoe.com/asia/southeast-asia-places-to-go/'
  },
  {
    numeral: 'ii.',
    category: 'TIPS',
    title: 'The Ultimate Bali Packing Guide',
    author: 'Marcus Chen',
    date: 'Mar 10, 2026',
    readTime: '6 min',
    views: '2.4k',
    excerpt: 'From breathable linens to essential reef-safe sunscreen, we break down your tropical essentials.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800', 
    link: 'https://bali.com/bali/travel-guide/practical-tips-must-know/packing-list-suitcase/'
  },
  {
    numeral: 'iii.',
    category: 'FOOD',
    title: 'Street Food Guide: Tokyo to Marrakesh',
    author: 'Aria Thorne',
    date: 'Mar 8, 2026',
    readTime: '5 min',
    views: '3.1k',
    excerpt: 'A culinary journey through Tsukijis freshest sashimi and the smoky tagines of Jemaa el-Fnaa.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', 
    link: 'https://foodiejapan.com/tokyo/tokyo-street-food-markets/'
  },
  {
    numeral: 'iv.',
    category: 'CULTURE',
    title: 'Festival Season: Japans Most Sacred Rituals',
    author: 'Keiko Mori',
    date: 'Mar 5, 2026',
    readTime: '7 min',
    views: '4.8k',
    excerpt: 'Understanding the deep spiritual significance behind Gion Matsuri and ancient fire festivals.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800', 
    link: 'https://www.japan-guide.com/e/e2063.html'
  }
];

const categories = ['ALL', 'DESTINATIONS', 'TIPS', 'FOOD', 'CULTURE'];

export default function TravelInspiration() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredArticles = activeFilter === 'ALL' 
    ? articlesData 
    : articlesData.filter(a => a.category === activeFilter);

  return (
    <section className="ti-section">
      <div className="ti-container">
        {/* Header */}
        <div className="ti-header">
          <div className="ti-title-box">
            <h2 className="animate-fade-in">
              <span className="ti-title-main">Travel</span>
              <span className="ti-title-accent">Inspiration</span>
            </h2>
            <p className="ti-subtitle">Curated stories and expert guides for the modern explorer</p>
            <div className="ti-title-line"></div>
          </div>
          <div className="ti-view-all">View All Articles &rarr;</div>
        </div>

        {/* Filter Pills */}
        <div className="ti-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`ti-filter-pill ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Table/List */}
        <div className="ti-articles-list">
          {filteredArticles.map((article, index) => (
            <div 
              key={article.title} 
              className="ti-article-row animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
              onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}
            >
              {/* Number Column */}
              <div className="ti-number-col">
                {article.numeral}
              </div>

              {/* Content Column */}
              <div className="ti-content-col">
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ cursor: 'pointer', display: 'block' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="ti-thumb-box">
                    <img src={article.image} alt={article.title} />
                  </div>
                </a>
                <div className="ti-text-box">
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="ti-category">{article.category}</span>
                  </a>
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="ti-article-title">{article.title}</h3>
                  </a>
                  <div className="ti-excerpt">{article.excerpt}</div>
                  <span className="ti-byline">{article.author} &middot; {article.date}</span>
                </div>
              </div>

              {/* Stats Column */}
              <div className="ti-stats-col">
                <div className="ti-stats-info">
                  <div className="ti-stat-item">
                    <FaRegClock /> <span>{article.readTime}</span>
                  </div>
                  <div className="ti-stat-item">
                    <FaRegEye /> <span>{article.views}</span>
                  </div>
                </div>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="ti-arrow-btn">
                    <FaArrowRight size={14} />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Stories Button */}
        <div className="ti-loadmore-container" style={{ marginTop: '48px', textAlign: 'center' }}>
          <button 
            className="ti-loadmore-btn"
            style={{
              padding: '12px 32px',
              backgroundColor: 'transparent',
              border: '1px solid #1a1a18',
              borderRadius: '2px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#1a1a18',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a18';
              e.currentTarget.style.color = '#F5F0E8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#1a1a18';
            }}
          >
            LOAD MORE STORIES
          </button>
        </div>
      </div>
    </section>
  );
}
