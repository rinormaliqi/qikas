import { Link } from 'react-router-dom';
import { css } from '../lib/css.js';

export default function Footer() {
  return (
    <footer style={css('padding:64px var(--qk-gutter) 36px; background:var(--qk-pink); color:#fff;')}>
      <div className="qk-clients-head" style={css('display:flex; justify-content:space-between; align-items:flex-start; padding-bottom:80px; gap:40px;')}>
        <div style={css('display:flex; align-items:center; gap:14px;')}>
          <span style={css('display:inline-flex; padding:8px; background:#fff; border-radius:12px;')}><img src="/assets/qikas-logo.png" alt="Qikas" style={css('width:30px; height:34px; object-fit:contain;')} /></span>
          <div>
            <div style={css('font-family:var(--qk-display); font-size:22px; letter-spacing:-0.02em; text-transform:lowercase;')}>qikas</div>
            <div style={css('font-family:var(--qk-mono); font-size:10px; letter-spacing:0.14em; text-transform:uppercase; opacity:0.55; margin-top:4px;')}>Prishtina · Kosovo · est. MMXIX</div>
          </div>
        </div>
        <div style={css('display:flex; gap:48px; flex-wrap:wrap;')}>
          <div>
            <div style={css('font-family:var(--qk-mono); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; opacity:0.5; margin-bottom:14px;')}>Studio</div>
            <div style={css('display:flex; flex-direction:column; gap:8px; font-size:14px;')}>
              <Link to={{ pathname: '/', hash: '#work' }} style={css('color:#fff; text-decoration:none; opacity:0.85;')}>Work</Link>
              <Link to={{ pathname: '/', hash: '#services' }} style={css('color:#fff; text-decoration:none; opacity:0.85;')}>Services</Link>
              <Link to="/about" style={css('color:#fff; text-decoration:none; opacity:0.85;')}>About</Link>
              <Link to="/blog" style={css('color:#fff; text-decoration:none; opacity:0.85;')}>Journal</Link>
            </div>
          </div>
          <div>
            <div style={css('font-family:var(--qk-mono); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; opacity:0.5; margin-bottom:14px;')}>Elsewhere</div>
            <div style={css('display:flex; flex-direction:column; gap:8px; font-size:14px;')}>
              <a href="#" style={css('color:#fff; text-decoration:none; opacity:0.85;')}>Instagram</a>
              <a href="#" style={css('color:#fff; text-decoration:none; opacity:0.85;')}>LinkedIn</a>
              <a href="#" style={css('color:#fff; text-decoration:none; opacity:0.85;')}>Behance</a>
              <a href="#" style={css('color:#fff; text-decoration:none; opacity:0.85;')}>TikTok</a>
            </div>
          </div>
        </div>
      </div>

      <div className="qk-d-wordmark" style={css('font-family:var(--qk-display); line-height:0.78; letter-spacing:-0.05em; margin-bottom:48px; text-transform:uppercase;')}>
        Qikas<span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; color:var(--qk-ink); text-transform:lowercase;')}>.</span>
      </div>

      <div className="qk-footer-legal" style={css('display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.15); font-family:var(--qk-mono); font-size:10px; letter-spacing:0.14em; text-transform:uppercase; opacity:0.55;')}>
        <div>© MMXXVI · Qikas Creative House sh.p.k.</div>
        <div>Prishtina · 42.66°N 21.16°E</div>
        <div>Made with care · last updated 06.2026</div>
      </div>
    </footer>
  );
}
