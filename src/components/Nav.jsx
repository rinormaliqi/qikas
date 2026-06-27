import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { label: 'Work', to: { pathname: '/', hash: '#work' }, hash: true },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const { pathname } = useLocation();

  // Sticky blurred bar + hide-on-scroll-down / show-on-scroll-up.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('qk-scrolled', y > 24);
      // Hide-on-scroll-down is a desktop-only flourish. On mobile the bar must
      // stay put so the hamburger is always reachable — and so the overlay
      // (a child of the header) isn't pushed off-screen by the header's
      // transform, which would otherwise become its positioning context.
      const desktop = window.innerWidth > 920;
      if (desktop && !open && y > last && y > 240) {
        header.classList.add('qk-hidden-bar');
      } else {
        header.classList.remove('qk-hidden-bar');
      }
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll + close on Escape while the overlay is open.
  useEffect(() => {
    // Never keep the header transformed while the menu is open, or the
    // fixed overlay would be positioned relative to the shifted header.
    if (open && headerRef.current) headerRef.current.classList.remove('qk-hidden-bar');
    document.body.classList.toggle('qk-no-scroll', open);
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('qk-no-scroll');
    };
  }, [open]);

  const cls = ({ isActive }) => 'qk-nav-link' + (isActive ? ' is-active' : '');
  const mcls = ({ isActive }) => 'qk-mobile-link' + (isActive ? ' is-active' : '');

  return (
    <>
    <header className="qk-header" ref={headerRef}>
      <div className="qk-nav-inner">
        <Link to="/" className="qk-logo" aria-label="Qikas — home">
          <img src="/assets/qikas-logo.png" alt="Qikas" />
          <span>qikas</span>
        </Link>

        <nav className="qk-nav-pill" aria-label="Primary">
          {links.map((l) =>
            l.hash ? (
              <Link key={l.label} to={l.to} className="qk-nav-link">{l.label}</Link>
            ) : (
              <NavLink key={l.label} to={l.to} className={cls}>{l.label}</NavLink>
            )
          )}
        </nav>

        <div className="qk-nav-actions">
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className="qk-cta qk-cta-dark"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '13px 24px', borderRadius: '999px', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}
          >
            Start a project
            <span style={{ display: 'inline-block', width: '7px', height: '7px', background: 'var(--qk-white)', borderRadius: '50%' }} />
          </Link>
        </div>

        <button
          className={'qk-burger' + (open ? ' is-open' : '')}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>

      <div className={'qk-mobile-menu' + (open ? ' is-open' : '')} role="dialog" aria-modal="true" aria-hidden={!open}>
        <button className="qk-mobile-close" aria-label="Close menu" onClick={() => setOpen(false)}>
          <span /><span />
        </button>
        <nav aria-label="Mobile">
          <Link to={{ pathname: '/', hash: '#work' }} className="qk-mobile-link" onClick={() => setOpen(false)}>Work</Link>
          <NavLink to="/about" className={mcls} onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/careers" className={mcls} onClick={() => setOpen(false)}>Careers</NavLink>
          <NavLink to="/blog" className={mcls} onClick={() => setOpen(false)}>Blog</NavLink>
        </nav>
        <Link to={{ pathname: '/', hash: '#contact' }} className="qk-mobile-cta" onClick={() => setOpen(false)}>
          Start a project
          <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--qk-pink)', borderRadius: '50%' }} />
        </Link>
        <div className="qk-mobile-meta">Prishtina · Kosovo · est. MMXIX</div>
      </div>
    </>
  );
}
