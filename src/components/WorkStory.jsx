import { useEffect, useRef, useState } from 'react';
import ImageSlot from './ImageSlot.jsx';
import { css } from '../lib/css.js';

/* --- small math helpers --- */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
// normalise p within [start,end] → 0..1
const seg = (p, start, end) => clamp((p - start) / (end - start));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const fmt = (n) => {
  n = Math.round(n);
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(n < 1e4 ? 1 : 0).replace(/\.0$/, '') + 'K';
  return String(n);
};

const STAGES = ['The spark', 'The craft', 'The drop', 'Amplified'];

export default function WorkStory() {
  const sectionRef = useRef(null);
  const [p, setP] = useState(0);
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      setP(total > 0 ? clamp(-rect.top / total) : 0);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  /* ---------- reduced-motion / no-JS fallback: a calm, static telling ---------- */
  if (reduce) {
    return (
      <section id="work" style={css('padding:140px var(--qk-gutter); background:var(--qk-pink); color:#fff; border-radius:64px 64px 0 0;')}>
        <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; opacity:0.8; margin-bottom:24px;')}>Index — 003 / The work, unfolding</div>
        <h2 className="qk-d-h2" style={css('font-family:var(--qk-display); line-height:0.9; letter-spacing:-0.04em; margin:0 0 48px; text-transform:uppercase;')}>We don't list projects.<br /><span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; text-transform:lowercase;')}>we grow them.</span></h2>
        <div style={css('display:flex; gap:48px; flex-wrap:wrap;')}>
          {[['+312%', 'engagement'], ['1.2M', 'views'], ['48.2K', 'likes'], ['86K', 'new followers']].map(([v, l]) => (
            <div key={l}>
              <div style={css('font-family:var(--qk-display); font-size:clamp(48px,7vw,88px); line-height:1; letter-spacing:-0.04em;')}>{v}</div>
              <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; opacity:0.8; margin-top:8px;')}>{l}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---------- progress-driven values ---------- */
  const introOut = 1 - seg(p, 0.16, 0.32);               // headline fades
  const captionOut = 1 - seg(p, 0.08, 0.2);              // post caption fades
  const mediaScale = lerp(0.55, 13, easeInOut(seg(p, 0.04, 0.52)));
  const ampIn = seg(p, 0.42, 0.54);                       // pink amplify layer
  const ampE = easeOut(seg(p, 0.46, 0.96));               // counters climb
  const finalIn = seg(p, 0.8, 0.98);                      // closing line

  const stageIndex = p < 0.22 ? 0 : p < 0.45 ? 1 : p < 0.74 ? 2 : 3;
  const platform = ampE < 0.5 ? 'TikTok' : 'Instagram';

  const reach = Math.round(lerp(0, 312, ampE));
  const views = fmt(lerp(0, 1240000, ampE));
  const likes = fmt(lerp(0, 48200, ampE));
  const follows = fmt(lerp(0, 86000, ampE));
  const eng = lerp(0, 9.4, ampE).toFixed(1);

  // engagement ring
  const R = 52;
  const C = 2 * Math.PI * R;
  const ringOffset = C * (1 - clamp(Number(eng) / 12));

  return (
    <section
      id="work"
      ref={sectionRef}
      style={css('position:relative; height:440vh; background:var(--qk-white);')}
    >
      <div className="qk-story-stage" style={css('position:sticky; top:0; height:100vh; overflow:hidden; display:grid;')}>

        {/* zooming imagery — fills the screen and becomes the pink backdrop */}
        <div style={css('position:absolute; inset:0; display:grid; place-items:center; pointer-events:none;')}>
          <div
            style={{
              width: 'min(44vw, 480px)',
              transform: `scale(${mediaScale})`,
              transformOrigin: 'center center',
              borderRadius: 36,
              overflow: 'hidden',
              boxShadow: '0 40px 90px -40px rgba(212,1,74,0.45)',
              willChange: 'transform',
            }}
          >
            <ImageSlot ratio="4/5" placeholder="Sunny Hill — the campaign" src="/assets/123.png" />
          </div>
        </div>

        {/* progress rail */}
        <div className="qk-story-rail" style={{ color: ampIn > 0.5 ? '#fff' : 'var(--qk-ink)' }}>
          {STAGES.map((s, i) => (
            <span key={s} className={i === stageIndex ? 'on' : ''} title={s} />
          ))}
        </div>

        {/* INTRO layer (on white) */}
        <div style={{ ...css('position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; padding:0 var(--qk-gutter); pointer-events:none;'), opacity: introOut }}>
          <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--qk-pink); margin-bottom:24px;')}>Index — 003 / The work, unfolding</div>
          <h2 className="qk-d-h2" style={css('font-family:var(--qk-display); line-height:0.9; letter-spacing:-0.04em; margin:0; text-transform:uppercase; max-width:14ch;')}>
            We don't list projects.<br /><span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; color:var(--qk-pink); text-transform:lowercase;')}>we grow them.</span>
          </h2>
          <div style={css('margin-top:40px; font-family:var(--qk-mono); font-size:12px; letter-spacing:0.16em; text-transform:uppercase; color:var(--qk-faint);')}>Scroll to watch a brand travel ↓</div>
        </div>

        {/* floating post caption near the small media (early) */}
        <div style={{ ...css('position:absolute; left:50%; top:50%; transform:translate(-50%, 190px); display:flex; align-items:center; gap:12px; padding:12px 20px; border-radius:999px; background:#fff; box-shadow:0 12px 30px -14px rgba(212,1,74,0.3);'), opacity: captionOut }}>
          <span className="qk-heart-pulse" style={css('color:var(--qk-pink); display:inline-flex;')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9C.6 9.2 2 5.5 5.4 5.5c2 0 3.3 1.2 4.1 2.4l2.5 0c.8-1.2 2.1-2.4 4.1-2.4C19.5 5.5 21 9.2 19.6 12c-2.5 4.4-9.6 9-9.6 9z"/></svg>
          </span>
          <span style={css('font-family:var(--qk-mono); font-size:12px; letter-spacing:0.06em; color:var(--qk-ink);')}>@sunnyhill · just posted</span>
        </div>

        {/* AMPLIFY layer (pink) */}
        <div style={{ ...css('position:absolute; inset:0; background:var(--qk-pink); color:#fff; display:flex; flex-direction:column; justify-content:center; padding:0 var(--qk-gutter);'), opacity: ampIn, pointerEvents: ampIn > 0.5 ? 'auto' : 'none' }}>
          {/* floating like bubbles */}
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="qk-like-bubble"
              style={{ position: 'absolute', left: `${18 + i * 19}%`, bottom: '24%', color: '#fff', opacity: 0.9, animationDelay: `${i * 0.6}s` }}
            >
              <svg width={18 + (i % 2) * 8} height={18 + (i % 2) * 8} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9C.6 9.2 2 5.5 5.4 5.5c2 0 3.3 1.2 4.1 2.4l2.5 0c.8-1.2 2.1-2.4 4.1-2.4C19.5 5.5 21 9.2 19.6 12c-2.5 4.4-9.6 9-9.6 9z"/></svg>
            </span>
          ))}

          <div style={css('max-width:1200px; margin:0 auto; width:100%;')}>
            <div style={css('display:inline-flex; align-items:center; gap:10px; padding:8px 16px; border-radius:999px; border:1.5px solid rgba(255,255,255,0.5); font-family:var(--qk-mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:32px;')}>
              <span style={css('width:8px; height:8px; border-radius:50%; background:#fff;')} className="qk-heart-pulse"></span>
              Live · {platform}
            </div>

            <div style={css('display:flex; align-items:flex-end; gap:48px; flex-wrap:wrap;')}>
              <div>
                <div style={css('font-family:var(--qk-display); font-size:clamp(72px,12vw,180px); line-height:0.86; letter-spacing:-0.05em;')}>+{reach}%</div>
                <div style={css('font-family:var(--qk-mono); font-size:12px; letter-spacing:0.16em; text-transform:uppercase; opacity:0.85; margin-top:10px;')}>engagement vs. launch day</div>
              </div>

              {/* engagement ring */}
              <div style={css('position:relative; width:140px; height:140px; flex:none;')}>
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="10" />
                  <circle cx="70" cy="70" r={R} fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={ringOffset} transform="rotate(-90 70 70)" />
                </svg>
                <div style={css('position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;')}>
                  <div style={css('font-family:var(--qk-display); font-size:30px; letter-spacing:-0.03em;')}>{eng}%</div>
                  <div style={css('font-family:var(--qk-mono); font-size:9px; letter-spacing:0.12em; text-transform:uppercase; opacity:0.8;')}>eng. rate</div>
                </div>
              </div>
            </div>

            {/* live metric chips */}
            <div style={css('display:flex; gap:14px; flex-wrap:wrap; margin-top:48px;')}>
              {[[views, 'views'], [likes, 'likes'], [follows, 'new followers'], ['7d', 'to sell out']].map(([v, l]) => (
                <div key={l} style={css('padding:18px 26px; border-radius:20px; background:rgba(255,255,255,0.12); border:1.5px solid rgba(255,255,255,0.25); backdrop-filter:blur(4px);')}>
                  <div style={css('font-family:var(--qk-display); font-size:34px; letter-spacing:-0.02em; line-height:1;')}>{v}</div>
                  <div style={css('font-family:var(--qk-mono); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; opacity:0.8; margin-top:6px;')}>{l}</div>
                </div>
              ))}
            </div>

            {/* closing line */}
            <div style={{ ...css('margin-top:56px; font-family:var(--qk-serif); font-style:italic; font-size:clamp(24px,3.4vw,40px); max-width:18ch; line-height:1.15;'), opacity: finalIn, transform: `translateY(${lerp(20, 0, finalIn)}px)` }}>
              From a quiet idea to a brand that travels.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
