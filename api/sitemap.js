// Vercel Serverless Function to dynamically generate real-time sitemap.xml
// As new products are added, this endpoint automatically includes their dedicated page URL.

const DOMAIN = 'https://www.smartkidstoys.pk';
const SUPABASE_URL = 'https://vbhtsoqhaymguhetxnmo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiaHRzb3FoYXltZ3VoZXR4bm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTAzNDQsImV4cCI6MjEwMzQ4NjM0NH0.XHOhrL6AEErHJlWeIxkJUSSBUA9-1zyf2ekc2fbs3hA';

function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const STATIC_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'shop', priority: '0.9', changefreq: 'daily' },
  { path: 'new-arrivals', priority: '0.9', changefreq: 'daily' },
  { path: 'deals', priority: '0.9', changefreq: 'daily' },
  { path: 'categories', priority: '0.8', changefreq: 'weekly' },
  { path: 'about', priority: '0.7', changefreq: 'monthly' },
  { path: 'about-us', priority: '0.7', changefreq: 'monthly' },
  { path: 'contact', priority: '0.7', changefreq: 'monthly' },
  { path: 'contact-us', priority: '0.7', changefreq: 'monthly' },
  { path: 'sitemap', priority: '0.6', changefreq: 'weekly' },
  { path: 'shipping-delivery', priority: '0.4', changefreq: 'monthly' },
  { path: 'returns-refunds', priority: '0.4', changefreq: 'monthly' },
  { path: 'privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: 'terms', priority: '0.3', changefreq: 'yearly' }
];

const CATEGORY_SLUGS = [
  'baby-toddler',
  'educational',
  'action-figures',
  'dolls-playsets',
  'vehicles-track-sets',
  'remote-control',
  'puzzles-games',
  'outdoor-sports'
];

const DEFAULT_PRODUCTS = [
  { slug: 'cute-teddy-bear', name: 'Cute Teddy Bear' },
  { slug: 'colorful-building-blocks-set', name: 'Colorful Building Blocks Set' },
  { slug: 'remote-control-monster-truck', name: 'Remote Control Monster Truck' },
  { slug: 'puzzle-fun-100-pieces', name: 'Puzzle Fun 100 Pieces' },
  { slug: 'rainbow-stacker', name: 'Rainbow Stacker' },
  { slug: 'magnetic-building-tiles', name: 'Magnetic Building Tiles' },
  { slug: 'wooden-alphabet-puzzle', name: 'Wooden Alphabet Puzzle' },
  { slug: 'die-cast-car-set-pack-of-5', name: 'Die-Cast Car Set (Pack of 5)' },
  { slug: '1000-piece-castle-puzzle', name: '1000-Piece Castle Puzzle' },
  { slug: 'panda-plush-toy-40cm', name: 'Panda Plush Toy (40cm)' },
  { slug: 'superhero-action-figure-set', name: 'Superhero Action Figure Set' },
  { slug: 'deluxe-pretend-play-kitchen-set', name: 'Deluxe Pretend Play Kitchen Set' },
  { slug: '3-wheel-light-up-kids-scooter', name: '3-Wheel Light-up Kids Scooter' },
  { slug: 'little-builder-bundle', name: 'Little Builder Bundle' },
  { slug: 'creative-kids-bundle', name: 'Creative Kids Bundle' },
  { slug: 'stem-learning-bundle', name: 'STEM Learning Bundle' },
  { slug: 'birthday-mega-gift-bundle', name: 'Birthday Mega Gift Bundle' }
];

export default async function handler(req, res) {
  const today = new Date().toISOString().split('T')[0];
  const productMap = new Map();

  // 1. Seed with default products
  DEFAULT_PRODUCTS.forEach(p => {
    productMap.set(p.slug, {
      slug: p.slug,
      lastmod: today
    });
  });

  // 2. Fetch all real-time products from Supabase database
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const dbRes = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,description,category,created_at`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);

    if (dbRes.ok) {
      const dbProducts = await dbRes.json();
      if (Array.isArray(dbProducts)) {
        dbProducts.forEach(p => {
          const s = slugify(p.name || `product-${p.id}`);
          if (s) {
            const lastmod = p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : today;
            productMap.set(s, { slug: s, lastmod });
          }
        });
      }
    }
  } catch (err) {
    console.warn('Live products fetch notice:', err.message);
  }

  // 3. Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

  // Core Static Pages
  xml += `  <!-- Core Store Pages -->\n`;
  STATIC_ROUTES.forEach(r => {
    const loc = r.path ? `${DOMAIN}/${r.path}` : `${DOMAIN}/`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Category Pages
  xml += `\n  <!-- Category Pages -->\n`;
  CATEGORY_SLUGS.forEach(slug => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/category/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic Product Pages
  xml += `\n  <!-- Product Pages (Auto-Updated Live) -->\n`;
  for (const prod of productMap.values()) {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/product/${prod.slug}</loc>\n`;
    xml += `    <lastmod>${prod.lastmod || today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
