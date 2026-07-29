import heroImage from '../../assets/hero-event.png'

export function HeroSection({ titleTop, titleAccent, text }) {
  return (
    <section className="hero" aria-label="Homepage hero">
      <div className="hero__content">
        <h1 className="hero__title">
          <span>{titleTop}</span>
          <span className="hero__title-accent">{titleAccent}</span>
        </h1>
        <p className="hero__text">{text}</p>
      </div>

      <div className="hero__media">
        <img src={heroImage} alt="" />
      </div>
    </section>
  )
}
