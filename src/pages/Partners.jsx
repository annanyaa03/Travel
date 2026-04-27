import { Link } from 'react-router-dom';
import './footerPages.css';

const partners = [
  { name: 'Four Seasons Hotels', type: 'Hospitality', region: 'Global' },
  { name: 'Aman Resorts', type: 'Hospitality', region: 'Global' },
  { name: 'Emirates', type: 'Aviation', region: 'Global' },
  { name: 'Singapore Airlines', type: 'Aviation', region: 'Asia-Pacific' },
  { name: 'Avis Budget Group', type: 'Ground Transport', region: 'Global' },
  { name: 'Abercrombie & Kent', type: 'Guided Expeditions', region: 'Africa & Americas' },
  { name: 'Intrepid Travel', type: 'Sustainable Tours', region: 'Global' },
  { name: 'Belmond', type: 'Hospitality & Rail', region: 'Europe & South America' },
  { name: 'G Adventures', type: 'Adventure Tours', region: 'Global' },
  { name: 'Trafalgar', type: 'Group Travel', region: 'Europe & Americas' },
  { name: 'The Ritz-Carlton', type: 'Hospitality', region: 'Global' },
  { name: 'National Geographic Expeditions', type: 'Curated Expeditions', region: 'Global' },
];

export default function Partners() {
  return (
    <div className="fp-page">
      <nav className="fp-topnav" aria-label="Page navigation">
        <Link to="/" className="fp-brand">Compass &amp; Co.</Link>
        <Link to="/" className="fp-back-link">Back to Home</Link>
      </nav>

      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Company</p>
          <h1 className="fp-h1">Our Partners</h1>
          <p className="fp-lead">
            We collaborate with world-class hotels, airlines, and local guides to provide
            unparalleled experiences. Each partnership is built on a shared commitment to
            quality, integrity, and exceptional service. Our partners are selected rigorously
            and reviewed continuously to ensure they meet our standards.
          </p>
        </header>

        <section className="fp-section" aria-labelledby="partners-heading">
          <h2 className="fp-h2" id="partners-heading">Our Partner Network</h2>
          <div className="fp-partners-grid">
            {partners.map((p) => (
              <div key={p.name} className="fp-partner-item">
                <div className="fp-partner-name">{p.name}</div>
                <div className="fp-partner-type">{p.type} &middot; {p.region}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="become-heading">
          <h2 className="fp-h2" id="become-heading">Become a Partner</h2>
          <p className="fp-p">
            We are always open to partnerships with operators, hoteliers, and experience providers
            who share our values. Our network spans hotels, airlines, tour operators, and local
            guides who meet our standards for quality, sustainability, and guest experience.
          </p>
          <p className="fp-p">
            To explore a partnership, please contact our partnerships team at{' '}
            <a href="mailto:partners@compassco.com" className="fp-link">partners@compassco.com</a>.
            Include a brief overview of your offering and the regions you serve.
          </p>
        </section>
      </main>

      <footer className="fp-footer">
        <span>&copy; {new Date().getFullYear()} Compass &amp; Co. All rights reserved.</span>
        <Link to="/contact">Contact Us</Link>
      </footer>
    </div>
  );
}
