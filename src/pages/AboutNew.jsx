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
