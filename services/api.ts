const BASE_URL = "https://admin.thecalmspace.in/api";

export async function getBlogs(page = 1, search = "") {
  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);

  const response = await fetch(`${BASE_URL}/admin-blog?${params}`, {
    cache: "no-store",
  });

  return response.json();
}

export async function getCounselors(page = 1, search = "") {
  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);

  const response = await fetch(`${BASE_URL}/admin-counselor?${params}`, {
    cache: "no-store",
  });

  return response.json();
}