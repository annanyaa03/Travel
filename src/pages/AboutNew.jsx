import { Link } from 'react-router-dom';
import './footerPages.css';

const values = [
  {
    title: 'Authenticity',
    desc: 'We curate only what we have personally verified and experienced. Every recommendation reflects our genuine commitment to quality.',
  },
  {
    title: 'Sustainability',
    desc: 'We partner with operators who share our responsibility toward the environment and the communities we visit.',
  },
  {
    title: 'Excellence',
    desc: 'From logistics to local guides, every detail is held to the highest standard so your experience is consistently flawless.',
  },
];

const team = [
  {
    name: 'Elena Rossi',
    role: 'Founder & Chief Executive',
    bio: 'A former UN travel delegate with fifteen years crafting bespoke itineraries across six continents. Elena founded Compass & Co. on the belief that great travel begins with great listening.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Head of Experiences',
    bio: 'An expedition leader turned curator, Arjun brings deep field expertise in adventure, culture, and remote destination access to every journey we design.',
  },
  {
    name: 'Camille Dubois',
    role: 'Creative Director',
    bio: 'Trained in visual communication in Paris, Camille ensures that every Compass & Co. journey tells a coherent, beautiful story — before, during, and after.',
  },
];

export default function AboutNew() {
  return (
    <div className="fp-page">


      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Company</p>
          <h1 className="fp-h1">About Us</h1>
          <p className="fp-lead">
            Compass &amp; Co. is a premier travel platform dedicated to curating the finest
            experiences around the globe. Our mission is to inspire and empower your journey —
            connecting you to places, people, and moments that matter. Since our founding, we
            have worked with travellers across the world to design itineraries that are personal,
            purposeful, and extraordinary.
          </p>
        </header>

        <section className="fp-section" aria-labelledby="values-heading">
          <h2 className="fp-h2" id="values-heading">Our Values</h2>
          {values.map((v) => (
            <div key={v.title} style={{ marginBottom: '24px' }}>
              <h3 className="fp-h3">{v.title}</h3>
              <p className="fp-p">{v.desc}</p>
            </div>
          ))}
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="team-heading">
          <h2 className="fp-h2" id="team-heading">Our Team</h2>
          {team.map((m) => (
            <div key={m.name} style={{ marginBottom: '28px' }}>
              <h3 className="fp-h3">{m.name}</h3>
              <p style={{ fontSize: '12px', fontWeight: 500, color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{m.role}</p>
              <p className="fp-p" style={{ marginBottom: 0 }}>{m.bio}</p>
            </div>
          ))}
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="reach-heading">
          <h2 className="fp-h2" id="reach-heading">Global Reach</h2>
          <p className="fp-p">
            With a presence across 60 countries and partnerships in over 120 cities, Compass &amp; Co.
            has the global network to deliver seamless experiences wherever you travel. Our local
            contacts — guides, hoteliers, operators — are carefully selected and regularly reviewed.
          </p>
          <p className="fp-p">
            From the cobblestones of Lisbon to the rice terraces of Bali, our reach is only as
            strong as the relationships we maintain. We invest in people, not just places.
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
