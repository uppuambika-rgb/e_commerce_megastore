async function searchWiki(query: string, limit = 5): Promise<string[]> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'MegaStorePhotoFetcher/1.0 (contact@example.com)' },
    });
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    const urls: string[] = [];
    for (const page of Object.values(data.query.pages) as any[]) {
      if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
        const u: string = page.imageinfo[0].url;
        if (/\.(jpg|jpeg|png|webp)$/i.test(u)) {
          urls.push(u);
        }
      }
    }
    return urls;
  } catch (e) {
    return [];
  }
}

async function run() {
  const queries = ['wireless headphones', 'mechanical keyboard', 'computer monitor', 'computer mouse', 'running shoes'];
  for (const q of queries) {
    const res = await searchWiki(q, 3);
    console.log(q, '=>', res.length, 'images found');
    console.log(res[0]);
  }
}

run();
