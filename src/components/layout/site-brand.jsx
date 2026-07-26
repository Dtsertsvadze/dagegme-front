export function SiteBrand({ label }) {
  return (
    <a className="brand" href="/" aria-label={label}>
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__spark"></span>
      </span>
      <span className="brand-name">{label}</span>
    </a>
  )
}
