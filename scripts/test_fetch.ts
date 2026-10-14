async function checkUrl(url: string) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status;
  } catch (e: any) {
    return 500;
  }
}

async function test() {
  const url1 = 'https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=800&auto=format&fit=crop&q=80';
  const status = await checkUrl(url1);
  console.log('Status for url1:', status);
}

test();
