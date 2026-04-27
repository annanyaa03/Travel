import { Link } from 'react-router-dom';
import './footerPages.css';

const cookieTypes = [
  {
    name: 'Strictly Necessary',
    desc: 'These cookies are essential for the website to function. They enable core features such as session management, authentication, and security. They cannot be disabled.',
  },
  {
    name: 'Performance & Analytics',
    desc: 'These cookies help us understand how visitors interact with our platform by collecting anonymised usage data. We use this information to improve performance and user experience.',
  },
  {
    name: 'Functional',
    desc: 'Functional cookies remember your preferences — such as language selection and currency — to provide a more personalised experience. Disabling them may limit some features.',
  },
  {
    name: 'Marketing & Targeting',
    desc: 'These cookies are used to deliver relevant advertising and to track the effectiveness of our marketing campaigns. They are only set with your consent.',
  },
];

const browsers = [
  { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
  { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer' },
  { name: 'Apple Safari', url: 'https://support.apple.com/en-gb/guide/safari/sfri11471/mac' },
  { name: 'Microsoft Edge', url: 'https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge' },
];

export default function CookiePolicy() {
  return (
    <div className="fp-page">


      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Support</p>
          <h1 className="fp-h1">Cookie Policy</h1>
          <p className="fp-lead">
            We use cookies to improve your experience on our platform. This page explains what
            cookies are, which types we use, and how you can manage them.
          </p>
          <p className="fp-last-updated">Last updated: 1 April 2025</p>
        </header>

        <section className="fp-section" aria-labelledby="what-heading">
          <h2 className="fp-h2" id="what-heading">What Are Cookies</h2>
          <p className="fp-p">
            Cookies are small text files placed on your device by websites you visit. They are
            widely used to make websites work efficiently, remember your preferences, and provide
            data to website owners about how their sites are used.
          </p>
          <p className="fp-p">
            Cookies set by the website you visit are called first-party cookies. Cookies set by
            other parties — such as analytics providers or advertisers — are called third-party
            cookies. Both types may be session cookies (deleted when you close your browser)
            or persistent cookies (retained for a specified period).
          </p>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="types-heading">
          <h2 className="fp-h2" id="types-heading">Types of Cookies We Use</h2>
          {cookieTypes.map((ct) => (
            <div key={ct.name} style={{ marginBottom: '24px' }}>
              <h3 className="fp-h3">{ct.name}</h3>
              <p className="fp-p" style={{ marginBottom: 0 }}>{ct.desc}</p>
            </div>
          ))}
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="manage-heading">
          <h2 className="fp-h2" id="manage-heading">How to Manage Cookies</h2>
          <p className="fp-p">
            You can control and manage cookies in your browser settings. Most browsers allow you
            to block cookies, delete existing cookies, or receive a notification before a cookie
            is stored. Note that disabling certain cookies may affect the functionality of our
            platform.
          </p>
          <div className="fp-gov-links">
            {browsers.map((b) => (
              <a
                key={b.name}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="fp-gov-link"
              >
                {b.name}
              </a>
            ))}
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="changes-heading">
          <h2 className="fp-h2" id="changes-heading">Changes to This Policy</h2>
          <p className="fp-p">
            We may update this Cookie Policy periodically to reflect changes in our practices or
            applicable law. The date of the latest revision is shown at the top of this page.
            Continued use of our platform following any update constitutes acceptance of the
            revised policy.
          </p>
          <p className="fp-p">
            For questions, contact us at{' '}
            <a href="mailto:privacy@compassco.com" className="fp-link">privacy@compassco.com</a>.
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
