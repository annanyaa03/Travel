import { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const faqs = [
  {
    q: 'How do I change or cancel a booking?',
    a: 'To modify or cancel a booking, log in to your account and navigate to "My Bookings." Select the relevant reservation and choose the appropriate option. Changes are subject to supplier cancellation policies, which are displayed at the time of booking.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as PayPal. For selected bookings, bank transfer options may also be available. All payments are processed securely via SSL encryption.',
  },
  {
    q: 'Can I book for multiple travellers on one account?',
    a: 'Yes. When completing a booking, you can add co-traveller details in the passenger or guest information section. Each traveller will receive their own confirmation documentation.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 4–6 weeks in advance for most trips, and 3–6 months ahead for peak-season travel, bespoke itineraries, or popular destinations. Early bookings typically offer the widest selection and best pricing.',
  },
  {
    q: 'What happens if my flight is cancelled or delayed?',
    a: 'In the event of a significant disruption, our support team will contact you proactively with alternatives. You are also entitled to contact us directly at support@compassco.com or call +1 234 567 890. We work with airlines and hotels to minimise impact on your journey.',
  },
  {
    q: 'Do you offer travel insurance?',
    a: 'While we do not sell insurance directly, we strongly recommend purchasing comprehensive travel insurance before your trip. We can guide you to reputable providers. Insurance should cover cancellation, medical expenses, and baggage loss at a minimum.',
  },
  {
    q: 'How do I contact customer support?',
    a: 'Our support team is available Monday to Friday, 09:00–18:00 GMT. You can reach us via email at support@compassco.com, by phone at +1 234 567 890, or by submitting a query through our Contact page.',
  },
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="fp-page">


      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Support</p>
          <h1 className="fp-h1">Help Center</h1>
          <p className="fp-lead">
            Find answers to common questions about bookings, payments, and policies. If you
            cannot find what you are looking for, our support team is always available to assist.
          </p>
        </header>

        <section className="fp-section" aria-labelledby="faq-heading">
          <h2 className="fp-h2" id="faq-heading">Frequently Asked Questions</h2>
          <div className="fp-faq-list" role="list">
            {faqs.map((item, i) => (
              <div key={i} className="fp-faq-item" role="listitem">
                <button
                  className="fp-faq-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-btn-${i}`}
                >
                  <span>{item.q}</span>
                  <span className={`fp-faq-icon${openIndex === i ? ' open' : ''}`} aria-hidden="true">+</span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`fp-faq-answer${openIndex === i ? ' open' : ''}`}
                >
                  <div className="fp-faq-answer-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="contact-prompt-heading">
          <h2 className="fp-h2" id="contact-prompt-heading">Still Need Help?</h2>
          <p className="fp-p">
            Our support team is available Monday through Friday, 09:00–18:00 GMT. You can
            reach us at{' '}
            <a href="mailto:support@compassco.com" className="fp-link">support@compassco.com</a>{' '}
            or by calling <a href="tel:+12345678890" className="fp-link">+1 234 567 890</a>.
          </p>
          <Link to="/contact">
            <button className="fp-btn" style={{ marginTop: '8px' }}>Contact Support</button>
          </Link>
        </section>
      </main>

      <footer className="fp-footer">
        <span>&copy; {new Date().getFullYear()} Compass &amp; Co. All rights reserved.</span>
        <Link to="/contact">Contact Us</Link>
      </footer>
    </div>
  );
}
