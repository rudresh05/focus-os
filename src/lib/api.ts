const API_BASE = (process.env.NEXT_PUBLIC_BASE_URL || '') + '/api/focus-os';

export async function fetchSprints() {
  const res = await fetch(`${API_BASE}/sprints`);
  return res.json();
}

export async function createSprint(sprint: any) {
  const res = await fetch(`${API_BASE}/sprints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sprint),
  });
  return res.json();
}

export async function updateSprint(id: string, updates: any) {
  const res = await fetch(`${API_BASE}/sprints`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
  return res.json();
}

export async function saveTracking(tracking: any) {
  const res = await fetch(`${API_BASE}/tracking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tracking),
  });
  return res.json();
}

export async function fetchTracking() {
  const res = await fetch(`${API_BASE}/tracking`);
  return res.json();
}

export async function fetchIdeas() {
  const res = await fetch(`${API_BASE}/ideas`);
  return res.json();
}

export async function createIdea(idea: any) {
  const res = await fetch(`${API_BASE}/ideas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  });
  return res.json();
}

export async function removeIdea(id: string) {
  const res = await fetch(`${API_BASE}/ideas?id=${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  return res.json();
}

export async function saveReview(review: any) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  return res.json();
}

export async function fetchSettings(key?: string) {
  const url = key ? `${API_BASE}/settings?key=${key}` : `${API_BASE}/settings`;
  const res = await fetch(url);
  return res.json();
}

export async function saveSetting(key: string, value: any) {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  });
  return res.json();
}

export async function fetchJournals() {
  const res = await fetch(`${API_BASE}/journals`);
  return res.json();
}

export async function saveJournal(journal: { date: string; data: Record<string, string> }) {
  const res = await fetch(`${API_BASE}/journals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(journal),
  });
  return res.json();
}

export async function deleteJournal(id: string) {
  const res = await fetch(`${API_BASE}/journals?id=${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function fetchAIAnalysis() {
  const res = await fetch(`${API_BASE}/ai-analysis`);
  return res.json();
}
