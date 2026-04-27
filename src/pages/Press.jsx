import { Link } from 'react-router-dom';
import './footerPages.css';

const pressItems = [
  {
    outlet: 'The Financial Times',
    headline: 'How Compass & Co. is redefining luxury travel for the post-pandemic era',
    date: 'March 2025',
    url: 'https://www.ft.com',
  },
  {
    outlet: 'Conde Nast Traveller',
    headline: 'The boutique platforms challenging the travel industry\'s biggest names',
    date: 'January 2025',
    url: 'https://www.cntraveller.com',
  },
  {
    outlet: 'Forbes Travel Guide',
    headline: 'Compass & Co. named among the 50 most innovative travel companies of the year',
    date: 'November 2024',
    url: 'https://www.forbes.com',
  },
  {
    outlet: 'Vogue Living',
    headline: 'The art of going somewhere extraordinary: inside the world of bespoke travel',
    date: 'September 2024',
    url: 'https://www.vogue.com',
  },
  {
    outlet: 'BBC Travel',
    headline: 'These platforms are making personalised travel accessible to more people',
    date: 'July 2024',
    url: 'https://www.bbc.com/travel',
  },
  {
    outlet: 'Wired',
    headline: 'AI-powered concierge services: Compass & Co. leads the way',
    date: 'April 2024',
    url: 'https://www.wired.com',
  },
];

export default function Press() {
  return (
    <div className="fp-page">
      <nav className="fp-topnav" aria-label="Page navigation">
        <Link to="/" className="fp-brand">Compass &amp; Co.</Link>
        <Link to="/" className="fp-back-link">Back to Home</Link>
      </nav>

      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Company</p>
          <h1 className="fp-h1">In the Press</h1>
          <p className="fp-lead">
            Compass &amp; Co. is recognised by leading media outlets for innovation in travel
            technology and personalised experiences. We are proud to be covered by some of the
            world&apos;s most respected publications in luxury, culture, and business.
          </p>
        </header>

        <section className="fp-section" aria-labelledby="coverage-heading">
          <h2 className="fp-h2" id="coverage-heading">Latest Coverage</h2>
          <div className="fp-press-list">
            {pressItems.map((item) => (
              <article key={item.headline} className="fp-press-item">
                <span className="fp-press-outlet">{item.outlet}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fp-press-headline"
                >
                  {item.headline}
                </a>
                <span className="fp-press-date">{item.date}</span>
              </article>
            ))}
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="media-heading">
          <h2 className="fp-h2" id="media-heading">Media Enquiries</h2>
          <p className="fp-p">
            For press requests, interview arrangements, brand assets, or additional information,
            please contact our communications team directly.
          </p>
          <p className="fp-p">
            Email:{' '}
            <a href="mailto:press@compassco.com" className="fp-link">press@compassco.com</a>
            <br />
            Response time: within two business days.
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
