<?php
/**
 * Template Name: Homepage
 * The template for displaying the front page.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.3.0
 */

get_header();

$toys = smartkidstoys_get_catalog_toys();
$bestseller_toys = array_slice( $toys, 0, 8 );
$bundles = smartkidstoys_get_bundles();

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
    
    <!-- 1. Hero Section with Headline, Subtitle, and Dual CTAs -->
    <section class="demo-hero-section" style="position:relative; overflow:hidden; border-radius:16px; margin-bottom:24px; background:linear-gradient(135deg, #0284C7 0%, #0369A1 100%);">
        <div style="padding:44px 24px 32px; color:#FFFFFF; text-align:center; max-width:820px; margin:0 auto;">
            
            <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.2); color:#FFFFFF; padding:5px 16px; border-radius:9999px; font-size:0.85rem; font-weight:800; margin-bottom:16px; backdrop-filter:blur(4px);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FDE047" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>Pakistan's Favorite Educational Toy Store</span>
            </div>

            <h1 style="font-size:clamp(2.1rem, 5vw, 3.4rem); font-weight:900; line-height:1.15; margin:0 0 14px; color:#FFFFFF; letter-spacing:-0.5px;">
                Play. Learn. Grow. Together.
            </h1>

            <p style="font-size:clamp(1rem, 2.5vw, 1.25rem); color:#E0F2FE; max-width:650px; margin:0 auto 28px; line-height:1.5; font-weight:500;">
                Fun, educational &amp; screen-free toys carefully selected for Pakistani kids.
            </p>

            <div style="display:flex; justify-content:center; gap:14px; flex-wrap:wrap;">
                <a href="<?php echo esc_url( home_url( '/shop?filter=bestseller' ) ); ?>" class="btn" style="background:#F59E0B; color:#0F172A; font-weight:900; font-size:1.05rem; padding:14px 28px; border-radius:9999px; box-shadow:0 8px 20px rgba(245,158,11,0.4); display:inline-flex; align-items:center; gap:8px; text-decoration:none;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0F172A" stroke="none"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg>
                    <span>Shop Best Sellers</span>
                </a>

                <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" class="btn" style="background:#FFFFFF; color:#0284C7; font-weight:800; font-size:1.05rem; padding:14px 28px; border-radius:9999px; box-shadow:0 4px 15px rgba(0,0,0,0.1); text-decoration:none; display:inline-flex; align-items:center;">
                    <span>Shop Educational Toys</span>
                </a>
            </div>
        </div>

        <!-- Banner image attachment -->
        <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="demo-hero-banner-link" style="display:block;">
            <img 
                src="<?php echo smartkidstoys_get_image_url( 'skt_hero_banner', 'hero-banner.png' ); ?>" 
                alt="Play, Learn &amp; Grow Together - SmartKids Toys Pakistan" 
                class="demo-hero-banner-img"
                style="border-radius:0 0 16px 16px;"
            />
        </a>
    </section>

    <!-- 2. Floating Trust Cards Bar (4 Updated Benefits) -->
    <div class="demo-trust-bar">
        <div class="demo-trust-grid">
            <div class="demo-trust-item">
                <div class="demo-trust-icon" style="background:#EFF6FF; color:#0284C7;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                    <div class="demo-trust-title">Fast Delivery Across Pakistan</div>
                    <div class="demo-trust-desc">Free delivery over PKR 3,000</div>
                </div>
            </div>

            <div class="demo-trust-item">
                <div class="demo-trust-icon" style="background:#DCFCE7; color:#16A34A;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                </div>
                <div>
                    <div class="demo-trust-title">Cash on Delivery</div>
                    <div class="demo-trust-desc">Safe payment at your doorstep</div>
                </div>
            </div>

            <div class="demo-trust-item">
                <div class="demo-trust-icon" style="background:#FEF3C7; color:#D97706;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                </div>
                <div>
                    <div class="demo-trust-title">Easy Returns</div>
                    <div class="demo-trust-desc">14-day hassle-free replacement</div>
                </div>
            </div>

            <div class="demo-trust-item">
                <div class="demo-trust-icon" style="background:#F3E8FF; color:#7C3AED;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                    <div class="demo-trust-title">Quality Checked Toys</div>
                    <div class="demo-trust-desc">100% child-safe &amp; non-toxic</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 3. Circular Categories Section -->
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
            <a href="<?php echo esc_url( home_url( '/shop?cat=Soft+Toys' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#FEE2E2;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><circle cx="8" cy="6" r="3"/><circle cx="16" cy="6" r="3"/><circle cx="9.5" cy="12" r="1" fill="#EF4444"/><circle cx="14.5" cy="12" r="1" fill="#EF4444"/><path d="M12 14v1"/><path d="M10 16s1 1 2 1 2-1 2-1"/></svg>
                </div>
                <div class="circular-cat-name">Soft Toys</div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Building+Blocks' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#EFF6FF;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <div class="circular-cat-name">Blocks</div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#DCFCE7;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31a2 2 0 0 1-.37 1.17l-4.26 6.39A2 2 0 0 0 7.04 20h9.92a2 2 0 0 0 1.67-3.13l-4.26-6.39a2 2 0 0 1-.37-1.17V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="14" x2="17" y2="14"/></svg>
                </div>
                <div class="circular-cat-name">STEM / Edu</div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Vehicles' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#FEF3C7;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="22" height="11" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><line x1="5" y1="9" x2="19" y2="9"/></svg>
                </div>
                <div class="circular-cat-name">Vehicles</div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Action+Figures' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#F3E8FF;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/><path d="M18 10a6 6 0 0 1-12 0v-2"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>
                </div>
                <div class="circular-cat-name">Action Figures</div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Puzzles' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#FCE7F3;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
                </div>
                <div class="circular-cat-name">Puzzles</div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Outdoor+Toys' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#FEF9C3;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
                <div class="circular-cat-name">Outdoor</div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="circular-cat-card">
                <div class="circular-cat-circle" style="background:#E0E7FF;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </div>
                <div class="circular-cat-name">All Toys</div>
            </a>
        </div>
    </section>

    <!-- 4. SmartKids Best Sellers Section -->
    <section style="margin-bottom: 52px;">
        <div class="section-header">
            <div class="section-title-wrapper">
                <div class="section-dots">
                    <span class="section-dot" style="background:#EF4444;"></span>
                    <span class="section-dot" style="background:#F59E0B;"></span>
                    <span class="section-dot" style="background:#10B981;"></span>
                </div>
                <h2 class="section-title-text" style="display:inline-flex; align-items:center; gap:8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#EF4444" stroke="none"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg>
                    SmartKids Best Sellers
                </h2>
            </div>
            <a href="<?php echo esc_url( home_url( '/shop?filter=bestseller' ) ); ?>" class="view-all-btn">
                All Best Sellers &rarr;
            </a>
        </div>

        <div class="demo-products-grid">
            <?php foreach ( $bestseller_toys as $index => $toy ) : 
                $btn_bg = $button_colors[ $index % count( $button_colors ) ];
                $discount_pct = ( ! empty( $toy['old_price'] ) && $toy['old_price'] > $toy['price'] ) 
                    ? round( ( ( $toy['old_price'] - $toy['price'] ) / $toy['old_price'] ) * 100 ) 
                    : 0;
            ?>
                <article class="demo-product-card product type-product">
                    
                    <!-- Top Badges -->
                    <div style="position:absolute; top:10px; left:10px; display:flex; flex-direction:column; gap:4px; z-index:3;">
                        <?php if ( ! empty( $toy['badge'] ) ) : ?>
                            <span style="background:#EF4444; color:#FFFFFF; font-size:0.7rem; font-weight:800; padding:3px 8px; border-radius:9999px; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                                <?php echo esc_html( $toy['badge'] ); ?>
                            </span>
                        <?php endif; ?>
                        <?php if ( $discount_pct > 0 ) : ?>
                            <span style="background:#0F172A; color:#FBBF24; font-size:0.68rem; font-weight:900; padding:2px 7px; border-radius:9999px;">
                                -<?php echo $discount_pct; ?>% OFF
                            </span>
                        <?php endif; ?>
                    </div>

                    <!-- Product Image -->
                    <a href="<?php echo esc_url( home_url( '/product-detail?id=' . $toy['id'] ) ); ?>" class="demo-product-img-box">
                        <img src="<?php echo esc_url( $toy['image'] ); ?>" alt="<?php echo esc_attr( $toy['name'] ); ?>" class="demo-product-img" loading="lazy" />
                    </a>

                    <!-- Category & Age Meta Header -->
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:4px;">
                        <span style="font-size:0.7rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">
                            <?php echo esc_html( $toy['category'] ); ?>
                        </span>
                        <span style="font-size:0.7rem; font-weight:800; background:#EFF6FF; color:#0284C7; padding:1px 6px; border-radius:6px;">
                            <?php echo esc_html( isset( $toy['age_range'] ) ? $toy['age_range'] : 'Age: 3-8 Yrs' ); ?>
                        </span>
                    </div>

                    <!-- Title -->
                    <h3 class="demo-product-title">
                        <a href="<?php echo esc_url( home_url( '/product-detail?id=' . $toy['id'] ) ); ?>" title="<?php echo esc_attr( $toy['name'] ); ?>">
                            <?php echo esc_html( $toy['name'] ); ?>
                        </a>
                    </h3>

                    <!-- Educational Skill Tag -->
                    <div style="font-size:0.72rem; color:#059669; background:#ECFDF5; padding:3px 8px; border-radius:6px; font-weight:700; width:100%; margin-bottom:8px; display:flex; align-items:center; gap:4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span><?php echo esc_html( isset( $toy['educational_skill'] ) ? $toy['educational_skill'] : 'STEM &amp; Motor Skills' ); ?></span>
                    </div>

                    <!-- Rating -->
                    <div class="demo-product-rating">
                        <div class="demo-stars" style="color:#F59E0B;">
                            &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                        <span class="demo-rating-count">
                            <?php echo esc_html( $toy['rating'] ); ?> (<?php echo intval( $toy['reviews'] ); ?> sold)
                        </span>
                    </div>

                    <!-- Price -->
                    <div class="demo-price-row">
                        <span class="demo-current-price">PKR <?php echo number_format( $toy['price'] ); ?></span>
                        <?php if ( ! empty( $toy['old_price'] ) && $toy['old_price'] > $toy['price'] ) : ?>
                            <span class="demo-old-price">PKR <?php echo number_format( $toy['old_price'] ); ?></span>
                        <?php endif; ?>
                    </div>

                    <!-- Add to Bag Button -->
                    <div class="demo-card-actions" style="margin-bottom:8px;">
                        <button 
                            type="button" 
                            class="btn-add-cart-colorful skt-add-to-cart-trigger" 
                            data-toy-id="<?php echo esc_attr( $toy['id'] ); ?>" 
                            data-toy-name="<?php echo esc_attr( $toy['name'] ); ?>" 
                            data-toy-price="<?php echo esc_attr( $toy['price'] ); ?>" 
                            data-toy-image="<?php echo esc_url( $toy['image'] ); ?>"
                            style="background:<?php echo esc_attr( $btn_bg ); ?>; flex:1;"
                            aria-label="Add <?php echo esc_attr( $toy['name'] ); ?> to bag"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                            Add to Bag
                        </button>
                    </div>

                    <!-- Prominent Order on WhatsApp Button -->
                    <a
                        href="https://wa.me/923098444501?text=<?php echo urlencode( "Hello SmartKids Toys! I want to order: *{$toy['name']}* (Price: PKR " . number_format( $toy['price'] ) . "). Please confirm my delivery details." ); ?>"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="width:100%; background:#25D366; color:#FFFFFF; border:none; border-radius:9999px; padding:8px 12px; font-size:0.82rem; font-weight:800; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px; box-shadow:0 2px 8px rgba(37,211,102,0.28);"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        <span>Order on WhatsApp</span>
                    </a>

                </article>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- 5. Shop by Age Section -->
    <section style="margin-bottom: 52px;">
        <div class="section-header">
            <div class="section-title-wrapper">
                <div class="section-dots">
                    <span class="section-dot" style="background:#8B5CF6;"></span>
                    <span class="section-dot" style="background:#0284C7;"></span>
                    <span class="section-dot" style="background:#EC4899;"></span>
                </div>
                <h2 class="section-title-text">Shop by Age</h2>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
            <a href="<?php echo esc_url( home_url( '/shop?age=1-3' ) ); ?>" style="background:#FFF1F2; border:2px solid #FECDD3; border-radius:16px; padding:22px 18px; text-align:center; text-decoration:none; display:block;">
                <div style="font-size:2.2rem; margin-bottom:6px;">&#128118;</div>
                <h3 style="font-size:1.2rem; font-weight:900; color:#E11D48; margin:0 0 4px;">1-3 Years</h3>
                <p style="font-size:0.85rem; color:var(--text); margin:0; font-weight:600;">Sensory &amp; Toddler Play</p>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=3-5' ) ); ?>" style="background:#EFF6FF; border:2px solid #BFDBFE; border-radius:16px; padding:22px 18px; text-align:center; text-decoration:none; display:block;">
                <div style="font-size:2.2rem; margin-bottom:6px;">&#129490;</div>
                <h3 style="font-size:1.2rem; font-weight:900; color:#1D4ED8; margin:0 0 4px;">3-5 Years</h3>
                <p style="font-size:0.85rem; color:var(--text); margin:0; font-weight:600;">Blocks &amp; Imagination</p>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=5-8' ) ); ?>" style="background:#F0FDF4; border:2px solid #BBF7D0; border-radius:16px; padding:22px 18px; text-align:center; text-decoration:none; display:block;">
                <div style="font-size:2.2rem; margin-bottom:6px;">&#129504;</div>
                <h3 style="font-size:1.2rem; font-weight:900; color:#15803D; margin:0 0 4px;">5-8 Years</h3>
                <p style="font-size:0.85rem; color:var(--text); margin:0; font-weight:600;">STEM &amp; Logic Games</p>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=8+' ) ); ?>" style="background:#FAF5FF; border:2px solid #E9D5FF; border-radius:16px; padding:22px 18px; text-align:center; text-decoration:none; display:block;">
                <div style="font-size:2.2rem; margin-bottom:6px;">&#128640;</div>
                <h3 style="font-size:1.2rem; font-weight:900; color:#7E22CE; margin:0 0 4px;">8+ Years</h3>
                <p style="font-size:0.85rem; color:var(--text); margin:0; font-weight:600;">Robotics &amp; Challenges</p>
            </a>
        </div>
    </section>

    <!-- 6. Toys by Budget Section -->
    <section style="margin-bottom: 52px;">
        <div class="section-header">
            <div class="section-title-wrapper">
                <div class="section-dots">
                    <span class="section-dot" style="background:#10B981;"></span>
                    <span class="section-dot" style="background:#0284C7;"></span>
                    <span class="section-dot" style="background:#F59E0B;"></span>
                </div>
                <h2 class="section-title-text">Toys by Budget</h2>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
            <a href="<?php echo esc_url( home_url( '/shop?max_price=1000' ) ); ?>" style="background:#ECFDF5; border-radius:14px; padding:20px 16px; text-align:center; text-decoration:none; border:1px solid rgba(0,0,0,0.06); display:block;">
                <span style="background:#047857; color:#FFFFFF; font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:9999px; display:inline-block; margin-bottom:8px;">Super Value</span>
                <h3 style="font-size:1.15rem; font-weight:900; color:#047857; margin:0 0 6px;">Under Rs 1,000</h3>
                <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">Explore Toys &rarr;</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?max_price=1500' ) ); ?>" style="background:#EFF6FF; border-radius:14px; padding:20px 16px; text-align:center; text-decoration:none; border:1px solid rgba(0,0,0,0.06); display:block;">
                <span style="background:#1D4ED8; color:#FFFFFF; font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:9999px; display:inline-block; margin-bottom:8px;">Most Popular</span>
                <h3 style="font-size:1.15rem; font-weight:900; color:#1D4ED8; margin:0 0 6px;">Under Rs 1,500</h3>
                <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">Explore Toys &rarr;</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?max_price=2000' ) ); ?>" style="background:#FEF3C7; border-radius:14px; padding:20px 16px; text-align:center; text-decoration:none; border:1px solid rgba(0,0,0,0.06); display:block;">
                <span style="background:#B45309; color:#FFFFFF; font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:9999px; display:inline-block; margin-bottom:8px;">Great Deals</span>
                <h3 style="font-size:1.15rem; font-weight:900; color:#B45309; margin:0 0 6px;">Under Rs 2,000</h3>
                <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">Explore Toys &rarr;</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?max_price=3000' ) ); ?>" style="background:#FDF2F8; border-radius:14px; padding:20px 16px; text-align:center; text-decoration:none; border:1px solid rgba(0,0,0,0.06); display:block;">
                <span style="background:#BE185D; color:#FFFFFF; font-size:0.7rem; font-weight:800; padding:2px 8px; border-radius:9999px; display:inline-block; margin-bottom:8px;">Premium Sets</span>
                <h3 style="font-size:1.15rem; font-weight:900; color:#BE185D; margin:0 0 6px;">Under Rs 3,000</h3>
                <span style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">Explore Toys &rarr;</span>
            </a>
        </div>
    </section>

    <!-- 7. SmartKids Bundles Section -->
    <section style="margin-bottom: 52px;">
        <div class="section-header">
            <div class="section-title-wrapper">
                <div class="section-dots">
                    <span class="section-dot" style="background:#EC4899;"></span>
                    <span class="section-dot" style="background:#8B5CF6;"></span>
                    <span class="section-dot" style="background:#0284C7;"></span>
                </div>
                <h2 class="section-title-text">SmartKids Bundles</h2>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px;">
            <?php foreach ( $bundles as $bundle ) : ?>
                <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--gray-2); padding:18px; box-shadow:0 4px 15px rgba(0,0,0,0.05); display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <div style="position:relative; border-radius:12px; overflow:hidden; margin-bottom:12px;">
                            <img src="<?php echo esc_url( $bundle['image'] ); ?>" alt="<?php echo esc_attr( $bundle['name'] ); ?>" style="width:100%; height:170px; object-fit:cover;" />
                            <span style="position:absolute; top:10px; left:10px; background:#10B981; color:#FFFFFF; font-weight:900; font-size:0.75rem; padding:3px 9px; border-radius:9999px; box-shadow:0 2px 6px rgba(0,0,0,0.2);">
                                <?php echo esc_html( $bundle['badge'] ); ?>
                            </span>
                        </div>

                        <span style="font-size:0.72rem; font-weight:800; color:#8B5CF6; text-transform:uppercase;">
                            <?php echo esc_html( $bundle['age_range'] ); ?> &bull; <?php echo intval( $bundle['items_count'] ); ?> Toys Set
                        </span>
                        <h3 style="font-size:1.05rem; font-weight:800; color:var(--dark-heading); margin:4px 0 6px;">
                            <?php echo esc_html( $bundle['name'] ); ?>
                        </h3>
                        <p style="font-size:0.82rem; color:var(--text-muted); margin:0 0 12px; line-height:1.4;">
                            <?php echo esc_html( $bundle['description'] ); ?>
                        </p>
                    </div>

                    <div>
                        <div style="display:flex; align-items:baseline; gap:8px; margin-bottom:12px;">
                            <span style="font-size:1.25rem; font-weight:900; color:#0284C7;">
                                PKR <?php echo number_format( $bundle['price'] ); ?>
                            </span>
                            <span style="font-size:0.9rem; color:var(--text-muted); text-decoration:line-through;">
                                PKR <?php echo number_format( $bundle['original_price'] ); ?>
                            </span>
                        </div>

                        <a
                            href="https://wa.me/923098444501?text=<?php echo urlencode( "Hello SmartKids Toys! I want to order the *{$bundle['name']}* (Price: PKR " . number_format( $bundle['price'] ) . ", {$bundle['badge']}). Please confirm my order!" ); ?>"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="width:100%; background:#25D366; color:#FFFFFF; border-radius:9999px; padding:10px 14px; font-weight:800; font-size:0.88rem; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px; box-shadow:0 4px 12px rgba(37,211,102,0.3);"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                            <span>Order Bundle via WhatsApp</span>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- 8. Why Parents Choose SmartKids Section -->
    <section style="margin-bottom: 52px; background:#F8FAFC; border-radius:20px; padding:36px 24px; border:1px solid var(--gray-2);">
        <div style="text-align:center; max-width:640px; margin:0 auto 32px;">
            <span style="color:#0284C7; font-weight:800; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.5px;">
                Trusted by Pakistani Families
            </span>
            <h2 style="font-size:1.8rem; font-weight:900; color:var(--dark-heading); margin:6px 0 10px;">
                Why Parents Choose SmartKids
            </h2>
            <p style="color:var(--text-muted); font-size:0.95rem; margin:0;">
                We believe childhood should be filled with discovery, joy, and meaningful screen-free moments.
            </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px;">
            <div style="background:#FFFFFF; border-radius:14px; padding:24px 20px; border:1px solid var(--gray-2); box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div style="width:52px; height:52px; border-radius:12px; background:#F3E8FF; display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z"/></svg>
                </div>
                <h3 style="font-size:1.1rem; font-weight:800; color:var(--dark-heading); margin:0 0 8px;">
                    Learning Through Play
                </h3>
                <p style="font-size:0.88rem; color:var(--text-muted); margin:0; line-height:1.5;">
                    Carefully curated to enhance cognitive growth, fine motor dexterity, and problem-solving skills.
                </p>
            </div>

            <div style="background:#FFFFFF; border-radius:14px; padding:24px 20px; border:1px solid var(--gray-2); box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div style="width:52px; height:52px; border-radius:12px; background:#E0F2FE; display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
                </div>
                <h3 style="font-size:1.1rem; font-weight:800; color:var(--dark-heading); margin:0 0 8px;">
                    Creative &amp; Screen-Free
                </h3>
                <p style="font-size:0.88rem; color:var(--text-muted); margin:0; line-height:1.5;">
                    Healthy hands-on entertainment that keeps kids engaged without mobile screens or tablets.
                </p>
            </div>

            <div style="background:#FFFFFF; border-radius:14px; padding:24px 20px; border:1px solid var(--gray-2); box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div style="width:52px; height:52px; border-radius:12px; background:#DCFCE7; display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                </div>
                <h3 style="font-size:1.1rem; font-weight:800; color:var(--dark-heading); margin:0 0 8px;">
                    Quality Checked
                </h3>
                <p style="font-size:0.88rem; color:var(--text-muted); margin:0; line-height:1.5;">
                    100% child-safe, non-toxic, and tested for durable everyday active play.
                </p>
            </div>

            <div style="background:#FFFFFF; border-radius:14px; padding:24px 20px; border:1px solid var(--gray-2); box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div style="width:52px; height:52px; border-radius:12px; background:#FEE2E2; display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <h3 style="font-size:1.1rem; font-weight:800; color:var(--dark-heading); margin:0 0 8px;">
                    Kids Love Them
                </h3>
                <p style="font-size:0.88rem; color:var(--text-muted); margin:0; line-height:1.5;">
                    Over 10,000+ smiling children and delighted parents across every city in Pakistan.
                </p>
            </div>
        </div>
    </section>

    <!-- 9. Special Deals Banner -->
    <section style="margin-bottom: 48px;">
        <a href="<?php echo esc_url( home_url( '/deals' ) ); ?>" class="demo-hero-banner-link">
            <img 
                src="<?php echo smartkidstoys_get_image_url( 'skt_teddy_banner', 'teddy-banner.png' ); ?>" 
                alt="Special Deals - SmartKids Toys" 
                class="demo-hero-banner-img"
            />
        </a>
    </section>

</div>

<?php
get_footer();
