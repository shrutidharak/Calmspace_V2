import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1a2e1f 0%, #2d5a3d 60%, #4a7c59 100%)', color: '#fff', padding: '100px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', color: '#a8d5b5', textTransform: 'uppercase', marginBottom: '20px' }}>
          Mental Health Support
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.15, maxWidth: '800px', margin: '0 auto 24px', letterSpacing: '-0.02em' }}>
          You Deserve to Feel <em style={{ fontStyle: 'italic', color: '#a8d5b5' }}>Well</em>
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#c5e0cb', maxWidth: '540px', margin: '0 auto 44px', lineHeight: 1.7 }}>
          Connect with licensed counselors, explore expert-written articles, and take the first step toward lasting mental well-being.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/counselors" style={{ background: '#fff', color: '#2d5a3d', textDecoration: 'none', fontWeight: 700, padding: '14px 32px', borderRadius: '100px', fontSize: '0.95rem', cursor: 'pointer' }}>
            Find a Counselor
          </Link>
          <Link href="/blogs" style={{ background: 'transparent', color: '#fff', textDecoration: 'none', fontWeight: 600, padding: '14px 32px', borderRadius: '100px', fontSize: '0.95rem', border: '2px solid rgba(255,255,255,0.35)', cursor: 'pointer' }}>
            Read Blogs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          {[
            { icon: '🧠', title: 'Expert Counselors', desc: 'Licensed professionals specializing in anxiety, depression, relationships, and more.' },
            { icon: '📝', title: 'Curated Articles', desc: 'Evidence-backed blogs to help you understand and navigate your mental health journey.' },
            { icon: '🔒', title: 'Safe & Confidential', desc: 'Your privacy is our priority. All sessions are completely confidential and secure.' },
          ].map((f) => (
            <div key={f.title} style={{ background: '#fff', borderRadius: '16px', padding: '36px 28px', border: '1px solid #e8e0d8' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px', color: '#1a1a1a' }}>{f.title}</h3>
              <p style={{ color: '#666', lineHeight: 1.7, fontSize: '0.95rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section style={{ background: '#4a7c59', color: '#fff', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>
          Ready to Start Your Journey?
        </h2>
        <p style={{ color: '#c5e0cb', marginBottom: '32px', fontSize: '1rem' }}>Browse our counselors and find the right fit for you.</p>
        <Link href="/counselors" style={{ background: '#fff', color: '#2d5a3d', textDecoration: 'none', fontWeight: 700, padding: '14px 36px', borderRadius: '100px', fontSize: '0.95rem', cursor: 'pointer' }}>
          Meet Our Counselors →
        </Link>
      </section>
    </div>
  );
}
