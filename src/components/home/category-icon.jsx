const iconPaths = {
  camera: (
    <path d="M8 11a5 5 0 1 0 10 0a5 5 0 0 0-10 0Zm-4 7V7.8A1.8 1.8 0 0 1 5.8 6h2.8l1.4-2h4l1.4 2h2.8A1.8 1.8 0 0 1 22 7.8V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
  ),
  video: (
    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h8A2.5 2.5 0 0 1 17 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 4 15.5Zm13 2.1l3.7-2.6A1 1 0 0 1 22 8.8v6.4a1 1 0 0 1-1.3.8L17 13.4Z" />
  ),
  music: (
    <path d="M15 4v10.2A2.8 2.8 0 1 1 13 11.5V6.4l8-1.7v7.5a2.8 2.8 0 1 1-2-2.7V4.3Z" />
  ),
  headphones: (
    <path d="M5 12a7 7 0 1 1 14 0v5a2 2 0 0 1-2 2h-1.5A1.5 1.5 0 0 1 14 17.5v-3a1.5 1.5 0 0 1 1.5-1.5H17V12a5 5 0 1 0-10 0v1h1.5A1.5 1.5 0 0 1 10 14.5v3A1.5 1.5 0 0 1 8.5 19H7a2 2 0 0 1-2-2Z" />
  ),
  mic: (
    <path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 1 1-6 0V6a3 3 0 0 1 3-3Zm-5 8a5 5 0 1 0 10 0h2a7 7 0 0 1-6 6.9V21h-2v-3.1A7 7 0 0 1 5 11Z" />
  ),
  hall: (
    <path d="M4 20V9.5L12 4l8 5.5V20h-2v-8h-3v8h-2v-8h-2v8H9v-8H6v8Zm4-10h8V8.4L12 6l-4 2.4Z" />
  ),
  car: (
    <path d="M6.6 7.2A2 2 0 0 1 8.5 6h7a2 2 0 0 1 1.9 1.2l1.4 3.3H20a2 2 0 0 1 2 2V17h-2a2 2 0 1 1-4 0H8a2 2 0 1 1-4 0H2v-4.3a2 2 0 0 1 2-2h1.2Zm1.3.8l-1.1 2.6h10.4L16.1 8ZM6 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm12 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z" />
  ),
}

export function CategoryIcon({ icon }) {
  return (
    <span className="category-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        {iconPaths[icon]}
      </svg>
    </span>
  )
}
