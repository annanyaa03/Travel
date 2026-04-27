import { Link } from 'react-router-dom';
import './footerPages.css';

export default function TermsOfService() {
  return (
    <div className="fp-page">
      <nav className="fp-topnav" aria-label="Page navigation">
        <Link to="/" className="fp-brand">Compass &amp; Co.</Link>
        <Link to="/" className="fp-back-link">Back to Home</Link>
      </nav>

      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Support</p>
          <h1 className="fp-h1">Terms of Service</h1>
          <p className="fp-lead">
            Please read these terms carefully. They govern your access to and use of the
            Compass &amp; Co. website, mobile applications, and all related services. By
            accessing our platform, you agree to be bound by these terms.
          </p>
          <p className="fp-last-updated">Last updated: 1 April 2025</p>
        </header>

        <section className="fp-section" aria-labelledby="obligations-heading">
          <h2 className="fp-h2" id="obligations-heading">User Obligations</h2>
          <p className="fp-p">
            By using our platform, you represent that you are at least 18 years of age and have
            the legal capacity to enter into binding agreements. You agree to provide accurate,
            complete, and current information when registering an account or making a booking.
          </p>
          <p className="fp-p">
            You must not use our services for any unlawful purpose, to transmit harmful or
            fraudulent content, or in any manner that disrupts or interferes with the platform's
            operation. We reserve the right to suspend or terminate accounts found in violation.
          </p>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="ip-heading">
          <h2 className="fp-h2" id="ip-heading">Intellectual Property</h2>
          <p className="fp-p">
            All content on the Compass &amp; Co. platform — including text, images, logos,
            interface design, and software — is the exclusive property of Compass &amp; Co.
            or its licensors and is protected by applicable intellectual property laws.
          </p>
          <p className="fp-p">
            You may not reproduce, redistribute, modify, or create derivative works from any
            content on our platform without our express written consent. Unauthorised use
            constitutes a breach of these terms and may result in legal action.
          </p>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="disclaimers-heading">
          <h2 className="fp-h2" id="disclaimers-heading">Disclaimers</h2>
          <p className="fp-p">
            Our platform is provided on an "as is" and "as available" basis. While we strive
            to maintain accurate and up-to-date information, we make no warranties, express or
            implied, regarding the completeness, accuracy, or reliability of content on our
            platform.
          </p>
          <p className="fp-p">
            Third-party travel suppliers — including airlines, hotels, and tour operators —
            operate independently. Compass &amp; Co. is not responsible for the actions,
            omissions, or failures of these suppliers, though we will always work to resolve
            disputes on your behalf.
          </p>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="liability-heading">
          <h2 className="fp-h2" id="liability-heading">Limitation of Liability</h2>
          <p className="fp-p">
            To the maximum extent permitted by applicable law, Compass &amp; Co. shall not
            be liable for any indirect, incidental, special, consequential, or punitive damages
            arising from your use of our services, including but not limited to loss of profits,
            data, or goodwill.
          </p>
          <p className="fp-p">
            Our total liability to you for any claim arising from these terms or your use of
            our services shall not exceed the amount you paid to us in the three months
            preceding the event giving rise to the claim.
          </p>
        </section>

        <section className="fp-section" aria-labelledby="governing-heading">
          <h2 className="fp-h2" id="governing-heading">Governing Law</h2>
          <p className="fp-p">
            These terms are governed by and construed in accordance with the laws of England
            and Wales. Any disputes arising under these terms shall be subject to the exclusive
            jurisdiction of the courts of England and Wales.
          </p>
          <p className="fp-p">
            For questions about these terms, contact{' '}
            <a href="mailto:legal@compassco.com" className="fp-link">legal@compassco.com</a>.
          </p>
        </section>
      </main>

      <footer className="fp-footer">
        <span>&copy; {new Date().getFullYear()} Compass &amp; Co. All rights reserved.</span>
        <Link to="/privacy">Privacy Policy</Link>
      </footer>
    </div>
  );
}
