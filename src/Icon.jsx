const paths = {
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 .8-2.8H17a4 4 0 0 0 4-4C21 6.4 17 3 12 3Z" /><circle cx="7.5" cy="10" r=".7" /><circle cx="10" cy="6.8" r=".7" /><circle cx="14" cy="6.8" r=".7" /><circle cx="17" cy="10" r=".7" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
  down: <><path d="M12 4v16M6 14l6 6 6-6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M7 10v7M7 7v.01M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 15v5h16v-5" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  code: <><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" /></>,
  layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
  spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1.5" /><path d="m21 16-5-5-6 7-3-3-4 5" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <><path d="M5 12h14" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M6 18 18 6" /></>,
  phone: <><path d="m8 3 3 5-3 3a15 15 0 0 0 5 5l3-3 5 3c0 3-2 5-5 5A17 17 0 0 1 3 8c0-3 2-5 5-5Z" /></>,
  book: <><path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15" /></>,
}

export default function Icon({ name, className = '', ...props }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>{paths[name]}</svg>
}
