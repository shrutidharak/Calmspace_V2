import Link from "next/link";
import { getBlogs } from "../../services/api";
import Pagination from "../components/Pagination";

function isBadImage(src?: string) {
  return !src || src.includes("anonymous-avatar") || src.startsWith("data:image");
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Article: { bg: '#e8f4ed', text: '#2d5a3d' },
  Video: { bg: '#e8eef8', text: '#1e3a6e' },
  Podcast: { bg: '#f4e8f0', text: '#6e1e52' },
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  const response = await getBlogs(page, search);
  const blogs = response.data || [];
  const pagination = response.pagination;

  return (
    <div style={{ background: '#faf8f4', minHeight: '100vh' }}>
      {/* Page Header */}
      <section style={{ background: 'linear-gradient(to bottom, #1a2e1f, #2d5a3d)', color: '#fff', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', color: '#a8d5b5', textTransform: 'uppercase', marginBottom: '12px' }}>
            Knowledge & Wellness
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Mental Health Blogs
          </h1>
          <p style={{ color: '#c5e0cb', fontSize: '1rem', lineHeight: 1.7, marginBottom: '36px' }}>
            Expert insights and practical tools for your emotional well-being journey.
          </p>

          {/* Search Form */}
          <form style={{ display: 'flex', maxWidth: '520px', margin: '0 auto', background: '#fff', borderRadius: '100px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <input
              type="text"
              name="search"
              placeholder="Search articles, topics..."
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
        {/* Result count */}
        {search && (
          <div style={{ marginBottom: '24px', color: '#666', fontSize: '0.9rem' }}>
            Showing results for <strong style={{ color: '#2d5a3d' }}>"{search}"</strong>
            {" — "}
            <Link href="/blogs" style={{ color: '#4a7c59', textDecoration: 'underline', cursor: 'pointer' }}>Clear</Link>
          </div>
        )}

        {blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</p>
            <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '8px', color: '#1a1a1a' }}>No articles found</h2>
            <p style={{ color: '#666' }}>Try a different search term or <Link href="/blogs" style={{ color: '#4a7c59' }}>browse all blogs</Link>.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
              {blogs.map((blog: any) => {
                const bad = isBadImage(blog.imgSrc);
                const cat = CATEGORY_COLORS[blog.category] || { bg: '#f0ece4', text: '#555' };

                return (
                  <Link
                    key={blog._id}
                    href={`/blogs/${blog._id}`}
                    className="hover-card"
                    style={{
                      textDecoration: 'none',
                      background: '#fff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #e8e0d8',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Image */}
                    <div style={{ height: '200px', background: 'linear-gradient(135deg, #e8f4ed 0%, #d0e8d8 100%)', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      {!bad && (
                        <img
                          src={blog.imgSrc}
                          alt={blog.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                      {bad && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                          🌿
                        </div>
                      )}
                      {blog.category && (
                        <span style={{ position: 'absolute', top: '12px', left: '12px', background: cat.bg, color: cat.text, fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          {blog.category}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#1a1a1a', lineHeight: 1.5, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {blog.title}
                      </h2>
                      <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {blog.desc || blog.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0ece4' }}>
                        <div>
                          {blog.author && (
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2d5a3d' }}>{blog.author}</p>
                          )}
                          {blog.createdAt && (
                            <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '2px' }}>
                              {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#4a7c59', fontWeight: 600 }}>Read →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Pagination basePath="/blogs" search={search} pagination={pagination} />
          </>
        )}
      </section>
    </div>
  );
}
