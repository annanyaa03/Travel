import { Link } from 'react-router-dom';
import './footerPages.css';

export default function PrivacyPolicy() {
  return (
    <div className="fp-page">
      <nav className="fp-topnav" aria-label="Page navigation">
        <Link to="/" className="fp-brand">Compass &amp; Co.</Link>
        <Link to="/" className="fp-back-link">Back to Home</Link>
      </nav>

      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Support</p>
          <h1 className="fp-h1">Privacy Policy</h1>
          <p className="fp-lead">
            Your privacy matters to us. This policy explains how Compass &amp; Co. collects,
            uses, and protects your personal information when you use our website and services.
          </p>
          <p className="fp-last-updated">Last updated: 1 April 2025</p>
        </header>

        <section className="fp-policy-section fp-section" aria-labelledby="collect-heading">
          <h2 className="fp-h2" id="collect-heading">Information We Collect</h2>
          <p className="fp-p">
            We collect information you provide directly, including your name, email address,
            phone number, payment details, and travel preferences when you register an account,
            make a booking, or contact our support team.
          </p>
          <p className="fp-p">
            We also collect data automatically when you use our platform, including IP addresses,
            browser type, device identifiers, pages visited, and interactions with our services.
            This data is collected via cookies and similar tracking technologies.
          </p>
        </section>

        <hr className="fp-divider" />

        <section className="fp-policy-section fp-section" aria-labelledby="use-heading">
          <h2 className="fp-h2" id="use-heading">How We Use Your Data</h2>
          <p className="fp-p">
            We use your information to process bookings, personalise your experience, send
            transactional and marketing communications (where you have consented), improve our
            platform, and comply with our legal obligations.
          </p>
          <ul className="fp-list">
            <li>Processing and confirming reservations and payments</li>
            <li>Providing customer support and responding to enquiries</li>
            <li>Sending service notifications and booking updates</li>
            <li>Improving platform performance and user experience</li>
            <li>Complying with applicable laws and regulations</li>
          </ul>
          <p className="fp-p">
            We do not sell your personal data to third parties. We share data with our service
            providers only where necessary to deliver our services, and they are contractually
            bound to handle it securely.
          </p>
        </section>

        <hr className="fp-divider" />

        <section className="fp-policy-section fp-section" aria-labelledby="rights-heading">
          <h2 className="fp-h2" id="rights-heading">Your Rights</h2>
          <p className="fp-p">
            Depending on your location, you may have the right to access, correct, delete, or
            restrict processing of your personal data. You may also have the right to data
            portability and to object to certain processing activities.
          </p>
          <p className="fp-p">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:privacy@compassco.com" className="fp-link">privacy@compassco.com</a>.
            We will respond within 30 days. You also have the right to lodge a complaint with
            your local data protection authority.
          </p>
        </section>

        <hr className="fp-divider" />

        <section className="fp-policy-section fp-section" aria-labelledby="cookies-privacy-heading">
          <h2 className="fp-h2" id="cookies-privacy-heading">Cookie Usage</h2>
          <p className="fp-p">
            We use cookies and similar technologies to operate our website, analyse traffic,
            and personalise content. You can manage your cookie preferences at any time via
            your browser settings or our cookie consent tool. For full details, see our{' '}
            <Link to="/cookies" className="fp-link">Cookie Policy</Link>.
          </p>
        </section>

        <section className="fp-policy-section fp-section" aria-labelledby="contact-privacy-heading">
          <h2 className="fp-h2" id="contact-privacy-heading">Contact</h2>
          <p className="fp-p">
            If you have any questions about this policy or how we handle your data, please
            contact our Data Protection team at{' '}
            <a href="mailto:privacy@compassco.com" className="fp-link">privacy@compassco.com</a>.
          </p>
        </section>
      </main>

      <footer className="fp-footer">
        <span>&copy; {new Date().getFullYear()} Compass &amp; Co. All rights reserved.</span>
        <Link to="/terms">Terms of Service</Link>
      </footer>
    </div>
  );
}
