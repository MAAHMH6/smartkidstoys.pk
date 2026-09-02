<?php
/**
 * Template Name: Homepage
 * The template for displaying the front page.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();

$toys = smartkidstoys_get_catalog_toys();
$popular_toys = array_slice( $toys, 0, 8 );

// Color rotation for Add to Cart buttons
$button_colors = array(
    'linear-gradient(135deg, #0284C7, #0369A1)', // Royal Blue
    'linear-gradient(135deg, #EF4444, #DC2626)', // Red
    'linear-gradient(135deg, #10B981, #059669)', // Green
    'linear-gradient(135deg, #8B5CF6, #7C3AED)', // Purple
    'linear-gradient(135deg, #F59E0B, #D97706)', // Amber
    'linear-gradient(135deg, #EC4899, #DB2777)'  // Pink
);
?>

<div class="container">
    
    <!-- 1. Hero Banner -->
    <section class="demo-hero-section">
        <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="demo-hero-banner-link">
            <img 
                src="<?php echo smartkidstoys_get_image_url( 'skt_hero_banner', 'hero-banner.png' ); ?>" 
                alt="SmartKids Toys Mega Sale Banner" 
                class="demo-hero-banner-img"
            />
        </a>
    </section>

    <!-- 2. Floating Trust Cards Bar (Inline SVGs) -->
    <div class="demo-trust-bar">
        <div class="demo-trust-grid">
            <div class="demo-trust-item">
                <div class="demo-trust-icon" style="background:#EFF6FF; color:#0284C7;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                    <div class="demo-trust-title">Nationwide Delivery</div>
                    <div class="demo-trust-desc">Free over PKR 3,000 across Pakistan</div>
                </div>
            </div>

            <div class="demo-trust-item">
                <div class="demo-trust-icon" style="background:#FEF3C7; color:#D97706;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                    <div class="demo-trust-title">100% Non-Toxic Safe</div>
                    <div class="demo-trust-desc">Certified child-safe materials</div>
                </div>
            </div>

            <div class="demo-trust-item">
                <div class="demo-trust-icon" style="background:#DCFCE7; color:#16A34A;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                </div>
                <div>
                    <div class="demo-trust-title">14-Day Easy Returns</div>
                    <div class="demo-trust-desc">Hassle-free replacement policy</div>
                </div>
            </div>

            <div class="demo-trust-item">
                <div class="demo-trust-icon" style="background:#F3E8FF; color:#7C3AED;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <div>
                    <div class="demo-trust-title">WhatsApp Support</div>
                    <div class="demo-trust-desc">Direct assistance at 03098444501</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 3. Circular Categories Section (Pure Inline SVGs) -->
    <section style="margin-bottom: 48px;">
        <div class="section-header">
            <div class="section-title-wrapper">
                <div class="section-dots">
                    <span class="section-dot" style="background:#EF4444;"></span>
                    <span class="section-dot" style="background:#0284C7;"></span>
                    <span class="section-dot" style="background:#F59E0B;"></span>
                </div>
                <h2 class="section-title-text">Shop by Category</h2>
            </div>
            <a href="<?php echo esc_url( home_url( '/categories' ) ); ?>" class="view-all-btn">
                All 9 Categories &rarr;
            </a>
        </div>

        <div class="circular-categories-grid">
            <!-- 1. Soft Toys -->
            <a href="<?php echo esc_url( home_url( '/shop?cat=Soft+Toys' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#FEE2E2;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><circle cx="8" cy="6" r="3"/><circle cx="16" cy="6" r="3"/><circle cx="9.5" cy="12" r="1" fill="#EF4444"/><circle cx="14.5" cy="12" r="1" fill="#EF4444"/><path d="M12 14v1"/><path d="M10 16s1 1 2 1 2-1 2-1"/></svg>
                </div>
                <div class="circular-cat-name">Soft Toys</div>
            </a>

            <!-- 2. Blocks -->
            <a href="<?php echo esc_url( home_url( '/shop?cat=Building+Blocks' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#EFF6FF;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <div class="circular-cat-name">Blocks</div>
            </a>

            <!-- 3. STEM / Edu -->
            <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#DCFCE7;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31a2 2 0 0 1-.37 1.17l-4.26 6.39A2 2 0 0 0 7.04 20h9.92a2 2 0 0 0 1.67-3.13l-4.26-6.39a2 2 0 0 1-.37-1.17V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="14" x2="17" y2="14"/></svg>
                </div>
                <div class="circular-cat-name">STEM / Edu</div>
            </a>

            <!-- 4. Vehicles -->
            <a href="<?php echo esc_url( home_url( '/shop?cat=Vehicles' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#FEF3C7;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="22" height="11" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><line x1="5" y1="9" x2="19" y2="9"/></svg>
                </div>
                <div class="circular-cat-name">Vehicles</div>
            </a>

            <!-- 5. Action Figures -->
            <a href="<?php echo esc_url( home_url( '/shop?cat=Action+Figures' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#F3E8FF;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/><path d="M18 10a6 6 0 0 1-12 0v-2"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>
                </div>
                <div class="circular-cat-name">Action Figures</div>
            </a>

            <!-- 6. Puzzles -->
            <a href="<?php echo esc_url( home_url( '/shop?cat=Puzzles' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#FCE7F3;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
                </div>
                <div class="circular-cat-name">Puzzles</div>
            </a>

            <!-- 7. Outdoor -->
            <a href="<?php echo esc_url( home_url( '/shop?cat=Outdoor+Toys' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#E0F2FE;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
                </div>
                <div class="circular-cat-name">Outdoor</div>
            </a>

            <!-- 8. Baby Toys -->
            <a href="<?php echo esc_url( home_url( '/shop?cat=Baby+Toys' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#FEF9C3;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EAB308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <div class="circular-cat-name">Baby Toys</div>
            </a>
        </div>
    </section>

    <!-- 4. Popular Toys Showcase Grid -->
    <section style="margin-bottom: 56px;">
        <div class="section-header">
            <div class="section-title-wrapper">
                <div class="section-dots">
                    <span class="section-dot" style="background:#10B981;"></span>
                    <span class="section-dot" style="background:#EF4444;"></span>
                    <span class="section-dot" style="background:#8B5CF6;"></span>
                </div>
                <h2 class="section-title-text">Popular &amp; Trending Toys</h2>
            </div>
            <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="view-all-btn">
                Explore All Products &rarr;
            </a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:22px;">
            <?php foreach ( $popular_toys as $index => $toy ) : 
                $btn_color = $button_colors[ $index % count( $button_colors ) ];
            ?>
                <div class="demo-product-card">
                    <?php if ( ! empty( $toy['badge'] ) ) : ?>
                        <span class="demo-sale-tag"><?php echo esc_html( $toy['badge'] ); ?></span>
                    <?php endif; ?>

                    <div class="demo-product-img-box">
                        <img src="<?php echo esc_url( $toy['image'] ); ?>" alt="<?php echo esc_attr( $toy['name'] ); ?>" class="demo-product-img" />
                    </div>

                    <h3 class="demo-product-title"><?php echo esc_html( $toy['name'] ); ?></h3>

                    <div class="demo-product-rating">
                        <span class="demo-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                        <span class="demo-rating-count">(<?php echo esc_html( $toy['reviews'] ); ?>)</span>
                    </div>

                    <div class="demo-price-row">
                        <span class="demo-current-price">PKR <?php echo number_format( $toy['price'] ); ?></span>
                        <?php if ( ! empty( $toy['old_price'] ) ) : ?>
                            <span class="demo-old-price">PKR <?php echo number_format( $toy['old_price'] ); ?></span>
                        <?php endif; ?>
                    </div>

                    <div class="demo-card-actions">
                        <button 
                            type="button" 
                            class="btn-add-cart-colorful skt-add-to-cart-trigger"
                            data-toy-id="<?php echo esc_attr( $toy['id'] ); ?>"
                            data-toy-name="<?php echo esc_attr( $toy['name'] ); ?>"
                            data-toy-price="<?php echo esc_attr( $toy['price'] ); ?>"
                            data-toy-image="<?php echo esc_attr( $toy['image'] ); ?>"
                            style="background:<?php echo esc_attr( $btn_color ); ?>;"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                            <span>Add to Bag</span>
                        </button>

                        <a 
                            href="https://wa.me/923098444501?text=<?php echo urlencode( 'Hello! I want to order: ' . $toy['name'] . ' (PKR ' . number_format( $toy['price'] ) . ')' ); ?>" 
                            target="_blank" 
                            rel="noreferrer"
                            class="btn-wishlist-outline"
                            title="Direct WhatsApp Order"
                            style="background:#25D366; color:white; border-color:#25D366;"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- 5. Full Image Background Promo Cards -->
    <section class="demo-banners-grid">
        
        <!-- Train Banner: New Arrivals -->
        <div class="demo-banner-card">
            <img 
                src="<?php echo smartkidstoys_get_image_url( 'skt_train_banner', 'train-banner.png' ); ?>" 
                alt="New Arrivals Train Banner" 
                class="demo-banner-full-bg"
            />
            <div class="demo-banner-card-content">
                <h3 class="demo-banner-title" style="color:#0F172A;">New Arrivals</h3>
                <p class="demo-banner-sub">Explore the freshest toys, electric trains, and learning kits.</p>
                <a href="<?php echo esc_url( home_url( '/new-arrivals' ) ); ?>" class="btn-banner-action" style="background:#0284C7; color:white;">
                    <span>Shop New</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>
        </div>

        <!-- Teddy Bear Banner: Special Deals -->
        <div class="demo-banner-card">
            <img 
                src="<?php echo smartkidstoys_get_image_url( 'skt_teddy_banner', 'teddy-banner.png' ); ?>" 
                alt="Special Deals Teddy Bear Banner" 
                class="demo-banner-full-bg"
            />
            <div class="demo-banner-card-content">
                <h3 class="demo-banner-title" style="color:#0F172A;">Special Deals</h3>
                <p class="demo-banner-sub">Save up to 40% on beloved soft plushies, dolls &amp; bundles.</p>
                <a href="<?php echo esc_url( home_url( '/deals' ) ); ?>" class="btn-banner-action" style="background:#EF4444; color:white;">
                    <span>View Deals</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>
        </div>

    </section>

    <!-- 6. Why Parents Love SmartKids Section (Pure SVGs) -->
    <section style="background:white; border:1px solid var(--gray-2); border-radius:var(--radius-xl); padding:36px; box-shadow:var(--shadow-card); margin-bottom:60px;">
        <div class="section-title-wrapper" style="margin-bottom:6px;">
            <div class="section-dots">
                <span class="section-dot" style="background:#EF4444;"></span>
                <span class="section-dot" style="background:#0284C7;"></span>
                <span class="section-dot" style="background:#10B981;"></span>
            </div>
            <h2 class="section-title-text">Why Parents Love SmartKids Toys</h2>
        </div>
        <p style="color:var(--text-muted); font-size:0.92rem;">
            Built with love for childhood imagination and parental peace of mind across Pakistan.
        </p>

        <div class="why-parents-grid">
            <div class="why-parent-item">
                <div class="why-parent-icon" style="background:#EFF6FF; color:#0284C7;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                    <div class="why-parent-title">Child-Safe Materials</div>
                    <div class="why-parent-desc">100% BPA-free, non-toxic &amp; smooth edge certified</div>
                </div>
            </div>

            <div class="why-parent-item">
                <div class="why-parent-icon" style="background:#FEF3C7; color:#D97706;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <div>
                    <div class="why-parent-title">Cognitive &amp; STEM Growth</div>
                    <div class="why-parent-desc">Carefully curated to enhance motor &amp; problem solving skills</div>
                </div>
            </div>

            <div class="why-parent-item">
                <div class="why-parent-icon" style="background:#DCFCE7; color:#16A34A;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                    <div class="why-parent-title">Express Pakistan Delivery</div>
                    <div class="why-parent-desc">Secure delivery to Lahore, Karachi, Islamabad &amp; nationwide</div>
                </div>
            </div>

            <div class="why-parent-item">
                <div class="why-parent-icon" style="background:#F3E8FF; color:#7C3AED;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <div>
                    <div class="why-parent-title">Instant WhatsApp Orders</div>
                    <div class="why-parent-desc">Order easily in seconds via 03098444501</div>
                </div>
            </div>
        </div>
    </section>

</div>

<?php
get_footer();
