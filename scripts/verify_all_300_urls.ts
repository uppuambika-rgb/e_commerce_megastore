import { UNIQUE_PRODUCT_IMAGES } from '../backend/db/uniqueProductImages.ts';

async function checkAll() {
  const entries = Object.entries(UNIQUE_PRODUCT_IMAGES);
  console.log(`Checking ${entries.length} image URLs...`);

  let okCount = 0;
  let failCount = 0;
  const failed: Array<{ id: string; url: string; status: number }> = [];

  const promises = entries.map(async ([id, url]) => {
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(3000),
      });
      if (res.status >= 200 && res.status < 400) {
        okCount++;
      } else {
        failCount++;
        failed.push({ id, url, status: res.status });
      }
    } catch (e: any) {
      failCount++;
      failed.push({ id, url, status: 500 });
    }
  });

  await Promise.all(promises);

  console.log(`Results: ${okCount} OK, ${failCount} failed.`);
  if (failed.length > 0) {
    console.log('Failed images count:', failed.length, 'Samples:', failed.slice(0, 5));
  }
}

checkAll();
