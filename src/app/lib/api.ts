export async function fetchMetrics() {
  const usersRes = await fetch("https://dummyjson.com/users?limit=150");
  const postsRes = await fetch("https://dummyjson.com/posts?limit=150");
  const usersJson = await usersRes.json();
  const postsJson = await postsRes.json();

  const campaigns = postsJson.posts.slice(0, 100).map((p: any, i: number) => {
    const date = new Date(Date.now() - (i * 86400000)); // past days
    return {
      campaign: p.title.slice(0, 20),
      impressions: Math.floor(20000 + Math.random() * 80000),
      clicks: Math.floor(500 + Math.random() * 3000),
      ctr: (Math.random() * 10).toFixed(1),
      date: date.toISOString().slice(0, 10),
    };
  });

  return {
    users: usersJson.total,
    revenue: Math.floor(50000 + Math.random() * 150000),
    conversions: Math.floor(1000 + Math.random() * 5000),
    growth: (Math.random() * 30).toFixed(1),
    campaigns,
    fetchedAt: new Date().toISOString(),
  };
}
