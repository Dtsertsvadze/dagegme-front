function ValueIcon({ icon }) {
  const paths = {
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
        <path d="M8 14h2M14 14h2M8 17h2M14 17h2" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
        <path d="M16 6.5a2.5 2.5 0 0 1 0 5" />
        <path d="M17 14a4.5 4.5 0 0 1 3.5 4.4" />
      </>
    ),
    place: (
      <>
        <path d="M12 21s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    heart: (
      <path d="M12 20.5s-7-4.3-9-8a5.2 5.2 0 0 1 9-5.2a5.2 5.2 0 0 1 9 5.2c-2 3.7-9 8-9 8Z" />
    ),
    car: (
      <>
        <path d="M4 13l2.5-5h11l2.5 5v5H4v-5Z" />
        <path d="M4 13h16M7 13h.01M17 13h.01" />
        <path d="M6 18v2M18 18v2" />
      </>
    ),
  }

  return (
    <span className="about-value__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {paths[icon]}
      </svg>
    </span>
  )
}

function CelebrationMark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 45l16-16" />
      <path d="M17 49l8-20l10 10l-18 10Z" />
      <path d="M40 12l1.6 5.4L47 19l-5.4 1.6L40 26l-1.6-5.4L33 19l5.4-1.6L40 12Z" />
      <path d="M51 30l1 3l3 1l-3 1l-1 3l-1-3l-3-1l3-1l1-3Z" />
      <path d="M23 12l1 3l3 1l-3 1l-1 3l-1-3l-3-1l3-1l1-3Z" />
      <path d="M49 12l-3 5M31 10l-1 5M53 23l-5 2" />
    </svg>
  )
}

function OrbitIcon({ icon, position }) {
  const paths = {
    camera: (
      <>
        <path d="M4 8h4l1.5-2h5L16 8h4v11H4V8Z" />
        <circle cx="12" cy="13.5" r="3.5" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V6l9-2v12" />
        <circle cx="6.5" cy="18" r="2.5" />
        <circle cx="15.5" cy="16" r="2.5" />
      </>
    ),
    microphone: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />
      </>
    ),
    car: (
      <>
        <path d="M4 13l2.5-5h11l2.5 5v5H4v-5Z" />
        <path d="M4 13h16M6 18v2M18 18v2" />
      </>
    ),
  }

  return (
    <span
      className={`about-section__orbit-icon about-section__orbit-icon--${position}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        {paths[icon]}
      </svg>
    </span>
  )
}

export function AboutSection({ content }) {
  return (
    <section id="about" className="home-section about-section" aria-labelledby="about-title">
      <div className="about-section__visual" aria-hidden="true">
        <span className="about-section__orbit about-section__orbit--outer"></span>
        <span className="about-section__orbit about-section__orbit--inner"></span>
        <div className="about-section__mark">
          <CelebrationMark />
        </div>
        <OrbitIcon icon="camera" position="top" />
        <OrbitIcon icon="music" position="right" />
        <OrbitIcon icon="microphone" position="left" />
        <OrbitIcon icon="car" position="bottom" />
        <p className="about-section__statement">{content.statement}</p>
      </div>

      <div className="about-section__content">
        <p className="about-section__eyebrow">{content.eyebrow}</p>
        <h2 id="about-title">{content.title}</h2>
        <p className="about-section__intro">{content.text}</p>

        <div className="about-values">
          {content.values.map((value) => (
            <article className="about-value" key={value.title}>
              <ValueIcon icon={value.icon} />
              <div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
