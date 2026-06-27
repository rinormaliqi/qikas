import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageSlot from '../components/ImageSlot.jsx';
import WorkStory from '../components/WorkStory.jsx';
import { css } from '../lib/css.js';

const masonry = [
  { id: 'ms-01', ratio: '4/5', radius: '32px', cap: 'Editorial portrait — soft light' },
  { id: 'ms-02', ratio: '1/1', radius: '200px 32px 200px 32px', cap: 'Still life — product detail' },
  { id: 'ms-03', ratio: '3/4', radius: '32px', cap: 'Architectural / interior' },
  { id: 'ms-04', ratio: '5/4', radius: '32px', cap: 'Behind-the-scenes — set' },
  { id: 'ms-05', ratio: '4/5', radius: '32px 32px 200px 32px', cap: 'Fashion editorial' },
  { quote: '“We do loud things, quietly well.”' },
  { id: 'ms-07', ratio: '3/4', radius: '200px 32px 32px 32px', cap: 'Night / event photography' },
  { id: 'ms-08', ratio: '4/5', radius: '32px', cap: 'Studio still — flowers / texture' },
  { id: 'ms-09', ratio: '1/1', radius: '32px 200px 32px 32px', cap: 'Editorial — wide landscape' },
];

const services = [
  { n: '01', title: ['Brand', 'Identity'], desc: 'Naming, logos, typography, color, motion — and a system your team can actually live inside.', meta: '04 deliverables' },
  { n: '02', title: ['Image &', 'Art Dir.'], desc: 'Photography, film, lookbooks, campaign imagery — produced in-studio, on location, and on time.', meta: 'in-house production' },
  { n: '03', title: ['Social &', 'Content'], desc: 'Always-on content engines, editorial calendars, and the considered feed your audience comes back to.', meta: 'monthly retainers' },
  { n: '04', title: ['Influence', '& Talent'], desc: 'Curated casting and campaign production across the region and the diaspora — the right faces, the right rooms.', meta: '200+ creators' },
  { n: '05', title: ['Events &', 'Activations'], desc: 'Launches, parties, brand activations — designed end to end, from room to run-of-show to morning-after content.', meta: 'end to end' },
];

const stats = [
  { v: '06', accent: '.', label: 'years in the room', color: 'var(--qk-ink)' },
  { v: '48', accent: '+', label: 'brands made loud', color: 'var(--qk-ink)' },
  { v: '22', accent: ',', label: 'events produced', color: 'var(--qk-ink)' },
  { v: '∞', accent: '', label: 'coffees pulled', color: 'var(--qk-pink)' },
];

const clients = [
  { name: 'Afrodita Cosmetics', style: 'display' },
  { name: 'Natura Therapy', style: 'serif' },
  { name: 'Energym', style: 'display' },
  { name: 'Premium Bakery', style: 'serif' },
  { name: 'Zone Mobile', style: 'display' },
  { name: 'CineStar', style: 'serif' },
  { name: 'KFC', style: 'display' },
  { name: 'Bono', style: 'serif' },
];

const marqueeWords = [
  ['Branding', 0], ['✿', 1], ['socials', 2], ['✿', 1], ['Events', 0], ['✿', 1],
  ['influence', 2], ['✿', 1], ['Campaigns', 0], ['✿', 1], ['content', 2], ['✿', 1],
];
// On the pink marquee band everything is white.
const marqueeStyles = {
  0: 'font-family:var(--qk-display); line-height:1; letter-spacing:-0.035em; text-transform:uppercase; color:#fff;',
  1: 'font-family:var(--qk-serif); font-style:italic; color:#fff; line-height:1;',
  2: 'font-family:var(--qk-serif); font-style:italic; color:#fff; text-transform:lowercase; line-height:1;',
};

const ENDPOINT = '';

export default function Home() {
  const [status, setStatus] = useState({ msg: '', state: '' });

  const handleFormInput = (e) => {
    const t = e.target;
    if (t.classList?.contains('qk-err') && t.checkValidity()) t.classList.remove('qk-err');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const valid = f.checkValidity();
      f.classList.toggle('qk-err', !valid);
      if (!valid && ok) {
        ok = false;
        f.focus();
      }
    });
    if (!ok) {
      setStatus({ msg: 'Please fill in the highlighted fields.', state: 'error' });
      return;
    }
    const data = new FormData(form);
    setStatus({ msg: 'Sending…', state: 'pending' });
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('bad response');
      } else {
        const subject = `New project enquiry — ${data.get('name')}`;
        const body = [
          `Name: ${data.get('name')}`,
          `Email: ${data.get('email')}`,
          `Company: ${data.get('company') || '—'}`,
          `Needs: ${data.get('projectType')}`,
          '',
          String(data.get('message') || ''),
        ].join('\n');
        window.location.href = `mailto:hello@qikas.house?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      form.reset();
      setStatus({ msg: "Thanks — we'll be in touch within two working days.", state: 'success' });
    } catch {
      setStatus({ msg: "Something went wrong. Email hello@qikas.house and we'll sort it.", state: 'error' });
    }
  };

  return (
    <div className="qk-shell" style={css('background:var(--qk-white); color:var(--qk-ink);')}>

      {/* ============== HERO ============== */}
      <section id="top" style={css('position:relative; min-height:980px; padding:200px var(--qk-gutter) 120px; overflow:hidden; background:var(--qk-white);')}>
        <div style={css('position:absolute; inset:0; pointer-events:none;')}>
          <div className="qk-cloud-a" style={css('position:absolute; top:120px; left:-40px; width:520px; opacity:0.32;')}>
            <svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg">
              <g fill="#D4014A">
                <ellipse cx="100" cy="160" rx="100" ry="60" /><ellipse cx="200" cy="120" rx="110" ry="80" />
                <ellipse cx="320" cy="110" rx="100" ry="75" /><ellipse cx="420" cy="150" rx="90" ry="60" />
                <ellipse cx="260" cy="190" rx="220" ry="40" />
              </g>
            </svg>
          </div>
          <div className="qk-cloud-b" style={css('position:absolute; top:60px; right:-80px; width:560px; opacity:0.32;')}>
            <svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg">
              <g fill="#D4014A">
                <ellipse cx="110" cy="170" rx="100" ry="65" /><ellipse cx="220" cy="130" rx="120" ry="90" />
                <ellipse cx="350" cy="120" rx="110" ry="85" /><ellipse cx="460" cy="160" rx="100" ry="70" />
                <ellipse cx="280" cy="200" rx="240" ry="45" />
              </g>
            </svg>
          </div>
          <div className="qk-cloud-c" style={css('position:absolute; top:380px; left:32%; width:260px; opacity:0.22;')}>
            <svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">
              <g fill="#D4014A">
                <ellipse cx="60" cy="80" rx="50" ry="35" /><ellipse cx="120" cy="60" rx="55" ry="42" />
                <ellipse cx="180" cy="65" rx="50" ry="40" /><ellipse cx="220" cy="85" rx="40" ry="30" />
                <ellipse cx="130" cy="100" rx="110" ry="22" />
              </g>
            </svg>
          </div>
          <div className="qk-cloud-a" style={css('position:absolute; bottom:80px; left:8%; width:340px; opacity:0.22;')}>
            <svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg">
              <g fill="#D4014A">
                <ellipse cx="80" cy="100" rx="70" ry="48" /><ellipse cx="160" cy="80" rx="78" ry="55" />
                <ellipse cx="240" cy="90" rx="70" ry="52" /><ellipse cx="170" cy="120" rx="150" ry="28" />
              </g>
            </svg>
          </div>
        </div>

        <div style={css('position:relative; max-width:1400px; margin:0 auto; text-align:center;')}>
        

          <h1 className="qk-d-hero" style={css('font-family:var(--qk-display); line-height:0.86; letter-spacing:-0.05em; margin:0; text-transform:uppercase;')}>
            We Make<br />It <span style={css('color:var(--qk-pink); font-family:var(--qk-serif); font-style:italic; font-weight:400; letter-spacing:-0.02em; text-transform:lowercase;')}>pop.</span>
          </h1>

          <p style={css('font-size:20px; line-height:1.5; max-width:560px; margin:48px auto 0; color:var(--qk-muted);')}>
            An independent studio for brands with a point of view — built on identity, image, social, and the rooms where culture happens.
          </p>

          <div style={css('display:flex; gap:14px; justify-content:center; margin-top:40px; flex-wrap:wrap;')}>
            <a href="#work" className="qk-cta qk-cta-dark" style={css('display:inline-flex; align-items:center; gap:10px; padding:16px 30px; border-radius:999px; text-decoration:none; font-size:14px; font-weight:500;')}>See selected work →</a>
            <a href="#contact" className="qk-cta qk-cta-light" style={css('display:inline-flex; align-items:center; gap:10px; padding:16px 30px; border-radius:999px; background:#fff; color:var(--qk-ink); text-decoration:none; font-size:14px; font-weight:500;')}>Say hello</a>
          </div>

          <div className="qk-bob qk-orbit" style={css('position:absolute; left:-20px; top:120px;')}>
            <div className="qk-card" style={css('width:170px; height:170px; border-radius:50%; overflow:hidden; box-shadow:0 20px 40px -16px rgba(212,1,74,0.30); border:4px solid #fff; transform:rotate(-6deg);')}>
              <div className="qk-hover-grow" style={css('width:100%; height:100%;')}>
                <ImageSlot ratio="1/1" placeholder="Editorial portrait" eager={true} src='/assets/foto3.jpeg'/>
              </div>
            </div>
          </div>
          <div className="qk-bob qk-orbit" style={css('position:absolute; right:0; top:200px; animation-delay:-2.5s;')}>
            <div className="qk-card" style={css('width:200px; height:240px; border-radius:120px; overflow:hidden; box-shadow:0 24px 50px -18px rgba(212,1,74,0.32); border:4px solid #fff; transform:rotate(8deg);')}>
              <div className="qk-hover-grow" style={css('width:100%; height:100%;')}>
                <ImageSlot ratio="5/6" placeholder="Studio still" eager={true} src='/assets/foto.jpeg'/>
              </div>
            </div>
          </div>

          {/* <div className="qk-spin qk-orbit" style={css('position:absolute; right:2%; bottom:-30px; width:118px; height:118px;')}>
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <defs><path id="qk-circle-hero" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" /></defs>
              <circle cx="100" cy="100" r="94" fill="#D4014A" />
              <text fontFamily="'JetBrains Mono', monospace" fontSize="14" letterSpacing="4" fontWeight="700" fill="#FFFFFF">
                <textPath href="#qk-circle-hero">SCROLL • POP • SCROLL • POP • SCROLL • POP •  </textPath>
              </text>
              <text x="100" y="116" textAnchor="middle" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="68" fill="#FFFFFF">q</text>
            </svg>
          </div> */}
        </div>
      </section>

      {/* ============== MARQUEE (pink band) ============== */}
      <section style={css('background:var(--qk-pink); padding:32px 0; overflow:hidden;')}>
        <div style={css('display:flex; gap:48px; white-space:nowrap; animation:qk-marquee 40s linear infinite; width:max-content;')}>
          {[0, 1].flatMap((rep) =>
            marqueeWords.map(([word, kind], i) => (
              <span key={`${rep}-${i}`} className="qk-d-marquee" style={css(marqueeStyles[kind])}>{word}</span>
            ))
          )}
        </div>
      </section>

      {/* ============== INTRO / MANIFESTO ============== */}
      <section style={css('padding:140px var(--qk-gutter);')}>
        <div data-reveal className="qk-grid-12" style={css('display:grid; grid-template-columns:1fr 2.4fr; gap:80px; align-items:start;')}>
          <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--qk-pink);')}>Index — 001<br /><span style={css('color:var(--qk-faint);')}>Manifesto</span></div>
          <p className="qk-d-intro" style={css('font-family:var(--qk-display); line-height:1.02; letter-spacing:-0.03em; margin:0; text-transform:uppercase;')}>
            We build brand worlds<br />you can <span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; color:var(--qk-pink); text-transform:lowercase;')}>walk into</span> — through identity, image, social, and the rooms where culture happens.
          </p>
        </div>
      </section>

      {/* ============== VISUAL DIARY (MASONRY) ============== */}
      <section id="journal" style={css('padding:0 var(--qk-gutter) 140px;')}>
        <div className="qk-clients-head" style={css('display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:64px;')}>
          <div data-reveal>
            <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--qk-pink); margin-bottom:20px;')}>Index — 002 / From the studio</div>
            <h2 className="qk-d-h2" style={css('font-family:var(--qk-display); line-height:0.9; letter-spacing:-0.04em; margin:0; text-transform:uppercase;')}>
              A visual<br /><span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; color:var(--qk-pink); text-transform:lowercase;')}>diary.</span>
            </h2>
          </div>
          <a href="#" data-reveal className="qk-cta qk-cta-light" style={css('text-decoration:none; color:var(--qk-ink); font-size:14px; font-weight:500; padding:14px 26px; border-radius:999px; background:#fff; white-space:nowrap;')}>View the archive →</a>
        </div>

        <div data-reveal className="qk-masonry" style={css('column-count:3; column-gap:28px;')}>
          {masonry.map((m, i) => m.quote ? (
            <div key={i} className="qk-card" style={css('break-inside:avoid; margin:0 0 28px; border-radius:32px; overflow:hidden; box-shadow:0 20px 50px -25px rgba(212,1,74,0.18); background:var(--qk-pink);')}>
              <div style={css('width:100%; aspect-ratio:1/1; display:grid; place-items:center; padding:32px; box-sizing:border-box; text-align:center;')}>
                <div style={css('font-family:var(--qk-serif); font-style:italic; font-size:clamp(32px,4vw,64px); line-height:1.05; color:#fff; letter-spacing:-0.02em;')}>{m.quote}</div>
              </div>
            </div>
          ) : (
            <div key={i} className="qk-card" style={css(`break-inside:avoid; margin:0 0 28px; border-radius:${m.radius}; overflow:hidden; box-shadow:0 20px 50px -25px rgba(212,1,74,0.18);`)}>
              <div className="qk-hover-grow"><ImageSlot ratio={m.ratio} placeholder={m.cap} src='/assets/foto4.jpeg' /></div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== SELECTED WORK — scroll story ============== */}
      <WorkStory />
    {/* ============== SERVICES ============== */}
      <section id="services" style={css('padding:160px var(--qk-gutter);')}>
        <div data-reveal className="qk-grid-12" style={css('display:grid; grid-template-columns:1fr 2fr; gap:80px; align-items:end; margin-bottom:80px;')}>
          <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--qk-pink);')}>Index — 005 / Services</div>
          <h2 className="qk-d-h2" style={css('font-family:var(--qk-display); line-height:0.9; letter-spacing:-0.04em; margin:0; text-transform:uppercase;')}>What we <span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; color:var(--qk-pink); text-transform:lowercase;')}>do.</span></h2>
        </div>

        <div style={css('display:flex; flex-direction:column; gap:18px;')}>
          {services.map((s) => (
            <a
              key={s.n}
              href="#"
              data-reveal
              className="qk-card qk-service-row"
              style={css('display:grid; grid-template-columns:80px 1.3fr 1.8fr 1fr 60px; gap:48px; align-items:center; padding:32px 40px; background:#fff; border-radius:48px; text-decoration:none; color:var(--qk-ink);')}
            >
              <div style={css('font-family:var(--qk-display); font-size:32px; letter-spacing:-0.02em; color:var(--qk-pink);')}>{s.n}</div>
              <div style={css('font-family:var(--qk-display); font-size:clamp(30px,4vw,44px); line-height:1.0; letter-spacing:-0.03em; text-transform:uppercase;')}>{s.title[0]}<br />{s.title[1]}</div>
              <div className="qk-service-desc" style={css('font-size:15px; line-height:1.55; color:var(--qk-muted); max-width:460px;')}>{s.desc}</div>
              <div className="qk-service-meta" style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--qk-faint);')}>{s.meta}</div>
              <div className="qk-service-arrow" style={css('font-family:var(--qk-serif); font-style:italic; font-size:42px; text-align:right; color:var(--qk-pink);')}>→</div>
            </a>
          ))}
        </div>
      </section>
      {/* ============== MANIFESTO QUOTE ON PINK ============== */}
      <section id="studio" style={css('padding:180px var(--qk-gutter); background:var(--qk-pink); color:#fff; border-radius:64px; margin-top:-32px; position:relative; overflow:hidden;')}>
        <div className="qk-cloud-b" style={css('position:absolute; bottom:-80px; right:-80px; width:520px; opacity:0.5;')}>
          <svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFFFFF">
              <ellipse cx="100" cy="160" rx="100" ry="60" /><ellipse cx="220" cy="130" rx="120" ry="90" />
              <ellipse cx="350" cy="130" rx="110" ry="85" /><ellipse cx="460" cy="160" rx="100" ry="70" />
            </g>
          </svg>
        </div>
        <div data-reveal style={css('max-width:1300px; margin:0 auto; position:relative;')}>
          <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; opacity:0.7; margin-bottom:40px;')}>Index — 004 / Manifesto</div>
          <p className="qk-d-pink" style={css('font-family:var(--qk-display); line-height:0.96; letter-spacing:-0.04em; margin:0; text-transform:uppercase;')}>
            We don't chase <span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; text-transform:lowercase;')}>trends.</span><br />
            We build the brands<br />that quietly <span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; text-transform:lowercase;')}>become them.</span>
          </p>
          <div style={css('display:flex; align-items:center; gap:18px; margin-top:72px; font-family:var(--qk-mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; opacity:0.85;')}>
            <span style={css('display:inline-block; width:36px; height:1px; background:#fff;')}></span>
            Anila Hajdari · Co-founder, Qikas
          </div>
        </div>
      </section>
      {/* ============== INSIDE THE HOUSE ============== */}
      <section style={css('padding:140px var(--qk-gutter); background:var(--qk-white); border-radius:64px 64px 0 0;')}>
        <div data-reveal className="qk-grid-2" style={css('display:grid; grid-template-columns:1fr 1fr; gap:96px; align-items:center; margin-bottom:96px;')}>
          <div>
            <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--qk-pink); margin-bottom:24px;')}>Index — 006 / Inside the house</div>
            <h2 className="qk-d-studio" style={css('font-family:var(--qk-display); line-height:0.92; letter-spacing:-0.04em; margin:0 0 40px; text-transform:uppercase;')}>A small<br />studio,<br /><span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; color:var(--qk-pink); text-transform:lowercase;')}>made by hand.</span></h2>
            <p style={css('font-size:17px; line-height:1.6; color:var(--qk-muted); margin:0 0 24px; max-width:520px;')}>Eight people — designers, producers, photographers, and a strategist who keeps everyone honest. Based in Prishtina, working across Europe.</p>
            <p style={css('font-size:17px; line-height:1.6; color:var(--qk-muted); margin:0 0 48px; max-width:520px;')}>One team from kickoff to launch. Your project is not handed off three times before it ships.</p>
            <div style={css('display:flex; gap:14px; flex-wrap:wrap;')}>
              <Link to="/about" className="qk-cta qk-cta-dark" style={css('display:inline-flex; align-items:center; gap:10px; padding:14px 28px; border-radius:999px; text-decoration:none; font-size:13px; font-weight:500;')}>Meet the team →</Link>
              <Link to="/careers" className="qk-cta qk-cta-light" style={css('display:inline-flex; align-items:center; gap:10px; padding:14px 28px; border-radius:999px; color:var(--qk-ink); text-decoration:none; font-size:13px; font-weight:500; background:#fff;')}>We're hiring · 3 roles</Link>
            </div>
          </div>
          <div style={css('display:grid; grid-template-columns:1fr 1fr; gap:24px;')}>
            <div className="qk-card" style={css('overflow:hidden; border-radius:32px; transform:translateY(20px); box-shadow:0 20px 50px -25px rgba(212,1,74,0.25);')}><div className="qk-hover-grow"><ImageSlot ratio="4/5" placeholder="Team portrait" /></div></div>
            <div className="qk-card" style={css('overflow:hidden; border-radius:200px 32px 32px 32px; box-shadow:0 20px 50px -25px rgba(212,1,74,0.25);')}><div className="qk-hover-grow"><ImageSlot ratio="4/5" placeholder="Studio interior" /></div></div>
            <div className="qk-card" style={css('overflow:hidden; border-radius:32px 32px 200px 32px; box-shadow:0 20px 50px -25px rgba(212,1,74,0.25);')}><div className="qk-hover-grow"><ImageSlot ratio="4/5" placeholder="At work — detail" /></div></div>
            <div className="qk-card" style={css('overflow:hidden; border-radius:32px; transform:translateY(20px); box-shadow:0 20px 50px -25px rgba(212,1,74,0.25);')}><div className="qk-hover-grow"><ImageSlot ratio="4/5" placeholder="Team portrait" /></div></div>
          </div>
        </div>

        <div data-reveal className="qk-stats" style={css('display:grid; grid-template-columns:repeat(4,1fr); gap:20px;')}>
          {stats.map((s) => (
            <div key={s.label} style={css('padding:48px 32px; background:#fff; border:1.5px solid var(--qk-pink); border-radius:48px; text-align:center; box-shadow:0 12px 30px -18px rgba(212,1,74,0.18);')}>
              <div style={css(`font-family:var(--qk-display); font-size:clamp(64px,8vw,96px); line-height:1; letter-spacing:-0.05em; color:${s.color};`)}>{s.v}<span style={css('color:var(--qk-pink);')}>{s.accent}</span></div>
              <div style={css('font-size:13px; letter-spacing:0.04em; margin-top:12px; color:var(--qk-faint);')}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== CLIENTS ============== */}
      <section style={css('padding:140px var(--qk-gutter);')}>
        <div data-reveal className="qk-clients-head" style={css('display:flex; justify-content:space-between; align-items:baseline; margin-bottom:48px;')}>
          <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--qk-pink);')}>Index — 007 / In good company</div>
          <div style={css('font-family:var(--qk-serif); font-style:italic; font-size:22px; color:var(--qk-muted);')}>a few of the brands we work with</div>
        </div>
        <div data-reveal style={css('display:flex; flex-wrap:wrap; gap:14px;')}>
          {clients.map((c) => (
            <div
              key={c.name}
              style={css(
                c.style === 'display'
                  ? 'padding:20px 36px; border-radius:999px; background:#fff; border:1.5px solid var(--qk-pink); font-family:var(--qk-display); font-size:clamp(22px,3vw,30px); letter-spacing:-0.02em; color:var(--qk-ink); text-transform:uppercase;'
                  : 'padding:20px 36px; border-radius:999px; background:var(--qk-pink); font-family:var(--qk-serif); font-style:italic; font-size:clamp(26px,3.4vw,34px); letter-spacing:-0.01em; color:#fff;'
              )}
            >{c.name}</div>
          ))}
        </div>
      </section>

      {/* ============== BIG CTA ============== */}
      <section id="contact" style={css('position:relative; padding:180px var(--qk-gutter) 140px; background:var(--qk-white); border-radius:64px 64px 0 0; overflow:hidden;')}>
        <div className="qk-cloud-a" style={css('position:absolute; top:60px; left:-40px; width:380px; opacity:0.24;')}>
          <svg viewBox="0 0 380 180" xmlns="http://www.w3.org/2000/svg">
            <g fill="#D4014A"><ellipse cx="90" cy="120" rx="80" ry="50" /><ellipse cx="180" cy="90" rx="90" ry="65" /><ellipse cx="280" cy="100" rx="85" ry="60" /><ellipse cx="200" cy="140" rx="170" ry="32" /></g>
          </svg>
        </div>
        <div className="qk-cloud-b" style={css('position:absolute; top:100px; right:-60px; width:420px; opacity:0.24;')}>
          <svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
            <g fill="#D4014A"><ellipse cx="100" cy="130" rx="90" ry="55" /><ellipse cx="200" cy="100" rx="100" ry="75" /><ellipse cx="310" cy="110" rx="90" ry="65" /><ellipse cx="210" cy="155" rx="190" ry="32" /></g>
          </svg>
        </div>

        <div data-reveal style={css('position:relative; text-align:center; max-width:1400px; margin:0 auto;')}>
          <div style={css('font-family:var(--qk-mono); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--qk-pink); margin-bottom:40px;')}>Index — 008 / Let's talk</div>
          <h2 className="qk-d-cta" style={css('font-family:var(--qk-display); line-height:0.86; letter-spacing:-0.05em; margin:0 0 56px; text-transform:uppercase;')}>
            Let's make<br />something <span style={css('font-family:var(--qk-serif); font-style:italic; font-weight:400; color:var(--qk-pink); text-transform:lowercase;')}>together.</span>
          </h2>
          <a
            href="mailto:hello@qikas.house"
            className="qk-cta qk-cta-dark"
            style={css('display:inline-flex; align-items:center; gap:14px; padding:22px 48px; border-radius:999px; text-decoration:none; font-family:var(--qk-display); font-size:clamp(20px,3.4vw,36px); letter-spacing:-0.02em; box-shadow:0 30px 60px -25px rgba(212,1,74,0.4);')}
          >
            hello@qikas.house
            <span style={css('display:inline-block; width:14px; height:14px; background:#fff; border-radius:50%;')}></span>
          </a>

          {/* Contact form */}
          <form className="qk-form" noValidate onSubmit={handleSubmit} onInput={handleFormInput}>
            <div className="qk-form-row">
              <label className="qk-field">
                <span className="qk-label">Your name</span>
                <input className="qk-input" type="text" name="name" required autoComplete="name" placeholder="Jane Doe" />
              </label>
              <label className="qk-field">
                <span className="qk-label">Email</span>
                <input className="qk-input" type="email" name="email" required autoComplete="email" placeholder="you@studio.com" />
              </label>
            </div>
            <div className="qk-form-row">
              <label className="qk-field">
                <span className="qk-label">Company <em>(optional)</em></span>
                <input className="qk-input" type="text" name="company" autoComplete="organization" placeholder="Brand or studio" />
              </label>
              <label className="qk-field">
                <span className="qk-label">What do you need?</span>
                <select className="qk-input" name="projectType" defaultValue="Brand identity">
                  <option value="Brand identity">Brand identity</option>
                  <option value="Image & art direction">Image & art direction</option>
                  <option value="Social & content">Social & content</option>
                  <option value="Influence & talent">Influence & talent</option>
                  <option value="Events & activations">Events & activations</option>
                  <option value="Something else">Something else</option>
                </select>
              </label>
            </div>
            <label className="qk-field">
              <span className="qk-label">Tell us about the project</span>
              <textarea className="qk-input qk-textarea" name="message" rows="4" required placeholder="A sentence or two on what you're building, timing, and budget if you have one."></textarea>
            </label>
            <div className="qk-form-actions">
              <button type="submit" className="qk-submit qk-cta">Send it →</button>
              <p className="qk-form-status" role="status" aria-live="polite" data-state={status.state}>{status.msg}</p>
            </div>
          </form>

          {/* <div className="qk-contact-meta" style={css('display:inline-flex; flex-wrap:wrap; justify-content:center; gap:36px; margin-top:48px; padding:24px 40px; border-radius:999px; background:#fff; border:1.5px solid var(--qk-pink); box-shadow:0 8px 30px -12px rgba(212,1,74,0.18); font-size:13px;')}>
            <div style={css('display:flex; align-items:center; gap:10px;')}><span style={css('display:inline-block; width:8px; height:8px; background:var(--qk-pink); border-radius:50%; box-shadow:0 0 0 4px rgba(212,1,74,0.2);')}></span>Booking Q3 · 3 of 4 slots filled</div>
            <div style={css('opacity:0.5;')}>·</div>
            <div>join@qikas.house</div>
            <div style={css('opacity:0.5;')}>·</div>
            <div>Rr. Bedri Pejani 14, 10000 Prishtina</div>
          </div> */}
        </div>
      </section>

    </div>
  );
}
