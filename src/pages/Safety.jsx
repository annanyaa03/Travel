import { Link } from 'react-router-dom';
import './footerPages.css';

const tips = [
  {
    title: 'Research Entry Requirements',
    body: 'Check visa, passport validity, and health entry requirements well before your departure date. Requirements vary by nationality and destination and can change with minimal notice.',
  },
  {
    title: 'Purchase Comprehensive Travel Insurance',
    body: 'Ensure your policy covers medical emergencies, trip cancellations, baggage loss, and repatriation. Verify coverage limits and read exclusion clauses carefully before purchasing.',
  },
  {
    title: 'Register with Your Embassy',
    body: 'Many governments offer traveller registration services. Enrolling allows your embassy to contact you in the event of a natural disaster, civil unrest, or personal emergency.',
  },
  {
    title: 'Secure Important Documents',
    body: 'Carry physical and digital copies of your passport, insurance policy, emergency contacts, and booking confirmations. Store backups securely in a separate location from originals.',
  },
  {
    title: 'Monitor Local Conditions',
    body: 'Stay informed about local news, weather patterns, and political developments in your destination. Sign up for government travel alerts to receive updates in real time.',
  },
  {
    title: 'Practise Situational Awareness',
    body: 'Be mindful of your surroundings, particularly in crowded areas, transport hubs, and tourist-heavy sites. Keep valuables secured and avoid displaying expensive items in public.',
  },
  {
    title: 'Keep Emergency Contacts Accessible',
    body: 'Save the local emergency number, nearest hospital, your country\'s embassy, and our 24/7 support line offline on your device — do not rely solely on internet connectivity.',
  },
];

const govLinks = [
  { label: 'UK Foreign Travel Advice (GOV.UK)', url: 'https://www.gov.uk/foreign-travel-advice' },
  { label: 'US Travel Advisories (State.gov)', url: 'https://travel.state.gov' },
  { label: 'Australian Smart Traveller', url: 'https://www.smartraveller.gov.au' },
  { label: 'Canada Travel Advisories', url: 'https://travel.gc.ca' },
  { label: 'WHO International Travel Health', url: 'https://www.who.int/travel-advice' },
];

export default function Safety() {
  return (
    <div className="fp-page">


      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Support</p>
          <h1 className="fp-h1">Travel Safety</h1>
          <p className="fp-lead">
            Your safety is our priority. Travelling well means travelling prepared. Below you
            will find essential safety guidance and links to official government resources to
            help you stay informed and confident throughout your journey.
          </p>
        </header>

        <section className="fp-section" aria-labelledby="tips-heading">
          <h2 className="fp-h2" id="tips-heading">Safety Guidelines</h2>
          <div className="fp-tips-grid">
            {tips.map((tip, i) => (
              <div key={tip.title} className="fp-tip-item">
                <span className="fp-tip-num">0{i + 1}</span>
                <div className="fp-tip-body">
                  <h3>{tip.title}</h3>
                  <p>{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="gov-heading">
          <h2 className="fp-h2" id="gov-heading">Official Resources</h2>
          <p className="fp-p">
            The following government and international health authorities publish up-to-date
            travel advisories, health requirements, and safety alerts. We recommend consulting
            these resources before and during your trip.
          </p>
          <div className="fp-gov-links">
            {govLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="fp-gov-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="emergency-heading">
          <h2 className="fp-h2" id="emergency-heading">Emergency Contact</h2>
          <p className="fp-p">
            If you face an emergency during your trip and require immediate assistance, contact
            our 24-hour support line at{' '}
            <a href="tel:+12345678890" className="fp-link">+1 234 567 890</a> or email{' '}
            <a href="mailto:support@compassco.com" className="fp-link">support@compassco.com</a>.
            Always contact local emergency services first in life-threatening situations.
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
