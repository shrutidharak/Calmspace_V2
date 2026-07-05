import Link from "next/link";

export default function Navbar() {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #e8e0d8', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2d5a3d', letterSpacing: '-0.02em' }}>
            CalmSpace
          </span>
        </Link>
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/blogs" style={navLink}>Blogs</Link>
          <Link href="/counselors" style={navLink}>Counselors</Link>
          <Link href="/counselors" style={ctaBtn}>Book a Session</Link>
        </nav>
      </div>
    </header>
  );
}

const navLink: React.CSSProperties = {
  color: '#444',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.9rem',
  padding: '8px 14px',
  borderRadius: '8px',
  transition: 'background 0.15s',
};

const ctaBtn: React.CSSProperties = {
  background: '#4a7c59',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: '9px 20px',
  borderRadius: '100px',
  marginLeft: '8px',
  cursor: 'pointer',
};
