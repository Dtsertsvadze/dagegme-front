function ValueIcon({ icon }) {
  const paths = {
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

export function AboutSection({ content }) {
  return (
    <section id="about" className="home-section about-section" aria-labelledby="about-title">
      <div className="about-section__visual" aria-hidden="true">
        <span className="about-section__orbit about-section__orbit--outer"></span>
        <span className="about-section__orbit about-section__orbit--inner"></span>
        <div className="about-section__mark">
          <CelebrationMark />
        </div>
        {content.tags.map((tag, index) => (
          <span
            key={tag}
            className={`about-section__tag about-section__tag--${index + 1}`}
          >
            {tag}
          </span>
        ))}
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
