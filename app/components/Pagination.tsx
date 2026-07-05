import Link from "next/link";

type PaginationProps = {
  basePath: string;
  search?: string;
  pagination?: {
    page?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
};

export default function Pagination({ basePath, search = "", pagination }: PaginationProps) {
  if (!pagination) return null;

  const page = pagination.page ?? 1;
  const totalPages = pagination.totalPages ?? 1;
  const hasNext = pagination.hasNext ?? false;
  const hasPrev = pagination.hasPrev ?? false;

  const buildHref = (p: number) =>
    `${basePath}?page=${p}${search ? `&search=${encodeURIComponent(search)}` : ""}`;

  if (totalPages <= 1) return null;

  // Show at most 7 page numbers with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [];
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, "…", totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "…", page - 1, page, page + 1, "…", totalPages);
    }
    return pages;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '56px', flexWrap: 'wrap' }}>
      {hasPrev ? (
        <Link href={buildHref(page - 1)} style={btnStyle(false)}>← Prev</Link>
      ) : (
        <span style={{ ...btnStyle(false), opacity: 0.35, pointerEvents: 'none' }}>← Prev</span>
      )}

      {getPageNumbers().map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: '#888' }}>…</span>
        ) : (
          <Link key={p} href={buildHref(p as number)} style={p === page ? activeBtn : btnStyle(false)}>
            {p}
          </Link>
        )
      )}

      {hasNext ? (
        <Link href={buildHref(page + 1)} style={btnStyle(false)}>Next →</Link>
      ) : (
        <span style={{ ...btnStyle(false), opacity: 0.35, pointerEvents: 'none' }}>Next →</span>
      )}
    </div>
  );
}

const btnStyle = (_active: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '38px',
  height: '38px',
  padding: '0 12px',
  borderRadius: '10px',
  border: '1px solid #ddd',
  background: '#fff',
  color: '#333',
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.15s',
});

const activeBtn: React.CSSProperties = {
  ...btnStyle(true),
  background: '#4a7c59',
  color: '#fff',
  border: '1px solid #4a7c59',
  fontWeight: 700,
};
