function StepIcon({ icon }) {
  const icons = {
    search: (
      <path d="M11 5a6 6 0 1 0 0 12a6 6 0 0 0 0-12Zm8 14l-4.2-4.2" />
    ),
    shortlist: (
      <>
        <path d="M8 6h8" />
        <path d="M8 10h5" />
        <path d="M8 14h4" />
        <path d="M16.5 16.5l1.2 1.2l2.8-3" />
        <path d="M6 3h10a2 2 0 0 1 2 2v6" />
        <path d="M6 3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
      </>
    ),
    chat: (
      <>
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5a2.5 2.5 0 0 1-2.5 2.5H12l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 11.5Z" />
        <path d="M9 9h.01" />
        <path d="M12 9h.01" />
        <path d="M15 9h.01" />
      </>
    ),
    celebrate: (
      <>
        <path d="M6 18l5-5" />
        <path d="M12 12l6-6" />
        <path d="M14 4l1.2 2.8L18 8l-2.8 1.2L14 12l-1.2-2.8L10 8l2.8-1.2Z" />
        <path d="M5 5l.8 1.7L7.5 7.5l-1.7.8L5 10l-.8-1.7L2.5 7.5l1.7-.8Z" />
        <path d="M18.5 14.5l.7 1.3l1.3.7l-1.3.7l-.7 1.3l-.7-1.3l-1.3-.7l1.3-.7Z" />
      </>
    ),
  }

  return (
    <span className="process-step__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {icons[icon]}
      </svg>
    </span>
  )
}

export function HowItWorksSection({ title, steps }) {
  return (
    <section id="how-it-works" className="home-section process-section">
      <div className="section-heading section-heading--centered">
        <h2 className="section-heading__title">{title}</h2>
      </div>

      <div className="process-steps">
        {steps.map((step) => (
          <article key={step.title} className="process-step">
            <StepIcon icon={step.icon} />
            <h3 className="process-step__title">{step.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
