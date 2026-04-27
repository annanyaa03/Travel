import { Link } from 'react-router-dom';
import './footerPages.css';

const openings = [
  { title: 'Senior Travel Designer', dept: 'Experiences', location: 'London, UK', type: 'Full-Time' },
  { title: 'Product Manager — Booking Platform', dept: 'Technology', location: 'Remote', type: 'Full-Time' },
  { title: 'Brand Partnerships Lead', dept: 'Growth', location: 'New York, USA', type: 'Full-Time' },
  { title: 'Content Strategist', dept: 'Marketing', location: 'Remote', type: 'Part-Time' },
  { title: 'Data Analyst — Revenue Intelligence', dept: 'Finance', location: 'Bangalore, India', type: 'Full-Time' },
  { title: 'Customer Experience Specialist', dept: 'Support', location: 'Remote', type: 'Contract' },
];

const benefits = [
  { title: 'Travel Credits', desc: 'Annual allowance for personal travel on our platform.' },
  { title: 'Flexible Work', desc: 'Remote-first culture with office hubs in key cities.' },
  { title: 'Learning Budget', desc: 'Dedicated budget for courses, conferences, and certifications.' },
  { title: 'Health Cover', desc: 'Comprehensive health, dental, and mental wellness plans.' },
  { title: 'Equity', desc: 'Options for senior roles — we grow together.' },
  { title: 'Parental Leave', desc: 'Generous leave policy for all parents, regardless of role.' },
];

export default function Careers() {
  return (
    <div className="fp-page">


      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Company</p>
          <h1 className="fp-h1">Careers at Compass &amp; Co.</h1>
          <p className="fp-lead">
            Join a passionate team that is shaping the future of travel. We are a diverse group
            of designers, engineers, storytellers, and explorers united by one belief: that
            exceptional travel changes lives. Explore open roles and discover opportunities for
            meaningful professional growth.
          </p>
        </header>

        <section className="fp-section" aria-labelledby="openings-heading">
          <h2 className="fp-h2" id="openings-heading">Current Openings</h2>
          <div className="fp-job-list">
            {openings.map((job) => (
              <a
                key={job.title}
                href="mailto:careers@compassco.com"
                className="fp-job-item"
                aria-label={`Apply for ${job.title}`}
              >
                <div className="fp-job-left">
                  <span className="fp-job-title">{job.title}</span>
                  <span className="fp-job-meta">{job.dept} &middot; {job.location}</span>
                </div>
                <span className="fp-job-tag">{job.type}</span>
              </a>
            ))}
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="culture-heading">
          <h2 className="fp-h2" id="culture-heading">Culture &amp; Benefits</h2>
          <p className="fp-p">
            We believe the best work happens when people feel trusted, valued, and inspired.
            Our culture is built on transparency, autonomy, and a shared love for extraordinary
            experiences — whether professional or personal.
          </p>
          <div className="fp-benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="fp-benefit-item">
                <strong>{b.title}</strong>
                <span>{b.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="apply-heading">
          <h2 className="fp-h2" id="apply-heading">How to Apply</h2>
          <p className="fp-p">
            Send your CV and a short note about why Compass &amp; Co. to{' '}
            <a href="mailto:careers@compassco.com" className="fp-link">careers@compassco.com</a>.
            We review every application personally and aim to respond within 10 business days.
            No recruitment agencies, please.
          </p>
          <p className="fp-p">
            We are an equal opportunity employer. We welcome applications from candidates of all
            backgrounds, identities, and experiences.
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
