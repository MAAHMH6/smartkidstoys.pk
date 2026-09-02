// ============================================
// SMARTKIDS TOYS — Admin Dashboard Logic
// ============================================

// ---- ADMIN STATE ----
let adminUser = null;
let adminProfile = null;
let currentAdminSection = 'dashboard';

// ---- INIT ----
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supa.auth.getSession();
  if (!session?.user) { showLoginScreen(); return; }
  const { data: profile } = await supa.from('profiles').select('*').eq('id', session.user.id).single();
  if (!profile?.is_admin) { window.location.href = 'index.html'; return; }
  adminUser = session.user;
  adminProfile = profile;
  showAdminPanel();
  await loadSection('dashboard');
});

// ---- SHOW/HIDE SCREENS ----
function showLoginScreen() {
  document.getElementById('admin-login-screen').style.display = 'flex';
  document.getElementById('admin-panel').style.display = 'none';
}
function showAdminPanel() {
  document.getElementById('admin-login-screen').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'flex';
  document.getElementById('admin-user-name').textContent = adminProfile?.full_name || adminUser?.email || 'Admin';
  document.getElementById('admin-user-email').textContent = adminUser?.email || '';
}

// ---- LOGIN ----
window.adminLogin = async function() {
  const email = document.getElementById('admin-email')?.value.trim();
  const pass = document.getElementById('admin-pass')?.value;
  const errEl = document.getElementById('admin-login-error');
  const btn = document.getElementById('admin-login-btn');
  if (!email || !pass) { errEl.textContent = 'Please fill in both fields.'; return; }
  btn.textContent = 'Logging in...'; btn.disabled = true; errEl.textContent = '';
  try {
    const { data, error } = await supa.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    const { data: profile } = await supa.from('profiles').select('*').eq('id', data.user.id).single();
    if (!profile?.is_admin) {
      await supa.auth.signOut();
      throw new Error('Access denied. Admin accounts only.');
    }
    adminUser = data.user;
    adminProfile = profile;
    showAdminPanel();
    await loadSection('dashboard');
  } catch(e) {
    errEl.textContent = e.message || 'Login failed.';
    btn.textContent = 'Login'; btn.disabled = false;
  }
};

window.adminLogout = async function() {
  await supa.auth.signOut();
  adminUser = null; adminProfile = null;
  showLoginScreen();
};

// ---- NAVIGATION ----
window.loadSection = async function(section) {
  currentAdminSection = section;
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.toggle('active', l.dataset.section === section));
  const titles = { dashboard:'Dashboard', products:'Products', orders:'Orders', customers:'Customers', settings:'Site Settings' };
  document.getElementById('topbar-page-title').textContent = titles[section] || 'Dashboard';
  const content = document.getElementById('admin-content');
  content.innerHTML = `<div class="page-loader"><div class="spinner"></div></div>`;
  try {
    if (section === 'dashboard') await renderDashboard(content);
    else if (section === 'products') await renderProducts(content);
    else if (section === 'orders') await renderOrders(content);
    else if (section === 'customers') await renderCustomers(content);
    else if (section === 'settings') await renderSettings(content);
  } catch(e) {
    content.innerHTML = `<div class="admin-empty"><span class="empty-icon">⚠️</span><h3>Error Loading Section</h3><p>${e.message}</p></div>`;
  }
};

// ============================================
// DASHBOARD
// ============================================
async function renderDashboard(el) {
  const [{ count: totalProducts }, { count: totalOrders }, { count: totalCustomers }] = await Promise.all([
    supa.from('products').select('*', { count: 'exact', head: true }),
    supa.from('orders').select('*', { count: 'exact', head: true }),
    supa.from('profiles').select('*', { count: 'exact', head: true }).eq('is_admin', false),
  ]);
  const { data: recentOrders } = await supa.from('orders').select('*').order('created_at', { ascending: false }).limit(5);
  const { data: revenue } = await supa.from('orders').select('total');
  const totalRevenue = (revenue || []).reduce((s, o) => s + (o.total || 0), 0);

  el.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card orange">
        <div class="stat-info"><div class="stat-label">Total Products</div><div class="stat-value">${totalProducts || 0}</div><div class="stat-change up">🏪 Active in store</div></div>
        <div class="stat-icon orange">📦</div>
      </div>
      <div class="stat-card teal">
        <div class="stat-info"><div class="stat-label">Total Orders</div><div class="stat-value">${totalOrders || 0}</div><div class="stat-change up">📈 All time</div></div>
        <div class="stat-icon teal">🛒</div>
      </div>
      <div class="stat-card green">
        <div class="stat-info"><div class="stat-label">Total Revenue</div><div class="stat-value">PKR ${Number(totalRevenue).toLocaleString()}</div><div class="stat-change up">💰 All orders</div></div>
        <div class="stat-icon green">💰</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-info"><div class="stat-label">Customers</div><div class="stat-value">${totalCustomers || 0}</div><div class="stat-change up">👥 Registered</div></div>
        <div class="stat-icon purple">👥</div>
      </div>
    </div>
    <div class="admin-card">
      <div class="admin-card-header">
        <div class="admin-card-title"><span class="icon">🛒</span> Recent Orders</div>
        <button class="btn btn-outline btn-sm" onclick="loadSection('orders')">View All</button>
      </div>
      <div class="admin-card-body">
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>Order #</th><th>Customer</th><th>Phone</th><th>City</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              ${(recentOrders || []).map(o => `
                <tr>
                  <td><strong>${o.order_number}</strong></td>
                  <td>${o.customer_name}</td>
                  <td>${o.phone}</td>
                  <td>${o.city}</td>
                  <td><strong>PKR ${Number(o.total).toLocaleString()}</strong></td>
                  <td><span class="badge ${statusBadgeClass(o.status)}">${o.status}</span></td>
                  <td>${new Date(o.created_at).toLocaleDateString('en-PK')}</td>
                </tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--text-light)">No orders yet</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function statusBadgeClass(s) {
  return { pending: 'badge-yellow', confirmed: 'badge-blue', delivered: 'badge-green' }[s] || 'badge-gray';
}

// ============================================
// PRODUCTS
// ============================================
async function renderProducts(el) {
  const { data: products } = await supa.from('products').select('*').order('created_at', { ascending: false });
  el.innerHTML = `
    <div class="admin-card">
      <div class="admin-card-header">
        <div class="admin-card-title"><span class="icon">📦</span> Products (${(products||[]).length})</div>
        <button class="btn btn-primary btn-sm" onclick="openProductModal(null)">+ Add Product</button>
      </div>
      <div class="admin-card-body">
        <div class="admin-toolbar">
          <input class="search-input-admin" id="product-search" placeholder="🔍 Search products..." oninput="filterProductTable(this.value)">
          <select class="filter-select-admin" id="product-cat-filter" onchange="filterProductTable(document.getElementById('product-search').value)">
            <option value="">All Categories</option>
            ${[...new Set((products||[]).map(p=>p.category))].map(c=>`<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table" id="product-table">
            <thead><tr><th>Image</th><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Tags</th><th>Actions</th></tr></thead>
            <tbody id="product-tbody">
              ${(products||[]).map(p => renderProductRow(p)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="product-modal-wrap"></div>`;
  window._adminProducts = products || [];
}

function renderProductRow(p) {
  const discount = p.old_price ? Math.round((1-p.price/p.old_price)*100) : 0;
  return `
    <tr data-product-id="${p.id}" data-name="${p.name.toLowerCase()}" data-cat="${p.category}">
      <td><img class="product-thumb" src="${p.image_url||''}" alt="${p.name}" onerror="this.src='https://placehold.co/48x48/f8f9fa/adb5bd?text=📦'"></td>
      <td><div class="table-product-name">${p.name}</div><div class="table-product-cat">${(p.description||'').substring(0,50)}...</div></td>
      <td><span class="badge badge-teal">${p.category}</span></td>
      <td>
        <strong>PKR ${Number(p.price).toLocaleString()}</strong>
        ${p.old_price ? `<br><small style="color:var(--text-light);text-decoration:line-through">PKR ${Number(p.old_price).toLocaleString()}</small>` : ''}
        ${discount ? `<br><span class="badge badge-primary">${discount}% OFF</span>` : ''}
      </td>
      <td>
        <strong>${p.stock}</strong>
        <div class="stock-bar"><div class="stock-fill ${p.stock>20?'high':p.stock>5?'medium':'low'}" style="width:${Math.min(100,p.stock)}%"></div></div>
      </td>
      <td>
        ${p.is_new ? `<span class="badge badge-green">New</span> ` : ''}
        ${p.is_deal ? `<span class="badge badge-primary">Deal</span>` : ''}
      </td>
      <td>
        <button class="action-btn action-btn-primary action-btn-sm" onclick="openProductModal('${p.id}')">✏️ Edit</button>
        <button class="action-btn action-btn-danger action-btn-sm" onclick="deleteProduct('${p.id}','${p.name.replace(/'/g,"\\'")}')">🗑️</button>
      </td>
    </tr>`;
}

window.filterProductTable = function(query) {
  const cat = document.getElementById('product-cat-filter')?.value || '';
  const q = (query||'').toLowerCase();
  document.querySelectorAll('#product-tbody tr').forEach(row => {
    const name = row.dataset.name || '';
    const rowCat = row.dataset.cat || '';
    const nameMatch = !q || name.includes(q);
    const catMatch = !cat || rowCat === cat;
    row.style.display = nameMatch && catMatch ? '' : 'none';
  });
};

window.openProductModal = function(productId) {
  const product = productId ? window._adminProducts.find(p => p.id === productId) : null;
  const isEdit = !!product;
  const wrap = document.getElementById('product-modal-wrap');
  const cats = ['Soft Toys','Building Blocks','Vehicles','Educational','Puzzles','Outdoor','Baby Toys'];
  wrap.innerHTML = `
    <div class="admin-modal-overlay" onclick="closeProductModal(event, this)">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <div class="admin-modal-title">${isEdit ? '✏️ Edit Product' : '➕ Add New Product'}</div>
          <button class="admin-modal-close" onclick="this.closest('.admin-modal-overlay').remove()">✕</button>
        </div>
        <div class="admin-modal-body">
          <div class="form-grid">
            <div class="form-group"><label class="form-label">Product Name <span class="form-required">*</span></label><input class="form-input" id="pm-name" value="${product?.name||''}" placeholder="e.g. Cute Teddy Bear"></div>
            <div class="form-group"><label class="form-label">Category <span class="form-required">*</span></label>
              <select class="form-select" id="pm-cat">${cats.map(c=>`<option value="${c}" ${product?.category===c?'selected':''}>${c}</option>`).join('')}</select>
            </div>
            <div class="form-group"><label class="form-label">Sale Price (PKR) <span class="form-required">*</span></label><input class="form-input" id="pm-price" type="number" value="${product?.price||''}" placeholder="1499"></div>
            <div class="form-group"><label class="form-label">Original Price (PKR)</label><input class="form-input" id="pm-old-price" type="number" value="${product?.old_price||''}" placeholder="Leave empty if no discount"></div>
            <div class="form-group"><label class="form-label">Stock Quantity <span class="form-required">*</span></label><input class="form-input" id="pm-stock" type="number" value="${product?.stock||0}" placeholder="50"></div>
            <div class="form-group"><label class="form-label">Rating (1-5)</label><input class="form-input" id="pm-rating" type="number" step="0.1" min="1" max="5" value="${product?.rating||4.5}"></div>
          </div>
          <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="pm-desc" placeholder="Short product description...">${product?.description||''}</textarea></div>
          <div class="form-group"><label class="form-label">Image URL</label><input class="form-input" id="pm-img" value="${product?.image_url||''}" placeholder="https://..."></div>
          ${product?.image_url ? `<img src="${product.image_url}" class="img-preview" style="margin-bottom:12px" onerror="this.style.display='none'">` : ''}
          <div style="display:flex;gap:20px;margin-bottom:8px">
            <label class="form-toggle"><input type="checkbox" id="pm-new" ${product?.is_new?'checked':''}><span class="toggle-slider"></span><span style="margin-left:10px;font-size:0.88rem;font-weight:600">Mark as New Arrival</span></label>
            <label class="form-toggle"><input type="checkbox" id="pm-deal" ${product?.is_deal?'checked':''}><span class="toggle-slider"></span><span style="margin-left:10px;font-size:0.88rem;font-weight:600">Mark as Special Deal</span></label>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button class="btn btn-outline btn-sm" onclick="this.closest('.admin-modal-overlay').remove()">Cancel</button>
          <button class="btn btn-primary btn-sm" id="save-product-btn" onclick="saveProduct('${productId||''}')">
            ${isEdit ? '💾 Save Changes' : '➕ Add Product'}
          </button>
        </div>
      </div>
    </div>`;
};

window.closeProductModal = function(e, overlay) { if (e.target === overlay) overlay.remove(); };

window.saveProduct = async function(productId) {
  const btn = document.getElementById('save-product-btn');
  const errMsg = (msg) => { showAdminToast(msg,'error'); btn.disabled=false; btn.textContent = productId ? '💾 Save Changes':'➕ Add Product'; };
  const name = document.getElementById('pm-name')?.value.trim();
  const cat = document.getElementById('pm-cat')?.value;
  const price = parseFloat(document.getElementById('pm-price')?.value);
  const oldPrice = parseFloat(document.getElementById('pm-old-price')?.value) || null;
  const stock = parseInt(document.getElementById('pm-stock')?.value) || 0;
  const rating = parseFloat(document.getElementById('pm-rating')?.value) || 4.5;
  const desc = document.getElementById('pm-desc')?.value.trim();
  const imgUrl = document.getElementById('pm-img')?.value.trim();
  const isNew = document.getElementById('pm-new')?.checked;
  const isDeal = document.getElementById('pm-deal')?.checked;
  if (!name || !cat || isNaN(price)) { errMsg('Please fill in required fields (Name, Category, Price).'); return; }
  btn.textContent = 'Saving...'; btn.disabled = true;
  const data = { name, category:cat, price, old_price:oldPrice, stock, rating, description:desc, image_url:imgUrl, is_new:isNew, is_deal:isDeal };
  try {
    if (productId) { await supa.from('products').update(data).eq('id', productId); }
    else { await supa.from('products').insert(data); }
    showAdminToast(`Product ${productId?'updated':'added'} successfully! ✅`,'success');
    document.querySelector('.admin-modal-overlay')?.remove();
    await renderProducts(document.getElementById('admin-content'));
  } catch(e) { errMsg(e.message || 'Save failed.'); }
};

window.deleteProduct = async function(id, name) {
  if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
  try {
    await supa.from('products').delete().eq('id', id);
    showAdminToast('Product deleted.','success');
    await renderProducts(document.getElementById('admin-content'));
  } catch(e) { showAdminToast('Delete failed: '+e.message,'error'); }
};

// ============================================
// ORDERS
// ============================================
async function renderOrders(el) {
  const { data: orders } = await supa.from('orders').select(`*, order_items(*)`).order('created_at', { ascending: false });
  el.innerHTML = `
    <div class="admin-card">
      <div class="admin-card-header">
        <div class="admin-card-title"><span class="icon">🛒</span> Orders (${(orders||[]).length})</div>
      </div>
      <div class="admin-card-body">
        <div class="admin-toolbar">
          <input class="search-input-admin" placeholder="🔍 Search by order # or customer..." oninput="filterOrderRows(this.value)">
          <select class="filter-select-admin" id="order-status-filter" onchange="filterOrderRows(document.querySelector('#admin-content .search-input-admin').value)">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>Order #</th><th>Customer</th><th>Phone</th><th>City</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody id="orders-tbody">
              ${(orders||[]).map(o => `
                <tr data-order-id="${o.id}" data-status="${o.status}" data-search="${o.order_number.toLowerCase()} ${o.customer_name.toLowerCase()}">
                  <td><strong>${o.order_number}</strong></td>
                  <td>${o.customer_name}</td>
                  <td><a href="tel:${o.phone}">${o.phone}</a></td>
                  <td>${o.city}</td>
                  <td>${(o.order_items||[]).length} items</td>
                  <td><strong>PKR ${Number(o.total).toLocaleString()}</strong></td>
                  <td>
                    <select class="filter-select-admin" style="padding:4px 8px;font-size:0.78rem;border-radius:6px" onchange="updateOrderStatus('${o.id}',this.value)">
                      ${['pending','confirmed','delivered'].map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
                    </select>
                  </td>
                  <td>${new Date(o.created_at).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})}</td>
                  <td><button class="action-btn action-btn-info action-btn-sm" onclick="viewOrderDetails('${o.id}')">👁️ View</button></td>
                </tr>`).join('') || '<tr><td colspan="9" style="text-align:center;color:var(--text-light);padding:40px">No orders yet</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="order-detail-modal-wrap"></div>`;
  window._adminOrders = orders || [];
}

window.filterOrderRows = function(query) {
  const status = document.getElementById('order-status-filter')?.value || '';
  const q = (query||'').toLowerCase();
  document.querySelectorAll('#orders-tbody tr').forEach(row => {
    const search = row.dataset.search || '';
    const rowStatus = row.dataset.status || '';
    row.style.display = ((!q || search.includes(q)) && (!status || rowStatus === status)) ? '' : 'none';
  });
};

window.updateOrderStatus = async function(orderId, status) {
  try {
    await supa.from('orders').update({ status }).eq('id', orderId);
    showAdminToast(`Order status updated to "${status}"`, 'success');
  } catch(e) { showAdminToast('Update failed.', 'error'); }
};

window.viewOrderDetails = function(orderId) {
  const order = window._adminOrders?.find(o => o.id === orderId);
  if (!order) return;
  const wrap = document.getElementById('order-detail-modal-wrap');
  wrap.innerHTML = `
    <div class="admin-modal-overlay" onclick="if(event.target===this)this.remove()">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <div class="admin-modal-title">🛒 Order ${order.order_number}</div>
          <button class="admin-modal-close" onclick="this.closest('.admin-modal-overlay').remove()">✕</button>
        </div>
        <div class="admin-modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
            <div><strong>Customer:</strong> ${order.customer_name}</div>
            <div><strong>Phone:</strong> ${order.phone}</div>
            <div><strong>City:</strong> ${order.city}</div>
            <div><strong>Status:</strong> <span class="badge ${statusBadgeClass(order.status)}">${order.status}</span></div>
            <div style="grid-column:1/-1"><strong>Address:</strong> ${order.address}</div>
            <div><strong>Date:</strong> ${new Date(order.created_at).toLocaleString('en-PK')}</div>
          </div>
          <table class="admin-table" style="min-width:auto">
            <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
            <tbody>
              ${(order.order_items||[]).map(i=>`
                <tr>
                  <td>${i.product_name}</td>
                  <td>${i.quantity}</td>
                  <td>PKR ${Number(i.price).toLocaleString()}</td>
                  <td><strong>PKR ${Number(i.price*i.quantity).toLocaleString()}</strong></td>
                </tr>`).join('')}
            </tbody>
          </table>
          <div style="text-align:right;margin-top:16px;font-size:1.1rem">
            <strong>Total: PKR ${Number(order.total).toLocaleString()}</strong>
          </div>
        </div>
        <div class="admin-modal-footer">
          <a href="https://wa.me/${order.phone?.replace(/^0/,'92')}" target="_blank" class="btn btn-success btn-sm">💬 WhatsApp Customer</a>
          <button class="btn btn-outline btn-sm" onclick="this.closest('.admin-modal-overlay').remove()">Close</button>
        </div>
      </div>
    </div>`;
};

// ============================================
// CUSTOMERS
// ============================================
async function renderCustomers(el) {
  const { data: customers } = await supa.from('profiles').select('*').eq('is_admin', false).order('created_at', { ascending: false });
  el.innerHTML = `
    <div class="admin-card">
      <div class="admin-card-header">
        <div class="admin-card-title"><span class="icon">👥</span> Customers (${(customers||[]).length})</div>
      </div>
      <div class="admin-card-body">
        <div class="admin-toolbar">
          <input class="search-input-admin" placeholder="🔍 Search customers..." oninput="filterCustomerRows(this.value)">
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr><th>Customer #</th><th>Name</th><th>Phone</th><th>City</th><th>Joined</th></tr></thead>
            <tbody id="customers-tbody">
              ${(customers||[]).map(c => `
                <tr data-search="${(c.customer_number||'').toLowerCase()} ${(c.full_name||'').toLowerCase()}">
                  <td><strong>${c.customer_number || '—'}</strong></td>
                  <td>${c.full_name || '—'}</td>
                  <td>${c.phone || '—'}</td>
                  <td>${c.city || '—'}</td>
                  <td>${new Date(c.created_at).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})}</td>
                </tr>`).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-light);padding:40px">No registered customers yet</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

window.filterCustomerRows = function(query) {
  const q = (query||'').toLowerCase();
  document.querySelectorAll('#customers-tbody tr').forEach(row => {
    row.style.display = (!q || (row.dataset.search||'').includes(q)) ? '' : 'none';
  });
};

// ============================================
// SETTINGS
// ============================================
async function renderSettings(el) {
  const { data: settings } = await supa.from('site_settings').select('*').order('group_name');
  const grouped = {};
  (settings||[]).forEach(s => { if(!grouped[s.group_name]) grouped[s.group_name]={}; grouped[s.group_name][s.key]=s; });

  const groupLabels = { contact:'📞 Contact & WhatsApp', social:'📱 Social Media Links', shipping:'🚚 Shipping & Delivery', general:'⚙️ General Settings' };

  el.innerHTML = `
    <div class="admin-card">
      <div class="admin-card-header">
        <div class="admin-card-title"><span class="icon">⚙️</span> Site Settings</div>
        <button class="btn btn-primary btn-sm" onclick="saveAllSettings()">💾 Save All Settings</button>
      </div>
      <div class="admin-card-body">
        <div class="settings-grid">
          ${Object.entries(grouped).map(([group, keys]) => `
            <div class="settings-group">
              <div class="settings-group-title">${groupLabels[group] || group}</div>
              ${Object.values(keys).map(s => `
                <div class="form-group">
                  <label class="form-label">${s.label}</label>
                  <input class="form-input" data-setting-key="${s.key}" value="${s.value||''}" placeholder="${s.label}">
                </div>`).join('')}
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

window.saveAllSettings = async function() {
  const inputs = document.querySelectorAll('[data-setting-key]');
  const updates = [];
  inputs.forEach(input => {
    updates.push(supa.from('site_settings').update({ value: input.value, updated_at: new Date().toISOString() }).eq('key', input.dataset.settingKey));
  });
  try {
    await Promise.all(updates);
    showAdminToast('All settings saved! ✅', 'success');
  } catch(e) { showAdminToast('Save failed: '+e.message, 'error'); }
};

// ============================================
// TOAST
// ============================================
function showAdminToast(msg, type = 'info') {
  const container = document.getElementById('admin-toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  toast.innerHTML = `<span>${icons[type]||''}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation='toast-in 0.3s ease reverse'; setTimeout(()=>toast.remove(),350); }, 3500);
}

// Enter key on login
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.getElementById('admin-login-screen')?.style.display !== 'none') adminLogin();
});
