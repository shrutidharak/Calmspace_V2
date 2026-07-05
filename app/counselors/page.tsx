import { getCounselors } from "../../services/api";
import Pagination from "../components/Pagination";
import Link from "next/link";

export default async function CounselorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  const response = await getCounselors(page, search);
  const counselors = response.data || [];
  const pagination = response.pagination;

  return (
    <div style={{ background: '#faf8f4', minHeight: '100vh' }}>
      {/* Page Header */}
      <section style={{ background: 'linear-gradient(to bottom, #1a2e1f, #2d5a3d)', color: '#fff', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', color: '#a8d5b5', textTransform: 'uppercase', marginBottom: '12px' }}>
            Our Professionals
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Meet Our Counselors
          </h1>
          <p style={{ color: '#c5e0cb', fontSize: '1rem', lineHeight: 1.7, marginBottom: '36px' }}>
            Licensed professionals ready to guide you through life's challenges with empathy and expertise.
          </p>

          {/* Search Form */}
          <form style={{ display: 'flex', maxWidth: '520px', margin: '0 auto', background: '#fff', borderRadius: '100px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <input
              type="text"
              name="search"
              placeholder="Search by name, specialization..."
              defaultValue={search}
              style={{ flex: 1, padding: '14px 22px', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#333', background: 'transparent' }}
            />
            <button
              type="submit"
              style={{ background: '#4a7c59', color: '#fff', border: 'none', padding: '14px 28px', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', borderRadius: '0 100px 100px 0', whiteSpace: 'nowrap' }}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: '1200px', margin: '-24px auto 0', padding: '0 24px 80px', position: 'relative' }}>
        {search && (
          <div style={{ marginBottom: '24px', color: '#666', fontSize: '0.9rem' }}>
            Showing results for <strong style={{ color: '#2d5a3d' }}>"{search}"</strong>
            {" — "}
            <Link href="/counselors" style={{ color: '#4a7c59', textDecoration: 'underline', cursor: 'pointer' }}>Clear</Link>
          </div>
        )}

        {counselors.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</p>
            <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '8px', color: '#1a1a1a' }}>No counselors found</h2>
            <p style={{ color: '#666' }}>Try a different search term or <Link href="/counselors" style={{ color: '#4a7c59' }}>browse all counselors</Link>.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
              {counselors.map((item: any) => {
                const specialities: string[] = item.speciality || [];
                const visible = specialities.slice(0, 3);
                const extra = specialities.length - visible.length;
                const initials = item.counselor?.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || '?';

                return (
                  <div
                    key={item._id}
                    className="hover-card-lg"
                    style={{
                      background: '#fff',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: '1px solid #e8e0d8',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Photo */}
                    <div style={{ height: '220px', background: 'linear-gradient(135deg, #c8dece 0%, #a8c8b4 100%)', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      {item.counselor?.pic ? (
                        <img
                          src={item.counselor.pic}
                          alt={item.counselor?.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 800, color: '#2d5a3d', fontFamily: "'Playfair Display', serif" }}>
                          {initials}
                        </div>
                      )}
                      {/* Status badge */}
                      <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.92)', borderRadius: '100px', padding: '4px 10px', fontSize: '0.72rem', fontWeight: 600, color: item.status === 'online' ? '#1a7a3d' : '#888' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.status === 'online' ? '#22c55e' : '#ccc', display: 'inline-block' }}></span>
                        {item.status === 'online' ? 'Available' : 'Offline'}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: '14px' }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a', marginBottom: '4px' }}>
                          {item.counselor?.name}
                        </h2>
                        <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.degree}
                        </p>
                      </div>

                      {/* Languages */}
                      {item.languages?.length > 0 && (
                        <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '12px' }}>
                          🗣 {item.languages.join(', ')}
                        </p>
                      )}

                      {/* Specialities */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px', flex: 1 }}>
                        {visible.map((s: string, i: number) => (
                          <span key={i} style={{ background: '#eaf3ed', color: '#2d5a3d', fontSize: '0.72rem', fontWeight: 600, padding: '4px 10px', borderRadius: '100px' }}>
                            {s}
                          </span>
                        ))}
                        {extra > 0 && (
                          <span style={{ background: '#f0ece4', color: '#777', fontSize: '0.72rem', padding: '4px 10px', borderRadius: '100px' }}>
                            +{extra} more
                          </span>
                        )}
                      </div>

                      {/* Footer: experience + price */}
                      <div style={{ borderTop: '1px solid #f0ece4', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '0.72rem', color: '#999', marginBottom: '2px' }}>Experience</p>
                          <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>{item.experience} {parseInt(item.experience) === 1 ? 'Year' : 'Years'}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          {item.price?.video && (
                            <>
                              <p style={{ fontSize: '0.72rem', color: '#999', marginBottom: '2px' }}>Video session</p>
                              <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#4a7c59' }}>₹{item.price.video}</p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Book button */}
                      <button style={{ marginTop: '16px', width: '100%', background: '#4a7c59', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
                        Book a Session
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <Pagination basePath="/counselors" search={search} pagination={pagination} />
          </>
        )}
      </section>
    </div>
  );
}
