const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const KEY  = process.env.NEXT_PUBLIC_API_KEY;

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${KEY}`,
});

const handle = async (res) => {
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Something went wrong");
  return json.data;
};

// POST /api/v1/reviews — paste or file (file content read as text in frontend)
export const reviewCode = (payload) =>
  fetch(`${BASE}/api/v1/reviews`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  }).then(handle);

// POST /api/v1/reviews/github/file
export const reviewGithubFile = (payload) =>
  fetch(`${BASE}/api/v1/reviews/github/file`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  }).then(handle);

// POST /api/v1/reviews/github/repo
export const reviewGithubRepo = (payload) =>
  fetch(`${BASE}/api/v1/reviews/github/repo`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  }).then(handle);

// GET /api/v1/reviews/:id
export const getReview = (id) =>
  fetch(`${BASE}/api/v1/reviews/${id}`, { headers: headers() }).then(handle);
