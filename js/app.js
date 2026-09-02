// ============================================
// SMARTKIDS TOYS — Main App (Router + Pages)
// ============================================

// ---- ROUTER ----
const Router = (() => {
  const routes = {};
  let currentRoute = '';

  function register(path, handler) { routes[path] = handler; }

  function navigate(hash) {
    if (!hash) hash = '#home';
    window.location.hash = hash;
  }

  async function handleRoute() {
    const hash = window.location.hash || '#home';
    const [path, queryStr] = hash.split('?');
    const params = {};
    if (queryStr) queryStr.split('&').forEach(p => { const [k,v] = p.split('='); params[k] = decodeURIComponent(v||''); });
    const segments = path.replace('#','').split('/');
    const page = segments[0];
    const id = segments[1] || null;
    currentRoute = page;
    updateNavActive(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handler = routes[page] || routes['home'];
    if (handler) await handler({ id, params });
  }

  function init() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  function updateNavActive(page) {
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.route === page);
    });
  }

  return { register, navigate, init, getCurrentRoute: () => currentRoute };
})();

window.navigate = Router.navigate;

// ---- PRODUCT CARD RENDERER ----
function renderProductCard(p) {
  const discount = getDiscount(p.price, p.old_price);
  const stars = Math.floor(p.rating || 4.5);
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrap">
        <img src="${p.image_url || 'assets/placeholder.png'}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/400x400/f8f9fa/adb5bd?text=🧸'">
        <div class="product-badges">
          ${discount ? `<span class="product-badge badge-off">${discount}% OFF</span>` : ''}
          ${p.is_new ? `<span class="product-badge badge-new">NEW</span>` : ''}
        </div>
        <button class="wishlist-btn" onclick="toggleWishlist(event,'${p.id}')" title="Add to Wishlist">♡</button>
      </div>
      <div class="product-body">
        <span class="product-cat">${p.category}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description || ''}</div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</span>
          <span class="rating-count">(${p.rating_count || 0})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${formatPrice(p.price)}</span>
          ${p.old_price ? `<span class="price-old">${formatPrice(p.old_price)}</span>` : ''}
        </div>
      </div>
      <div class="product-footer">
        <button class="btn-add-to-bag" id="atb-${p.id}" onclick="addToBag(event,'${p.id}')">
          🛒 Add to Bag
        </button>
      </div>
    </div>`;
}

// ---- SEARCH ----
let searchTimeout;
async function initSearch() {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const q = input.value.trim();
    if (!q) { dropdown.classList.add('hidden'); return; }
    searchTimeout = setTimeout(async () => {
      const results = await Products.search(q);
      if (results.length === 0) {
        dropdown.innerHTML = `<div class="search-no-result">😔 No products found for "<strong>${q}</strong>"</div>`;
      } else {
        dropdown.innerHTML = results.slice(0,6).map(p => `
          <div class="search-dropdown-item" onclick="navigate('#product/${p.id}');document.getElementById('search-input').value='';document.getElementById('search-dropdown').classList.add('hidden')">
            <img src="${p.image_url || ''}" alt="${p.name}" onerror="this.src='https://placehold.co/44x44/f8f9fa/adb5bd?text=🧸'">
            <div>
              <div class="item-name">${p.name}</div>
              <div class="item-price">${formatPrice(p.price)}</div>
            </div>
          </div>`).join('');
      }
      dropdown.classList.remove('hidden');
    }, 300);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) { navigate(`#search?q=${encodeURIComponent(q)}`); dropdown.classList.add('hidden'); }
    }
  });

  document.getElementById('search-btn')?.addEventListener('click', () => {
    const q = input.value.trim();
    if (q) { navigate(`#search?q=${encodeURIComponent(q)}`); dropdown.classList.add('hidden'); }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-search')) dropdown.classList.add('hidden');
  });
}

// ---- ADD TO BAG ----
async function addToBag(e, productId) {
  e.stopPropagation();
  const btn = document.getElementById(`atb-${productId}`);
  const product = await Products.getById(productId);
  if (!product) return;
  Cart.addItem(product, 1);
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Added!';
    btn.classList.add('added');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('added'); }, 1500);
  }
}

window.addToBag = addToBag;

// ---- WISHLIST ----
function toggleWishlist(e, id) {
  e.stopPropagation();
  const btn = e.currentTarget;
  btn.classList.toggle('active');
  btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
}
window.toggleWishlist = toggleWishlist;

// ---- RENDER MAIN CONTENT ----
function setPage(html) {
  const app = document.getElementById('app');
  app.innerHTML = html;
  app.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn-add-to-bag') && !e.target.closest('.wishlist-btn')) {
        navigate(`#product/${card.dataset.id}`);
      }
    });
  });
}

// =============================================
// PAGE: HOME
// =============================================
Router.register('home', async () => {
  const [allProducts, settings] = await Promise.all([Products.getAll(), Settings.getAll()]);
  const featured = allProducts.slice(0, 8);
  const newArrivals = allProducts.filter(p => p.is_new).slice(0, 4);
  const deals = allProducts.filter(p => p.is_deal).slice(0, 4);

  setPage(`
    <!-- HERO -->
    <section class="hero-section page-section">
      <div class="hero-bg">
        <img src="assets/hero-banner.png" alt="SmartKids Toys - Play Learn Grow">
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-left">
          <div class="hero-badge">🌟 Pakistan's Favourite Toy Store</div>
          <h1 class="hero-title">
            Play, Learn &
            <span class="highlight">Grow Together</span>
          </h1>
          <p class="hero-desc">Discover safe, fun and educational toys for every little explorer. Quality you can trust, joy that lasts.</p>
          <div class="hero-buttons">
            <button class="btn btn-primary btn-lg" onclick="navigate('#shop')">🛍️ Shop Now</button>
            <button class="btn btn-outline btn-lg" style="color:white;border-color:rgba(255,255,255,0.6)" onclick="navigate('#deals')">🏷️ View Deals</button>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-deal-box">
            <span class="deal-emoji">🏷️</span>
            <div class="deal-tag">Special Deals</div>
            <div class="deal-off">30% OFF</div>
            <p class="deal-sub">on selected toys</p>
            <button class="btn btn-primary" onclick="navigate('#deals')">Shop Deals</button>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST BAR -->
    <section class="trust-bar">
      <div class="trust-bar-inner">
        <div class="trust-item"><span class="trust-icon">🚚</span><div class="trust-text"><strong>Fast Delivery</strong><span>Across Pakistan</span></div></div>
        <div class="trust-item"><span class="trust-icon">🔒</span><div class="trust-text"><strong>Secure Shopping</strong><span>100% safe & trusted</span></div></div>
        <div class="trust-item"><span class="trust-icon">🧸</span><div class="trust-text"><strong>Quality Toys</strong><span>Child-safe materials</span></div></div>
        <div class="trust-item"><span class="trust-icon">💬</span><div class="trust-text"><strong>WhatsApp Ordering</strong><span>Easy & convenient</span></div></div>
      </div>
    </section>

    <!-- FEATURED CATEGORIES -->
    <section class="categories-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">🎯 Shop by <span>Category</span></h2>
          <a class="view-all" onclick="navigate('#categories')" style="cursor:pointer">View All →</a>
        </div>
        <div class="category-grid">
          ${[
            { name:'Soft Toys', icon:'🧸', color:'background:#ffeef8', count: allProducts.filter(p=>p.category==='Soft Toys').length },
            { name:'Vehicles', icon:'🚂', color:'background:#e3f2fd', count: allProducts.filter(p=>p.category==='Vehicles').length },
            { name:'Puzzles', icon:'🧩', color:'background:#f3e5f5', count: allProducts.filter(p=>p.category==='Puzzles').length },
            { name:'Building Blocks', icon:'🧱', color:'background:#fff3e0', count: allProducts.filter(p=>p.category==='Building Blocks').length },
            { name:'Educational', icon:'🎨', color:'background:#e8f5e9', count: allProducts.filter(p=>p.category==='Educational').length },
            { name:'Outdoor', icon:'⚽', color:'background:#e0f7fa', count: allProducts.filter(p=>p.category==='Outdoor').length },
          ].map(c=>`
            <div class="category-card" onclick="navigate('#shop?cat=${encodeURIComponent(c.name)}')">
              <div class="cat-icon" style="${c.color}">${c.icon}</div>
              <span class="cat-name">${c.name}</span>
              <span class="cat-count">${c.count} items</span>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- NEW ARRIVALS -->
    <section class="products-section" style="background:var(--gray-1)">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">✨ New <span>Arrivals</span></h2>
          <a class="view-all" onclick="navigate('#new-arrivals')" style="cursor:pointer">View All →</a>
        </div>
        <div class="product-grid">${newArrivals.length ? newArrivals.map(renderProductCard).join('') : featured.slice(0,4).map(renderProductCard).join('')}</div>
      </div>
    </section>

    <!-- PROMO BANNERS -->
    <div class="container">
      <div class="promo-banners">
        <div class="promo-banner" onclick="navigate('#new-arrivals')">
          <img src="assets/train-banner.png" alt="New Arrivals">
          <div class="promo-overlay"></div>
          <div class="promo-content">
            <div class="promo-tag">🚂 Just In</div>
            <div class="promo-title">New Arrivals</div>
            <div class="promo-sub">Fresh toys just for your kids!</div>
            <button class="btn btn-primary btn-sm">Shop Now →</button>
          </div>
        </div>
        <div class="promo-banner" onclick="navigate('#deals')" style="background:#fef9ec">
          <img src="assets/teddy-banner.png" alt="Special Deals">
          <div class="promo-overlay" style="background:linear-gradient(90deg,rgba(100,60,0,0.5),rgba(0,0,0,0.1))"></div>
          <div class="promo-content">
            <div class="promo-tag">🏷️ Limited Time</div>
            <div class="promo-title">Special Deals</div>
            <div class="promo-sub">Up to 30% OFF on selected toys</div>
            <button class="btn btn-primary btn-sm" style="background:linear-gradient(135deg,#FF6B35,#FFD23F)">Shop Deals →</button>
          </div>
        </div>
      </div>
    </div>

    <!-- SPECIAL DEALS PRODUCTS -->
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">🏷️ Special <span>Deals</span></h2>
          <a class="view-all" onclick="navigate('#deals')" style="cursor:pointer">View All →</a>
        </div>
        <div class="product-grid">${deals.length ? deals.map(renderProductCard).join('') : featured.slice(4,8).map(renderProductCard).join('')}</div>
      </div>
    </section>

    <!-- WHY US -->
    <section class="why-section">
      <div class="container">
        <div class="section-header" style="justify-content:center;margin-bottom:40px">
          <h2 class="section-title">💫 Why Shop <span>With Us</span></h2>
        </div>
        <div class="why-grid">
          <div class="why-card"><div class="why-icon" style="background:#fff3ef">🚚</div><div class="why-title">Fast Delivery</div><div class="why-desc">Quick delivery across Pakistan. Order today, receive soon!</div></div>
          <div class="why-card"><div class="why-icon" style="background:#e8faf8">🔒</div><div class="why-title">Secure Shopping</div><div class="why-desc">Your information is always safe and protected with us.</div></div>
          <div class="why-card"><div class="why-icon" style="background:#ffeef8">🧸</div><div class="why-title">Quality Toys</div><div class="why-desc">All toys are child-safe and meet quality standards.</div></div>
          <div class="why-card"><div class="why-icon" style="background:#e8f5e9">💬</div><div class="why-title">Easy WhatsApp Ordering</div><div class="why-desc">Just fill your bag and order directly via WhatsApp. Simple!</div></div>
        </div>
      </div>
    </section>
  `);
});

// =============================================
// PAGE: SHOP
// =============================================
Router.register('shop', async ({ params }) => {
  const allProducts = await Products.getAll();
  const selectedCat = params.cat || '';
  let filtered = selectedCat ? allProducts.filter(p => p.category === selectedCat) : [...allProducts];

  const categories = [...new Set(allProducts.map(p => p.category))];
  const catCounts = {};
  categories.forEach(c => catCounts[c] = allProducts.filter(p => p.category === c).length);

  setPage(`
    <div class="page-hero page-section">
      <div class="container">
        <h1 class="page-hero-title">🛍️ Shop All Toys</h1>
        <p class="page-hero-sub">Discover fun, creative and educational toys for every little explorer.</p>
      </div>
    </div>
    <section class="shop-page">
      <div class="container">
        <div class="shop-layout">
          <!-- SIDEBAR -->
          <aside class="shop-sidebar">
            <div class="filter-card" id="filter-panel">
              <div class="filter-card-header">
                🎛️ Filters
                <span class="clear-filters" onclick="clearFilters()">Clear All</span>
              </div>
              <div class="filter-group">
                <div class="filter-group-title">Categories</div>
                ${categories.map(c => `
                  <label class="filter-option">
                    <input type="checkbox" class="filter-cat" value="${c}" ${c === selectedCat ? 'checked' : ''} onchange="applyFilters()">
                    <label>${c}</label>
                    <span class="count">(${catCounts[c]})</span>
                  </label>`).join('')}
              </div>
              <div class="filter-group">
                <div class="filter-group-title">Price</div>
                ${[
                  { label:'Under PKR 1,000', val:'0-1000' },
                  { label:'PKR 1,000–2,500', val:'1000-2500' },
                  { label:'PKR 2,500–5,000', val:'2500-5000' },
                  { label:'Above PKR 5,000', val:'5000-99999' },
                ].map(r => `
                  <label class="filter-option">
                    <input type="checkbox" class="filter-price" value="${r.val}" onchange="applyFilters()">
                    <label>${r.label}</label>
                  </label>`).join('')}
              </div>
              <div class="filter-group">
                <div class="filter-group-title">Availability</div>
                <label class="filter-option"><input type="checkbox" class="filter-avail" value="instock" onchange="applyFilters()"><label>In Stock</label></label>
                <label class="filter-option"><input type="checkbox" class="filter-avail" value="outstock" onchange="applyFilters()"><label>Out of Stock</label></label>
              </div>
            </div>
          </aside>
          <!-- MAIN -->
          <div class="shop-main">
            <div class="shop-toolbar">
              <div>
                <div class="shop-title">${selectedCat || 'All Toys'}</div>
                <div class="result-count" id="result-count">${filtered.length} products found</div>
              </div>
              <select class="sort-select" id="sort-select" onchange="applyFilters()">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
            <div class="product-grid" id="shop-grid">
              ${filtered.map(renderProductCard).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `);

  // Store all products for filtering
  window._shopProducts = allProducts;
});

window.applyFilters = function() {
  const all = window._shopProducts || [];
  const selCats = [...document.querySelectorAll('.filter-cat:checked')].map(el => el.value);
  const selPrices = [...document.querySelectorAll('.filter-price:checked')].map(el => el.value);
  const selAvail = [...document.querySelectorAll('.filter-avail:checked')].map(el => el.value);
  const sortVal = document.getElementById('sort-select')?.value || 'featured';

  let filtered = [...all];
  if (selCats.length) filtered = filtered.filter(p => selCats.includes(p.category));
  if (selPrices.length) {
    filtered = filtered.filter(p => selPrices.some(r => {
      const [min, max] = r.split('-').map(Number);
      return p.price >= min && p.price <= max;
    }));
  }
  if (selAvail.includes('instock') && !selAvail.includes('outstock')) filtered = filtered.filter(p => p.stock > 0);
  if (selAvail.includes('outstock') && !selAvail.includes('instock')) filtered = filtered.filter(p => p.stock <= 0);

  if (sortVal === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (sortVal === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (sortVal === 'newest') filtered.sort((a,b) => (b.is_new?1:0) - (a.is_new?1:0));

  const grid = document.getElementById('shop-grid');
  const count = document.getElementById('result-count');
  if (grid) grid.innerHTML = filtered.map(renderProductCard).join('') || '<p style="padding:40px;color:var(--text-light)">No products match your filters.</p>';
  if (count) count.textContent = `${filtered.length} products found`;
  grid?.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn-add-to-bag') && !e.target.closest('.wishlist-btn')) navigate(`#product/${card.dataset.id}`);
    });
  });
};

window.clearFilters = function() {
  document.querySelectorAll('.filter-cat,.filter-price,.filter-avail').forEach(el => el.checked = false);
  applyFilters();
};

// =============================================
// PAGE: PRODUCT DETAIL
// =============================================
Router.register('product', async ({ id }) => {
  if (!id) { navigate('#shop'); return; }
  const product = await Products.getById(id);
  if (!product) { setPage('<div class="container" style="padding:80px 0;text-align:center"><h2>Product not found</h2><button class="btn btn-primary" onclick="navigate(\'#shop\')">Back to Shop</button></div>'); return; }

  const discount = getDiscount(product.price, product.old_price);
  const stars = Math.floor(product.rating || 4.5);

  setPage(`
    <section class="product-detail-page page-section">
      <div class="container">
        <div class="breadcrumb">
          <a onclick="navigate('#home')" style="cursor:pointer">Home</a><span class="sep">›</span>
          <a onclick="navigate('#shop')" style="cursor:pointer">Shop</a><span class="sep">›</span>
          <a onclick="navigate('#shop?cat=${encodeURIComponent(product.category)}')" style="cursor:pointer">${product.category}</a><span class="sep">›</span>
          <span class="current">${product.name}</span>
        </div>
        <div class="product-detail-layout">
          <!-- GALLERY -->
          <div class="product-gallery">
            <div class="main-image-wrap" id="main-img-wrap">
              <img src="${product.image_url || ''}" alt="${product.name}" id="main-product-img" onerror="this.src='https://placehold.co/600x600/f8f9fa/adb5bd?text=🧸'">
            </div>
            <div class="thumbnails">
              <div class="thumb active" onclick="setMainImg('${product.image_url || ''}',this)">
                <img src="${product.image_url || ''}" alt="${product.name}" onerror="this.src='https://placehold.co/72x72/f8f9fa/adb5bd?text=🧸'">
              </div>
            </div>
          </div>
          <!-- INFO -->
          <div class="product-detail-info">
            <div class="product-detail-cat">${product.category}</div>
            <h1 class="product-detail-name">${product.name}</h1>
            <div class="product-detail-price">
              <span class="detail-price-current">${formatPrice(product.price)}</span>
              ${product.old_price ? `<span class="detail-price-old">${formatPrice(product.old_price)}</span>` : ''}
              ${discount ? `<span class="detail-discount">${discount}% OFF</span>` : ''}
            </div>
            <div class="product-rating" style="margin-bottom:14px">
              <span class="stars" style="font-size:1.1rem">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</span>
              <span style="font-size:0.85rem;color:var(--text-light)">(${product.rating_count || 0} reviews)</span>
            </div>
            <span class="stock-badge ${product.stock > 0 ? 'in-stock' : 'out-stock'}">
              ${product.stock > 0 ? `🟢 In Stock (${product.stock} left)` : '🔴 Out of Stock'}
            </span>
            <p class="product-detail-desc">${product.description || ''}</p>
            <table class="product-info-table">
              <tr><td>Brand</td><td>SmartKids Toys</td></tr>
              <tr><td>Category</td><td>${product.category}</td></tr>
              <tr><td>Availability</td><td>${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td></tr>
              ${product.is_new ? '<tr><td>Status</td><td><span style="color:var(--green);font-weight:700">New Arrival</span></td></tr>' : ''}
              ${product.is_deal ? '<tr><td>Deal</td><td><span style="color:var(--primary);font-weight:700">Special Deal</span></td></tr>' : ''}
            </table>
            <div class="qty-label">Quantity</div>
            <div class="qty-control">
              <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
              <input class="qty-val" id="detail-qty" type="number" value="1" min="1" max="99" readonly>
              <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
            </div>
            <div class="detail-actions">
              <button class="btn btn-outline" onclick="addDetailToBag('${product.id}')">🛒 Add to Bag</button>
              <button class="btn btn-primary" onclick="buyNow('${product.id}')">⚡ Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `);
});

window.setMainImg = function(src, thumb) {
  document.getElementById('main-product-img').src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
};
window.changeDetailQty = function(delta) {
  const input = document.getElementById('detail-qty');
  if (!input) return;
  input.value = Math.max(1, Math.min(99, parseInt(input.value) + delta));
};
window.addDetailToBag = async function(id) {
  const qty = parseInt(document.getElementById('detail-qty')?.value || 1);
  const product = await Products.getById(id);
  if (product) { Cart.addItem(product, qty); }
};
window.buyNow = async function(id) {
  await addDetailToBag(id);
  navigate('#bag');
};

// =============================================
// PAGE: BAG / CART
// =============================================
Router.register('bag', async () => {
  const items = Cart.getItems();
  const total = Cart.getTotal();

  setPage(`
    <section class="bag-page page-section">
      <div class="container">
        <h1 class="bag-title">🛒 Your Shopping Bag <span style="font-size:1rem;color:var(--text-light);font-weight:400">(${Cart.getCount()} items)</span></h1>
        ${items.length === 0 ? `
          <div class="empty-cart">
            <span class="empty-icon">🛒</span>
            <h3>Your bag is empty!</h3>
            <p>Looks like you haven't added any toys yet.</p>
            <button class="btn btn-primary btn-lg" onclick="navigate('#shop')">Start Shopping</button>
          </div>` : `
          <div class="bag-layout">
            <div class="bag-items" id="cart-items-list">
              ${items.map(item => renderCartItem(item)).join('')}
            </div>
            <div>
              <div class="order-summary">
                <div class="summary-header"><h3>Order Summary</h3></div>
                <div class="summary-body">
                  <div class="summary-row"><span class="label">Subtotal (${Cart.getCount()} items)</span><span class="value" id="summary-subtotal">${formatPrice(total)}</span></div>
                  <div class="summary-row"><span class="label">Delivery</span><span class="value" style="color:var(--secondary)">Via WhatsApp</span></div>
                  <div class="summary-divider"></div>
                  <div class="summary-total"><span class="label">Total</span><span class="value" id="summary-total">${formatPrice(total)}</span></div>
                </div>
                <div class="summary-footer">
                  <button class="btn btn-primary btn-full btn-lg" onclick="navigate('#checkout')">Proceed to Checkout →</button>
                  <button class="btn btn-outline btn-full" style="margin-top:10px" onclick="navigate('#shop')">Continue Shopping</button>
                </div>
              </div>
            </div>
          </div>`}
      </div>
    </section>
  `);
});

function renderCartItem(item) {
  return `
    <div class="cart-item" id="cart-item-${item.id}">
      <img class="cart-item-img" src="${item.image_url || ''}" alt="${item.name}" onerror="this.src='https://placehold.co/100x100/f8f9fa/adb5bd?text=🧸'">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.category}</div>
        <div class="cart-item-price">${formatPrice(item.price)} each</div>
        <div class="qty-control" style="margin-top:10px">
          <button class="qty-btn" onclick="updateCartQty('${item.id}',-1)">−</button>
          <input class="qty-val" id="qty-${item.id}" type="number" value="${item.qty}" min="1" max="99" readonly style="width:48px">
          <button class="qty-btn" onclick="updateCartQty('${item.id}',1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-total" id="item-total-${item.id}">${formatPrice(item.price * item.qty)}</div>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑️ Remove</button>
      </div>
    </div>`;
}

window.updateCartQty = function(id, delta) {
  const input = document.getElementById(`qty-${id}`);
  if (!input) return;
  const newQty = Math.max(1, parseInt(input.value) + delta);
  input.value = newQty;
  Cart.updateQty(id, newQty);
  const item = Cart.getItems().find(i => i.id === id);
  if (item) {
    const totEl = document.getElementById(`item-total-${id}`);
    if (totEl) totEl.textContent = formatPrice(item.price * newQty);
  }
  const total = Cart.getTotal();
  const subEl = document.getElementById('summary-subtotal');
  const totEl = document.getElementById('summary-total');
  if (subEl) subEl.textContent = formatPrice(total);
  if (totEl) totEl.textContent = formatPrice(total);
};

window.removeFromCart = function(id) {
  Cart.removeItem(id);
  const el = document.getElementById(`cart-item-${id}`);
  if (el) el.style.animation = 'toast-out 0.3s ease forwards';
  setTimeout(() => {
    if (Cart.getCount() === 0) navigate('#bag');
    else { el?.remove(); const total = Cart.getTotal(); const subEl = document.getElementById('summary-subtotal'); const totEl = document.getElementById('summary-total'); if(subEl) subEl.textContent = formatPrice(total); if(totEl) totEl.textContent = formatPrice(total); }
  }, 350);
};

// =============================================
// PAGE: CHECKOUT
// =============================================
Router.register('checkout', async () => {
  const items = Cart.getItems();
  if (items.length === 0) { navigate('#bag'); return; }
  const total = Cart.getTotal();
  const profile = Auth.getProfile();

  const cities = ['Karachi','Lahore','Islamabad','Rawalpindi','Peshawar','Quetta','Multan','Faisalabad','Sialkot','Gujranwala','Hyderabad','Abbottabad','Murree','Bahawalpur'];

  setPage(`
    <section class="checkout-page page-section">
      <div class="container">
        <h1 class="checkout-title">📋 Checkout</h1>
        <div class="checkout-layout">
          <div>
            <div class="form-card">
              <div class="form-card-header"><h3>👤 Customer Information</h3></div>
              <div class="form-card-body">
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Full Name *</label>
                    <input class="form-input" id="co-name" placeholder="Enter your full name" value="${profile?.full_name || ''}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone Number *</label>
                    <input class="form-input" id="co-phone" placeholder="03XX XXXXXXX" value="${profile?.phone || ''}" required>
                  </div>
                  <div class="form-group full" style="grid-column:1/-1">
                    <label class="form-label">Delivery Address *</label>
                    <input class="form-input" id="co-address" placeholder="Enter complete delivery address" value="${profile?.address || ''}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">City *</label>
                    <select class="form-select" id="co-city" required>
                      <option value="">Select City</option>
                      ${cities.map(c => `<option value="${c}" ${profile?.city === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ORDER SUMMARY -->
          <div>
            <div class="order-summary">
              <div class="summary-header"><h3>Order Summary</h3></div>
              <div class="summary-body">
                ${items.map(i => `
                  <div class="summary-row">
                    <span class="label">${i.name} × ${i.qty}</span>
                    <span class="value">${formatPrice(i.price * i.qty)}</span>
                  </div>`).join('')}
                <div class="summary-divider"></div>
                <div class="summary-row"><span class="label">Delivery</span><span class="value" style="color:var(--secondary)">Via WhatsApp</span></div>
                <div class="summary-divider"></div>
                <div class="summary-total"><span class="label">Total</span><span class="value">${formatPrice(total)}</span></div>
              </div>
              <div class="summary-footer">
                <button class="btn btn-whatsapp btn-full btn-lg" onclick="placeWhatsAppOrder()" id="wa-order-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.832.487 3.555 1.338 5.047L2 22l5.098-1.323C8.506 21.52 10.22 22 12.004 22 17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2z" fill-rule="evenodd" clip-rule="evenodd" opacity=".4"/></svg>
                  Order on WhatsApp →
                </button>
                <button class="btn btn-outline btn-full" style="margin-top:10px" onclick="navigate('#bag')">← Edit Bag</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `);
});

window.placeWhatsAppOrder = async function() {
  const name = document.getElementById('co-name')?.value.trim();
  const phone = document.getElementById('co-phone')?.value.trim();
  const address = document.getElementById('co-address')?.value.trim();
  const city = document.getElementById('co-city')?.value;

  if (!name || !phone || !address || !city) {
    showToast('Please fill in all required fields!', 'error'); return;
  }
  if (!/^03\d{9}$/.test(phone.replace(/\s/g,''))) {
    showToast('Please enter a valid Pakistani phone number (03XXXXXXXXX)', 'error'); return;
  }

  const items = Cart.getItems();
  const total = Cart.getTotal();
  const btn = document.getElementById('wa-order-btn');
  btn.textContent = '⏳ Processing...';
  btn.disabled = true;

  // Save order to Supabase (if configured)
  let orderNumber = 'SKT-ORD-' + String(Date.now()).slice(-4);
  try {
    const order = await Orders.createOrder({ customerName: name, phone, address, city, items, total });
    orderNumber = order.order_number;
  } catch(e) { console.warn('Order save failed, proceeding with WhatsApp only'); }

  const itemsText = items.map((i,idx) => `${idx+1}. ${i.name} × ${i.qty}\n   ${formatPrice(i.price)} each = ${formatPrice(i.price * i.qty)}`).join('\n\n');
  const customerNum = Auth.getProfile()?.customer_number || '';
  const message = `Hello SmartKids Toys! 🧸\n\nOrder #${orderNumber}\n\n👤 Customer Details:\nName: ${name}${customerNum ? `\nCustomer ID: ${customerNum}` : ''}\nPhone: ${phone}\n\n🛍️ Products:\n${itemsText}\n\n💰 Total: ${formatPrice(total)}\n\n📍 Delivery Address:\n${address}\nCity: ${city}\n\nPlease confirm my order. Thank you!`;

  const waNumber = await Settings.getWhatsAppNumber();
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  Cart.clearCart();
  window.open(waUrl, '_blank');
  showToast(`Order #${orderNumber} placed! WhatsApp opened. 🎉`, 'success', 6000);
  setTimeout(() => navigate('#home'), 2000);
};

// =============================================
// PAGE: LOGIN
// =============================================
Router.register('login', async () => {
  if (Auth.isLoggedIn()) { navigate('#account'); return; }
  setPage(`
    <div class="auth-page page-section">
      <div class="auth-card">
        <div class="auth-logo">
          <img src="assets/logo.png" alt="SmartKids Toys">
        </div>
        <h1 class="auth-title">Welcome Back! 👋</h1>
        <p class="auth-subtitle">Login to manage your account and orders.</p>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input class="form-input" id="login-email" type="email" placeholder="your@email.com" autocomplete="email">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input class="form-input" id="login-pass" type="password" placeholder="Enter your password" autocomplete="current-password">
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <label class="form-check"><input type="checkbox" id="remember-me"><span style="font-size:0.88rem">Remember me</span></label>
          <a href="#" style="font-size:0.88rem;color:var(--primary);font-weight:600">Forgot Password?</a>
        </div>
        <button class="btn btn-primary btn-full btn-lg" id="login-btn" onclick="doLogin()">Login</button>
        <div class="auth-footer">Don't have an account? <a onclick="navigate('#signup')" style="cursor:pointer">Create Account</a></div>
        <div id="login-error" style="margin-top:12px;color:var(--red);text-align:center;font-size:0.88rem"></div>
      </div>
    </div>
  `);
  document.getElementById('login-pass')?.addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });
});

window.doLogin = async function() {
  const email = document.getElementById('login-email')?.value.trim();
  const pass = document.getElementById('login-pass')?.value;
  const errEl = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');
  if (!email || !pass) { errEl.textContent = 'Please fill in all fields.'; return; }
  btn.textContent = 'Logging in...'; btn.disabled = true;
  try {
    await Auth.login({ email, password: pass });
    showToast('Welcome back! 👋', 'success');
    navigate('#account');
  } catch(e) {
    errEl.textContent = e.message || 'Login failed. Please check your credentials.';
    btn.textContent = 'Login'; btn.disabled = false;
  }
};

// =============================================
// PAGE: SIGNUP
// =============================================
Router.register('signup', async () => {
  if (Auth.isLoggedIn()) { navigate('#account'); return; }
  setPage(`
    <div class="auth-page page-section">
      <div class="auth-card">
        <div class="auth-logo"><img src="assets/logo.png" alt="SmartKids Toys"></div>
        <h1 class="auth-title">Create Account 🎉</h1>
        <p class="auth-subtitle">Join SmartKids Toys and track your orders easily.</p>
        <div class="form-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <div class="form-group"><label class="form-label">Full Name *</label><input class="form-input" id="su-name" placeholder="Your full name"></div>
          <div class="form-group"><label class="form-label">Phone Number *</label><input class="form-input" id="su-phone" placeholder="03XX XXXXXXX"></div>
        </div>
        <div class="form-group"><label class="form-label">Email Address *</label><input class="form-input" id="su-email" type="email" placeholder="your@email.com" autocomplete="email"></div>
        <div class="form-group"><label class="form-label">Password *</label><input class="form-input" id="su-pass" type="password" placeholder="Min. 6 characters" autocomplete="new-password"></div>
        <div class="form-group"><label class="form-label">Confirm Password *</label><input class="form-input" id="su-pass2" type="password" placeholder="Repeat password"></div>
        <div class="form-check" style="margin-bottom:20px">
          <input type="checkbox" id="su-terms">
          <label for="su-terms" style="font-size:0.88rem">I agree to the <a href="#" style="color:var(--primary);font-weight:600">Terms & Conditions</a></label>
        </div>
        <button class="btn btn-primary btn-full btn-lg" id="su-btn" onclick="doSignup()">Create Account</button>
        <div class="auth-footer">Already have an account? <a onclick="navigate('#login')" style="cursor:pointer">Login</a></div>
        <div id="su-error" style="margin-top:12px;color:var(--red);text-align:center;font-size:0.88rem"></div>
      </div>
    </div>
  `);
});

window.doSignup = async function() {
  const name = document.getElementById('su-name')?.value.trim();
  const phone = document.getElementById('su-phone')?.value.trim();
  const email = document.getElementById('su-email')?.value.trim();
  const pass = document.getElementById('su-pass')?.value;
  const pass2 = document.getElementById('su-pass2')?.value;
  const terms = document.getElementById('su-terms')?.checked;
  const errEl = document.getElementById('su-error');
  const btn = document.getElementById('su-btn');
  if (!name || !phone || !email || !pass) { errEl.textContent = 'Please fill in all fields.'; return; }
  if (pass !== pass2) { errEl.textContent = 'Passwords do not match.'; return; }
  if (pass.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; return; }
  if (!terms) { errEl.textContent = 'Please agree to Terms & Conditions.'; return; }
  btn.textContent = 'Creating account...'; btn.disabled = true;
  try {
    await Auth.signUp({ fullName: name, email, phone, password: pass });
    showToast('Account created! Welcome to SmartKids Toys! 🎉', 'success', 5000);
    navigate('#account');
  } catch(e) {
    errEl.textContent = e.message || 'Signup failed. Please try again.';
    btn.textContent = 'Create Account'; btn.disabled = false;
  }
};

// =============================================
// PAGE: ACCOUNT
// =============================================
Router.register('account', async () => {
  if (!Auth.isLoggedIn()) { navigate('#login'); return; }
  const profile = Auth.getProfile();
  const orders = await Auth.getMyOrders();

  setPage(`
    <section class="account-page page-section">
      <div class="container">
        <div class="account-layout">
          <aside class="account-sidebar">
            <div class="account-profile-mini">
              <div class="account-avatar">${(profile?.full_name||'U').charAt(0).toUpperCase()}</div>
              <div class="account-name">${profile?.full_name || 'Customer'}</div>
              <div class="account-cust-num">${profile?.customer_number || ''}</div>
            </div>
            <nav>
              <div class="account-nav-link active" data-tab="orders" onclick="switchTab('orders',this)">📦 My Orders</div>
              <div class="account-nav-link" data-tab="profile" onclick="switchTab('profile',this)">👤 My Profile</div>
              <div class="account-nav-link" data-tab="addresses" onclick="switchTab('addresses',this)">📍 Addresses</div>
              <div class="account-nav-link" onclick="doLogout()" style="color:var(--red)">🚪 Logout</div>
            </nav>
          </aside>
          <div class="account-content" id="account-content">
            ${renderOrdersTab(orders)}
          </div>
        </div>
      </div>
    </section>
  `);
});

window.switchTab = function(tab, el) {
  document.querySelectorAll('.account-nav-link').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
  const profile = Auth.getProfile();
  const content = document.getElementById('account-content');
  if (tab === 'orders') Auth.getMyOrders().then(orders => content.innerHTML = renderOrdersTab(orders));
  else if (tab === 'profile') content.innerHTML = renderProfileTab(profile);
  else if (tab === 'addresses') content.innerHTML = `<div class="account-section-title">📍 Saved Addresses</div><div style="background:white;border-radius:14px;padding:24px;box-shadow:var(--shadow-sm)"><p style="color:var(--text-light)">Saved address: ${profile?.address || 'No address saved'}, ${profile?.city || ''}</p></div>`;
};

function renderOrdersTab(orders) {
  if (!orders || orders.length === 0) return `
    <div class="account-section-title">📦 My Orders</div>
    <div style="background:white;border-radius:14px;padding:48px;text-align:center;box-shadow:var(--shadow-sm)">
      <div style="font-size:4rem;margin-bottom:16px">📭</div>
      <h3 style="font-family:var(--font-heading);font-size:1.2rem;margin-bottom:8px">No orders yet</h3>
      <p style="color:var(--text-light);margin-bottom:20px">Your WhatsApp orders will appear here.</p>
      <button class="btn btn-primary" onclick="navigate('#shop')">Start Shopping</button>
    </div>`;
  return `
    <div class="account-section-title">📦 My Orders (${orders.length})</div>
    ${orders.map(order => `
      <div class="order-card">
        <div class="order-card-header">
          <div><div class="order-num">#${order.order_number}</div><div class="order-date">${new Date(order.created_at).toLocaleDateString('en-PK', {day:'numeric',month:'short',year:'numeric'})}</div></div>
          <span class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase()+order.status.slice(1)}</span>
        </div>
        <div class="order-card-body">
          ${(order.order_items||[]).map(i => `
            <div class="order-item-row">
              <div><div class="order-item-name">${i.product_name}</div><div class="order-item-qty">Qty: ${i.quantity}</div></div>
              <div class="order-item-price">${formatPrice(i.price * i.quantity)}</div>
            </div>`).join('')}
          <div class="order-total-row"><span class="order-total-label">Total:</span><span class="order-total-val">${formatPrice(order.total)}</span></div>
        </div>
      </div>`).join('')}`;
}

function renderProfileTab(profile) {
  return `
    <div class="account-section-title">👤 My Profile</div>
    <div class="form-card">
      <div class="form-card-body">
        <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="prof-name" value="${profile?.full_name||''}"></div>
        <div class="form-group"><label class="form-label">Phone Number</label><input class="form-input" id="prof-phone" value="${profile?.phone||''}"></div>
        <div class="form-group"><label class="form-label">City</label><input class="form-input" id="prof-city" value="${profile?.city||''}"></div>
        <div class="form-group"><label class="form-label">Address</label><input class="form-input" id="prof-addr" value="${profile?.address||''}"></div>
        <button class="btn btn-primary" id="save-prof-btn" onclick="saveProfile()">💾 Save Changes</button>
      </div>
    </div>`;
}

window.saveProfile = async function() {
  const btn = document.getElementById('save-prof-btn');
  btn.textContent = 'Saving...'; btn.disabled = true;
  try {
    await Auth.updateProfile({
      fullName: document.getElementById('prof-name')?.value,
      phone: document.getElementById('prof-phone')?.value,
      city: document.getElementById('prof-city')?.value,
      address: document.getElementById('prof-addr')?.value
    });
    showToast('Profile updated! ✅', 'success');
  } catch(e) { showToast('Failed to update profile.', 'error'); }
  btn.textContent = '💾 Save Changes'; btn.disabled = false;
};

window.doLogout = async function() {
  await Auth.logout();
  showToast('Logged out successfully.', 'info');
  navigate('#home');
};

// =============================================
// PAGE: CATEGORIES
// =============================================
Router.register('categories', async () => {
  const cats = [
    { name:'Soft Toys', icon:'🧸', desc:'Teddy bears, plush toys and cuddly friends.', bg:'linear-gradient(135deg,#ffeef8,#ffd6ec)' },
    { name:'Educational', icon:'🎨', desc:'Fun toys that help children learn and grow.', bg:'linear-gradient(135deg,#e8f5e9,#c8e6c9)' },
    { name:'Vehicles', icon:'🚂', desc:'Cars, trains, trucks and more for little drivers.', bg:'linear-gradient(135deg,#e3f2fd,#bbdefb)' },
    { name:'Puzzles', icon:'🧩', desc:'Fun challenges for growing minds.', bg:'linear-gradient(135deg,#f3e5f5,#e1bee7)' },
    { name:'Building Blocks', icon:'🧱', desc:'Create, build and imagine without limits.', bg:'linear-gradient(135deg,#fff3e0,#ffe0b2)' },
    { name:'Outdoor', icon:'⚽', desc:'Active fun for little explorers outside.', bg:'linear-gradient(135deg,#e0f7fa,#b2ebf2)' },
    { name:'Baby Toys', icon:'🍼', desc:'Safe and stimulating toys for babies 0-24 months.', bg:'linear-gradient(135deg,#fce4ec,#f8bbd0)' },
  ];

  setPage(`
    <div class="page-hero page-section">
      <div class="container">
        <h1 class="page-hero-title">🎯 Shop by Category</h1>
        <p class="page-hero-sub">Find the perfect toy for every age and interest.</p>
      </div>
    </div>
    <section class="categories-page">
      <div class="container">
        <div class="categories-big-grid">
          ${cats.map(c => `
            <div class="category-big-card" onclick="navigate('#shop?cat=${encodeURIComponent(c.name)}')">
              <div class="cat-bg" style="background:${c.bg}">${c.icon}</div>
              <div class="cat-gradient"></div>
              <div class="cat-big-content">
                <div class="cat-big-name">${c.name}</div>
                <div class="cat-big-desc">${c.desc}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>
  `);
});

// =============================================
// PAGE: NEW ARRIVALS
// =============================================
Router.register('new-arrivals', async () => {
  const all = await Products.getAll();
  const newProds = all.filter(p => p.is_new);
  const display = newProds.length ? newProds : all.slice(0, 8);

  setPage(`
    <section class="page-section" style="position:relative;overflow:hidden;min-height:300px;background:#c8e6f5">
      <img src="assets/train-banner.png" alt="New Arrivals" style="width:100%;height:300px;object-fit:cover;object-position:center">
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,40,80,0.65),rgba(0,0,0,0.05));display:flex;align-items:center">
        <div style="padding:0 60px;color:white">
          <div style="font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;opacity:0.8;margin-bottom:8px">🚂 Just Arrived</div>
          <h1 style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);font-weight:900;margin-bottom:8px">New Arrivals</h1>
          <p style="font-size:1rem;opacity:0.85;margin-bottom:24px">Fresh toys just for your kids!</p>
          <button class="btn btn-primary" onclick="navigate('#shop')">Shop All Toys</button>
        </div>
      </div>
    </section>
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">✨ New <span>Arrivals</span></h2>
          <span style="color:var(--text-light);font-size:0.9rem">${display.length} products</span>
        </div>
        <div class="product-grid">${display.map(renderProductCard).join('')}</div>
      </div>
    </section>
  `);
});

// =============================================
// PAGE: SPECIAL DEALS
// =============================================
Router.register('deals', async () => {
  const all = await Products.getAll();
  const dealProds = all.filter(p => p.is_deal);
  const display = dealProds.length ? dealProds : all.filter(p => p.old_price);

  setPage(`
    <section class="page-section" style="position:relative;overflow:hidden;min-height:300px;background:#fef9ec">
      <img src="assets/teddy-banner.png" alt="Special Deals" style="width:100%;height:300px;object-fit:cover;object-position:center right">
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(100,60,0,0.6),rgba(0,0,0,0.05));display:flex;align-items:center">
        <div style="padding:0 60px;color:white">
          <div style="font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;opacity:0.8;margin-bottom:8px">🏷️ Limited Time</div>
          <h1 style="font-family:var(--font-heading);font-size:clamp(2rem,4vw,3rem);font-weight:900;margin-bottom:4px">Special Deals</h1>
          <div style="font-family:var(--font-heading);font-size:clamp(1.2rem,2.5vw,1.8rem);font-weight:900;color:var(--accent);margin-bottom:8px">Up to 30% OFF</div>
          <p style="font-size:1rem;opacity:0.85;margin-bottom:24px">Big fun, little prices!</p>
          <button class="btn btn-primary" onclick="navigate('#shop')">Browse All Toys</button>
        </div>
      </div>
    </section>
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">🏷️ Special <span>Deals</span></h2>
          <span style="color:var(--text-light);font-size:0.9rem">${display.length} deals available</span>
        </div>
        <div class="product-grid">${display.map(renderProductCard).join('')}</div>
      </div>
    </section>
  `);
});

// =============================================
// PAGE: SEARCH
// =============================================
Router.register('search', async ({ params }) => {
  const q = params.q || '';
  const results = q ? await Products.search(q) : [];

  setPage(`
    <section class="search-page page-section">
      <div class="container">
        <div class="breadcrumb">
          <a onclick="navigate('#home')" style="cursor:pointer">Home</a><span class="sep">›</span>
          <span class="current">Search</span>
        </div>
        <h1 class="search-query-title">Search results for "<span>${q}</span>"</h1>
        <p class="search-count">${results.length} product${results.length !== 1 ? 's' : ''} found</p>
        ${results.length === 0 ? `
          <div class="no-results">
            <span class="icon">🔍</span>
            <h3>No Products Found</h3>
            <p>We couldn't find any toys matching "<strong>${q}</strong>".</p>
            <button class="btn btn-primary" onclick="navigate('#shop')">Browse All Toys</button>
          </div>` : `
          <div class="product-grid">${results.map(renderProductCard).join('')}</div>`}
      </div>
    </section>
  `);
});

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', async () => {
  Cart.updateCartBadge();
  await Auth.init();
  await Settings.getAll();
  await initSearch();
  Router.init();
});
