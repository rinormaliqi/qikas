/**
 * css('font-family:var(--qk-body); color:#fff') -> { fontFamily: 'var(--qk-body)', color: '#fff' }
 *
 * Lets us keep the exact inline-style strings from the original design instead
 * of hand-converting hundreds of declarations to camelCased objects (which is
 * where visual drift creeps in). CSS custom properties (--qk-*) are passed
 * through verbatim; everything else is camelCased for React.
 */
export function css(str) {
  const out = {};
  if (!str) return out;
  for (const decl of str.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop || !value) continue;
    if (prop.startsWith('--')) {
      out[prop] = value;
    } else {
      out[prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
    }
  }
  return out;
}
