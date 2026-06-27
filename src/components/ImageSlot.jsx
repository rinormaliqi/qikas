/**
 * ImageSlot — a fillable photography slot.
 *
 * Pass `src` (a file in /public/images) to show a real photograph; until then
 * it renders an on-brand placeholder carrying the art-direction caption so the
 * layout reads correctly with zero assets. The parent card owns the border
 * radius / overflow / hover-grow, so this just fills its frame.
 */
export default function ImageSlot({
  src = '/assets/qikas-logo.png',
  alt = '',
  placeholder = 'Photography',
  ratio = '4/5',
  eager = false,
}) {
  if (src) {
    return (
      <img
        className="qk-slot-img"
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ aspectRatio: ratio }}
      />
    );
  }

  // Two-colour placeholder: white frame, pink outline + caption.
  return (
    <div
      className="qk-slot-empty"
      role="img"
      aria-label={placeholder}
      style={{
        aspectRatio: ratio,
        background: 'var(--qk-white)',
        color: 'var(--qk-pink)',
        boxShadow: 'inset 0 0 0 1.5px rgba(212,1,74,0.35)',
      }}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="14" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12.5" r="3.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 5.5l1.2-2h5.6L16 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span className="qk-slot-cap">{placeholder}</span>
    </div>
  );
}
