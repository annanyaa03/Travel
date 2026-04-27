import { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) errs.message = 'Message is required.';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <div className="fp-page">


      <main className="fp-main" id="main-content">
        <header className="fp-header">
          <p className="fp-category">Company</p>
          <h1 className="fp-h1">Contact Us</h1>
          <p className="fp-lead">
            For inquiries, support, or partnership opportunities, reach out to us via the
            information below or use the contact form. Our team typically responds within
            two business days.
          </p>
        </header>

        <section className="fp-section" aria-labelledby="info-heading">
          <h2 className="fp-h2" id="info-heading">Contact Information</h2>
          <div className="fp-contact-info">
            <div className="fp-contact-item">
              <span className="fp-contact-label">Email</span>
              <a href="mailto:support@compassco.com" className="fp-link">support@compassco.com</a>
            </div>
            <div className="fp-contact-item">
              <span className="fp-contact-label">Phone</span>
              <span>+1 234 567 890</span>
            </div>
            <div className="fp-contact-item">
              <span className="fp-contact-label">Hours</span>
              <span>Monday – Friday, 09:00 – 18:00 GMT</span>
            </div>
            <div className="fp-contact-item">
              <span className="fp-contact-label">Press</span>
              <a href="mailto:press@compassco.com" className="fp-link">press@compassco.com</a>
            </div>
            <div className="fp-contact-item">
              <span className="fp-contact-label">Partners</span>
              <a href="mailto:partners@compassco.com" className="fp-link">partners@compassco.com</a>
            </div>
          </div>
        </section>

        <hr className="fp-divider" />

        <section className="fp-section" aria-labelledby="form-heading">
          <h2 className="fp-h2" id="form-heading">Send a Message</h2>

          {submitted ? (
            <p className="fp-success-msg">
              Your message has been received. We will be in touch shortly.
            </p>
          ) : (
            <form className="fp-form" onSubmit={handleSubmit} noValidate>
              <div className="fp-field">
                <label htmlFor="contact-name" className="fp-label">Full Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={`fp-input${errors.name ? ' error' : ''}`}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.name && <span className="fp-error-msg" role="alert">{errors.name}</span>}
              </div>

              <div className="fp-field">
                <label htmlFor="contact-email" className="fp-label">Email Address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={`fp-input${errors.email ? ' error' : ''}`}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && <span className="fp-error-msg" role="alert">{errors.email}</span>}
              </div>

              <div className="fp-field">
                <label htmlFor="contact-message" className="fp-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`fp-textarea${errors.message ? ' error' : ''}`}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                />
                {errors.message && <span className="fp-error-msg" role="alert">{errors.message}</span>}
              </div>

              <button type="submit" className="fp-btn">Send Message</button>
            </form>
          )}
        </section>
      </main>

      <footer className="fp-footer">
        <span>&copy; {new Date().getFullYear()} Compass &amp; Co. All rights reserved.</span>
        <Link to="/privacy">Privacy Policy</Link>
      </footer>
    </div>
  );
}
