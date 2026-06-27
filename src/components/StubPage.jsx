import { Link } from 'react-router-dom';
import { css } from '../lib/css.js';

/**
 * Shared scaffold for the routed pages (/about, /careers, /blog).
 * White canvas, big two-colour headline, mono index label, and a
 * "coming soon" note — ready to flesh out section-by-section later.
 */
export default function StubPage({ index, label, titleTop, titleAccent, blurb, soon = 'In production — fuller page coming soon' }) {
  return (
    <section style={css('position:relative; min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:200px var(--qk-gutter) 140px; background:var(--qk-white); overflow:hidden;')}>
      {/* one soft pink cloud accent */}
      <div className="qk-cloud-b" style={css('position:absolute; top:120px; right:-80px; width:460px; opacity:0.12; pointer-events:none;')}>
        <svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg">
          <g fill="#D4014A">
            <ellipse cx="100" cy="160" rx="100" ry="60" /><ellipse cx="220" cy="130" rx="120" ry="90" />
            <ellipse cx="350" cy="130" rx="110" ry="85" /><ellipse cx="460" cy="160" rx="100" ry="70" />
          </g>
        </svg>
      </div>

      <div data-reveal style={css('position:relative; max-width:1100px; margin:0 auto; width:100%;')}>
        <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--qk-pink); margin-bottom:28px;')}>{index} / {label}</div>
        <h1 className="qk-d-h2" style={css('font-family:var(--qk-display); line-height:0.9; letter-spacing:-0.04em; margin:0; text-transform:uppercase; color:var(--qk-ink);')}>
          {titleTop}<br /><span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; color:var(--qk-pink); text-transform:lowercase;')}>{titleAccent}</span>
        </h1>
        <p style={css('font-size:19px; line-height:1.6; color:var(--qk-muted); margin:40px 0 0; max-width:560px;')}>{blurb}</p>

        <div style={css('display:inline-flex; align-items:center; gap:12px; margin-top:48px; padding:12px 24px; border-radius:999px; border:1.5px solid var(--qk-pink); font-family:var(--qk-mono); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--qk-pink);')}>
          <span style={css('display:inline-block; width:8px; height:8px; background:var(--qk-pink); border-radius:50%;')}></span>
          {soon}
        </div>

        <div style={css('margin-top:56px; display:flex; gap:14px; flex-wrap:wrap;')}>
          <Link to="/" className="qk-cta qk-cta-dark" style={css('display:inline-flex; align-items:center; gap:10px; padding:16px 30px; border-radius:999px; text-decoration:none; font-size:14px; font-weight:500;')}>← Back home</Link>
          <Link to={{ pathname: '/', hash: '#contact' }} className="qk-cta qk-cta-light" style={css('display:inline-flex; align-items:center; gap:10px; padding:16px 30px; border-radius:999px; background:#fff; color:var(--qk-ink); text-decoration:none; font-size:14px; font-weight:500;')}>Start a project</Link>
        </div>
      </div>
    </section>
  );
}
