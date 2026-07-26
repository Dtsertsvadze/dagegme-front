export function SiteNav({ items }) {
  return (
    <nav className="site-nav" aria-label="Primary">
      {items.map((item) => (
        <a key={item.href} className="site-nav__link" href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}
