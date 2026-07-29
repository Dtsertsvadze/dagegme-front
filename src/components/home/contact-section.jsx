function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7.2 3.5l2.1 4.2l-2.2 1.8a15.2 15.2 0 0 0 7.4 7.4l1.8-2.2l4.2 2.1l-.7 3.3c-.2.8-.9 1.4-1.8 1.4A15.5 15.5 0 0 1 2.5 6c0-.9.6-1.6 1.4-1.8l3.3-.7Z" />
    </svg>
  )
}

export function ContactSection({ content }) {
  return (
    <section id="contact" className="home-section contact-section">
      <div>
        <p className="contact-section__eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
      </div>
      <a className="contact-section__phone" href="tel:+995551288483">
        <span className="contact-section__phone-icon" aria-hidden="true">
          <PhoneIcon />
        </span>
        <span>+995 555 50 00 19</span>
      </a>
    </section>
  )
}
