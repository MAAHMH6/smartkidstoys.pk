<?php
/**
 * Template Name: Homepage
 * The template for displaying the front page.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.4.0
 */

get_header();

$toys = smartkidstoys_get_catalog_toys();
$popular_toys = array_slice( $toys, 0, 5 );
$bestseller_toys = array_slice( $toys, 0, 5 );

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

<div class="container woocommerce-page" style="padding-bottom: 40px;">
    
    <!-- 1. Hero Section -->
    <section class="demo-hero-section" style="position:relative; overflow:hidden; border-radius:20px; margin:16px 0 24px; background:linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%); border:1px solid #BAE6FD;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); align-items:center; padding:36px 40px; gap:24px;">
            <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                    <img src="<?php echo smartkidstoys_get_image_url( 'skt_logo', 'logo.png' ); ?>" alt="SmartKids Toys" style="height:36px; width:auto;" />
                </div>

                <h1 style="font-size:clamp(2rem, 4vw, 3rem); font-weight:900; line-height:1.15; margin:0 0 14px; color:#0F172A;">
                    <span style="color:#EF4444;">Play</span>, <span style="color:#0284C7;">Learn</span> &amp; <br />
                    <span style="color:#8B5CF6;">Grow</span> <span style="color:#10B981;">Together</span>
                </h1>

                <p style="font-size:1.05rem; color:#334155; margin:0 0 24px; font-weight:500; line-height:1.4;">
                    Safe, fun and educational toys <br />for every age...
                </p>

                <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="btn" style="background:linear-gradient(135deg, #0284C7, #0369A1); color:#FFFFFF; font-weight:800; font-size:1rem; padding:12px 28px; border-radius:9999px; box-shadow:0 4px 15px rgba(2,132,199,0.35); display:inline-flex; align-items:center; gap:8px; text-decoration:none;">
                    <span>Shop Now</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
            </div>

            <div style="display:flex; justify-content:center;">
                <img 
                    src="<?php echo smartkidstoys_get_image_url( 'skt_hero_banner', 'hero-banner.png' ); ?>" 
                    alt="Play, Learn &amp; Grow Together" 
                    style="width:100%; max-height:340px; object-fit:contain; border-radius:12px;"
                />
            </div>
        </div>
    </section>

    <!-- 2. Trust Bar (4 Items) -->
    <section class="demo-trust-bar" style="background:#FFFFFF; border-radius:16px; border:1px solid var(--gray-2); padding:16px 24px; margin-bottom:40px; box-shadow:0 2px 10px rgba(0,0,0,0.03);">
        <div class="demo-trust-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:42px; height:42px; border-radius:50%; background:#FEF3C7; color:#D97706; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                    <div style="font-weight:800; font-size:0.9rem; color:var(--dark-heading);">Free Shipping</div>
                    <div style="font-size:0.78rem; color:var(--text-muted);">On orders above PKR 3,000</div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:42px; height:42px; border-radius:50%; background:#E0F2FE; color:#0284C7; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                </div>
                <div>
                    <div style="font-weight:800; font-size:0.9rem; color:var(--dark-heading);">Easy Returns</div>
                    <div style="font-size:0.78rem; color:var(--text-muted);">14 days return policy</div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:42px; height:42px; border-radius:50%; background:#DCFCE7; color:#16A34A; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                    <div style="font-weight:800; font-size:0.9rem; color:var(--dark-heading);">Secure Payment</div>
                    <div style="font-size:0.78rem; color:var(--text-muted);">100% secure checkout</div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:42px; height:42px; border-radius:50%; background:#FEF9C3; color:#CA8A04; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                </div>
                <div>
                    <div style="font-weight:800; font-size:0.9rem; color:var(--dark-heading);">Top Quality Toys</div>
                    <div style="font-size:0.78rem; color:var(--text-muted);">Safe &amp; child-friendly</div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. Shop by Category (8 Circular Icons) -->
    <section style="margin-bottom: 44px;">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                <div class="section-dots" style="display:inline-flex; gap:3px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#EF4444;"></span>
                    <span style="width:6px; height:6px; border-radius:50%; background:#F59E0B;"></span>
                    <span style="width:6px; height:6px; border-radius:50%; background:#0284C7;"></span>
                </div>
                <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">Shop by Category</h2>
            </div>
            <a href="<?php echo esc_url( home_url( '/categories' ) ); ?>" class="view-all-btn" style="color:#0284C7; font-weight:800; font-size:0.88rem; display:flex; align-items:center; gap:4px; text-decoration:none;">
                <span>View All Categories</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:14px;">
            <a href="<?php echo esc_url( home_url( '/shop?cat=Action+Figures' ) ); ?>" class="circular-cat-card" style="display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none;">
                <div class="circular-cat-circle" style="width:74px; height:74px; border-radius:50%; background:#F3E8FF; display:flex; align-items:center; justify-content:center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
                </div>
                <span class="circular-cat-name" style="font-size:0.8rem; font-weight:700; color:var(--dark-heading);">Action Figures</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Building+Blocks' ) ); ?>" class="circular-cat-card" style="display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none;">
                <div class="circular-cat-circle" style="width:74px; height:74px; border-radius:50%; background:#FFEDD5; display:flex; align-items:center; justify-content:center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>
                </div>
                <span class="circular-cat-name" style="font-size:0.8rem; font-weight:700; color:var(--dark-heading);">Building Blocks</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Soft+Toys' ) ); ?>" class="circular-cat-card" style="display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none;">
                <div class="circular-cat-circle" style="width:74px; height:74px; border-radius:50%; background:#FCE7F3; display:flex; align-items:center; justify-content:center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><circle cx="8" cy="6" r="3"/><circle cx="16" cy="6" r="3"/><circle cx="9.5" cy="12" r="1" fill="#DB2777"/><circle cx="14.5" cy="12" r="1" fill="#DB2777"/><path d="M12 14v1"/><path d="M10 16s1 1 2 1 2-1 2-1"/></svg>
                </div>
                <span class="circular-cat-name" style="font-size:0.8rem; font-weight:700; color:var(--dark-heading);">Soft Toys</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Vehicles' ) ); ?>" class="circular-cat-card" style="display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none;">
                <div class="circular-cat-circle" style="width:74px; height:74px; border-radius:50%; background:#DCFCE7; display:flex; align-items:center; justify-content:center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="22" height="11" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><line x1="5" y1="9" x2="19" y2="9"/></svg>
                </div>
                <span class="circular-cat-name" style="font-size:0.8rem; font-weight:700; color:var(--dark-heading);">Cars &amp; Vehicles</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Puzzles' ) ); ?>" class="circular-cat-card" style="display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none;">
                <div class="circular-cat-circle" style="width:74px; height:74px; border-radius:50%; background:#EDE9FE; display:flex; align-items:center; justify-content:center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
                </div>
                <span class="circular-cat-name" style="font-size:0.8rem; font-weight:700; color:var(--dark-heading);">Puzzles</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" class="circular-cat-card" style="display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none;">
                <div class="circular-cat-circle" style="width:74px; height:74px; border-radius:50%; background:#DBEAFE; display:flex; align-items:center; justify-content:center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <span class="circular-cat-name" style="font-size:0.8rem; font-weight:700; color:var(--dark-heading);">Learning Toys</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Outdoor+Toys' ) ); ?>" class="circular-cat-card" style="display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none;">
                <div class="circular-cat-circle" style="width:74px; height:74px; border-radius:50%; background:#FEF9C3; display:flex; align-items:center; justify-content:center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
                <span class="circular-cat-name" style="font-size:0.8rem; font-weight:700; color:var(--dark-heading);">Outdoor Toys</span>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="circular-cat-card" style="display:flex; flex-direction:column; align-items:center; gap:8px; text-decoration:none;">
                <div class="circular-cat-circle" style="width:74px; height:74px; border-radius:50%; background:#F1F5F9; display:flex; align-items:center; justify-content:center;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </div>
                <span class="circular-cat-name" style="font-size:0.8rem; font-weight:700; color:var(--dark-heading);">All Toys</span>
            </a>
        </div>
    </section>

    <!-- 4. Popular Toys (5 Column Grid) -->
    <section style="margin-bottom: 44px;">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                <div class="section-dots" style="display:inline-flex; gap:3px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:#EF4444;"></span>
                    <span style="width:6px; height:6px; border-radius:50%; background:#F59E0B;"></span>
                    <span style="width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
                </div>
                <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">Popular Toys</h2>
            </div>
            <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="view-all-btn" style="color:#0284C7; font-weight:800; font-size:0.88rem; display:flex; align-items:center; gap:4px; text-decoration:none;">
                <span>View All Products</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:16px;">
            <?php foreach ( $popular_toys as $index => $toy ) : 
                $btn_bg = $button_colors[ $index % count( $button_colors ) ];
                $discount_pct = ( ! empty( $toy['old_price'] ) && $toy['old_price'] > $toy['price'] ) 
                    ? round( ( ( $toy['old_price'] - $toy['price'] ) / $toy['old_price'] ) * 100 ) 
                    : 0;
            ?>
                <article class="demo-product-card product type-product">
                    <!-- Top Badges -->
                    <div style="position:absolute; top:10px; left:10px; display:flex; flex-direction:column; gap:4px; z-index:3;">
                        <span style="background:#EF4444; color:#FFFFFF; font-size:0.7rem; font-weight:800; padding:3px 8px; border-radius:9999px; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                            Sale
                        </span>
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
                            <?php echo esc_html( $toy['rating'] ); ?> (<?php echo intval( $toy['reviews'] ); ?>)
                        </span>
                    </div>

                    <!-- Price -->
                    <div class="demo-price-row">
                        <span class="demo-current-price">PKR <?php echo number_format( $toy['price'] ); ?></span>
                        <?php if ( ! empty( $toy['old_price'] ) && $toy['old_price'] > $toy['price'] ) : ?>
                            <span class="demo-old-price">PKR <?php echo number_format( $toy['old_price'] ); ?></span>
                        <?php endif; ?>
                    </div>

                    <!-- Actions -->
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
                            Add to Cart
                        </button>
                    </div>

                    <a
                        href="https://wa.me/923098444501?text=<?php echo urlencode( "Hello SmartKids Toys! I want to order: *{$toy['name']}* (Price: PKR " . number_format( $toy['price'] ) . "). Please confirm my order." ); ?>"
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

    <!-- 5. FLASH SALE UP TO 40% OFF BANNER -->
    <section style="margin:36px 0 48px; border-radius:20px; background:linear-gradient(135deg, #FEF3C7 0%, #FCE7F3 100%); border:1px solid #FDE68A; padding:28px 36px; position:relative; overflow:hidden;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); align-items:center; gap:24px;">
            <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    <h2 style="font-size:clamp(1.5rem, 3vw, 2.2rem); font-weight:900; color:#DB2777; margin:0; text-transform:uppercase; letter-spacing:-0.5px;">
                        FLASH SALE <span style="color:#0284C7;">UP TO 40% OFF</span>
                    </h2>
                </div>

                <p style="color:#64748B; font-size:0.95rem; font-weight:600; margin:0 0 18px;">
                    Limited-time deals on kids' favourite toys
                </p>

                <!-- Countdown Box -->
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:20px; flex-wrap:wrap;">
                    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:8px 14px; text-align:center; min-width:60px; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                        <div style="font-size:1.25rem; font-weight:900; color:#0F172A;">02</div>
                        <div style="font-size:0.68rem; color:#64748B; font-weight:700; text-transform:uppercase;">Days</div>
                    </div>
                    <span style="font-weight:900; color:#DB2777; font-size:1.2rem;">:</span>

                    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:8px 14px; text-align:center; min-width:60px; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                        <div style="font-size:1.25rem; font-weight:900; color:#0F172A;">14</div>
                        <div style="font-size:0.68rem; color:#64748B; font-weight:700; text-transform:uppercase;">Hours</div>
                    </div>
                    <span style="font-weight:900; color:#DB2777; font-size:1.2rem;">:</span>

                    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:8px 14px; text-align:center; min-width:60px; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                        <div style="font-size:1.25rem; font-weight:900; color:#0F172A;">36</div>
                        <div style="font-size:0.68rem; color:#64748B; font-weight:700; text-transform:uppercase;">Minutes</div>
                    </div>
                    <span style="font-weight:900; color:#DB2777; font-size:1.2rem;">:</span>

                    <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:10px; padding:8px 14px; text-align:center; min-width:60px; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                        <div style="font-size:1.25rem; font-weight:900; color:#DB2777;">22</div>
                        <div style="font-size:0.68rem; color:#64748B; font-weight:700; text-transform:uppercase;">Seconds</div>
                    </div>
                </div>

                <a href="<?php echo esc_url( home_url( '/deals' ) ); ?>" style="background:linear-gradient(135deg, #EC4899, #DB2777); color:#FFFFFF; font-weight:800; font-size:0.92rem; padding:10px 24px; border-radius:9999px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 4px 14px rgba(236,72,153,0.35); text-decoration:none;">
                    <span>Shop Flash Sale</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
            </div>

            <div style="display:flex; align-items:center; justify-content:center;">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=450" alt="Flash Sale Toys" style="max-height:180px; width:auto; border-radius:16px; object-fit:contain;" />
            </div>
        </div>
    </section>

    <!-- 6. Best Sellers -->
    <section style="margin-bottom: 50px;">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
            <div>
                <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">Best Sellers</h2>
                </div>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:2px 0 0; font-weight:500;">
                    Loved by kids. Trusted by parents.
                </p>
            </div>
            <a href="<?php echo esc_url( home_url( '/shop?filter=bestseller' ) ); ?>" class="view-all-btn" style="color:#0284C7; font-weight:800; font-size:0.88rem; display:flex; align-items:center; gap:4px; text-decoration:none;">
                <span>View All Best Sellers</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:16px;">
            <?php foreach ( $bestseller_toys as $index => $toy ) : 
                $btn_bg = $button_colors[ $index % count( $button_colors ) ];
                $discount_pct = ( ! empty( $toy['old_price'] ) && $toy['old_price'] > $toy['price'] ) 
                    ? round( ( ( $toy['old_price'] - $toy['price'] ) / $toy['old_price'] ) * 100 ) 
                    : 25;
            ?>
                <article class="demo-product-card product type-product">
                    <!-- Top Badges -->
                    <div style="position:absolute; top:10px; left:10px; display:flex; flex-direction:column; gap:4px; z-index:3;">
                        <span style="background:#EF4444; color:#FFFFFF; font-size:0.7rem; font-weight:800; padding:3px 8px; border-radius:9999px; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                            Best Seller
                        </span>
                        <span style="background:#0F172A; color:#FBBF24; font-size:0.68rem; font-weight:900; padding:2px 7px; border-radius:9999px;">
                            -<?php echo $discount_pct; ?>% OFF
                        </span>
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
                            <?php echo esc_html( $toy['rating'] ); ?> (<?php echo intval( $toy['reviews'] ); ?>)
                        </span>
                    </div>

                    <!-- Price -->
                    <div class="demo-price-row">
                        <span class="demo-current-price">PKR <?php echo number_format( $toy['price'] ); ?></span>
                        <?php if ( ! empty( $toy['old_price'] ) && $toy['old_price'] > $toy['price'] ) : ?>
                            <span class="demo-old-price">PKR <?php echo number_format( $toy['old_price'] ); ?></span>
                        <?php endif; ?>
                    </div>

                    <!-- Actions -->
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
                            Add to Cart
                        </button>
                    </div>

                    <a
                        href="https://wa.me/923098444501?text=<?php echo urlencode( "Hello SmartKids Toys! I want to order: *{$toy['name']}* (Price: PKR " . number_format( $toy['price'] ) . "). Please confirm my order." ); ?>"
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

    <!-- 7. Shop Toys by Age -->
    <section style="margin-bottom: 50px;">
        <div class="section-header" style="margin-bottom:20px;">
            <div>
                <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                    <div class="section-dots" style="display:inline-flex; gap:3px;">
                        <span style="width:6px; height:6px; border-radius:50%; background:#8B5CF6;"></span>
                        <span style="width:6px; height:6px; border-radius:50%; background:#0284C7;"></span>
                        <span style="width:6px; height:6px; border-radius:50%; background:#EC4899;"></span>
                    </div>
                    <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">Shop Toys by Age</h2>
                </div>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:2px 0 0; font-weight:500;">
                    Find the perfect toy for every stage of childhood.
                </p>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:18px;">
            <a href="<?php echo esc_url( home_url( '/shop?age=0-2' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.45) 40%, rgba(15,23,42,0.9) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:9999px;">Baby &amp; Toddler</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0 0 4px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">0-2 Years</h3>
                    <p style="font-size:0.88rem; color:rgba(255,255,255,0.92); margin:0 0 14px; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5);">Safe &amp; sensory</p>
                    <span style="background:#FFFFFF; color:#0284C7; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px;">
                        Shop Now &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=3-5' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.45) 40%, rgba(15,23,42,0.9) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:9999px;">Preschoolers</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0 0 4px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">3-5 Years</h3>
                    <p style="font-size:0.88rem; color:rgba(255,255,255,0.92); margin:0 0 14px; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5);">Creative play</p>
                    <span style="background:#FFFFFF; color:#0284C7; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px;">
                        Shop Now &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=6-8' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.45) 40%, rgba(15,23,42,0.9) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:9999px;">Early Explorers</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0 0 4px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">6-8 Years</h3>
                    <p style="font-size:0.88rem; color:rgba(255,255,255,0.92); margin:0 0 14px; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5);">Learning &amp; fun</p>
                    <span style="background:#FFFFFF; color:#0284C7; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px;">
                        Shop Now &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=9-12' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.45) 40%, rgba(15,23,42,0.9) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:9999px;">Young Innovators</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0 0 4px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">9-12 Years</h3>
                    <p style="font-size:0.88rem; color:rgba(255,255,255,0.92); margin:0 0 14px; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5);">STEM &amp; adventure</p>
                    <span style="background:#FFFFFF; color:#0284C7; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px;">
                        Shop Now &rarr;
                    </span>
                </div>
            </a>
        </div>
    </section>

    <!-- 8. Learn While You Play -->
    <section style="margin-bottom: 50px;">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
            <div>
                <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z"/></svg>
                    <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">Learn While You Play</h2>
                </div>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:2px 0 0; font-weight:500;">
                    Discover toys that make learning fun.
                </p>
            </div>
            <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" class="view-all-btn" style="color:#0284C7; font-weight:800; font-size:0.88rem; display:flex; align-items:center; gap:4px; text-decoration:none;">
                <span>Explore Educational Toys</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:18px;">
            <a href="<?php echo esc_url( home_url( '/shop?cat=Puzzles' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.5) 40%, rgba(15,23,42,0.92) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center;">
                    <span style="width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
                    </span>
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:9999px;">Critical Thinking</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.25rem; font-weight:900; color:#FFFFFF; margin:0 0 12px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">Puzzles &amp; Brain Games</h3>
                    <span style="color:#FFFFFF; font-weight:800; font-size:0.85rem; display:inline-flex; align-items:center; gap:6px;">
                        Explore Collection &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=STEM' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.5) 40%, rgba(15,23,42,0.92) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center;">
                    <span style="width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>
                    </span>
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:9999px;">Science &amp; Logic</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.25rem; font-weight:900; color:#FFFFFF; margin:0 0 12px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">STEM &amp; Math Toys</h3>
                    <span style="color:#FFFFFF; font-weight:800; font-size:0.85rem; display:inline-flex; align-items:center; gap:6px;">
                        Explore Collection &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.5) 40%, rgba(15,23,42,0.92) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center;">
                    <span style="width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"/></svg>
                    </span>
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:9999px;">Creative Expression</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.25rem; font-weight:900; color:#FFFFFF; margin:0 0 12px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">Art &amp; Creativity</h3>
                    <span style="color:#FFFFFF; font-weight:800; font-size:0.85rem; display:inline-flex; align-items:center; gap:6px;">
                        Explore Collection &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.5) 40%, rgba(15,23,42,0.92) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center;">
                    <span style="width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
                    </span>
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:9999px;">Interactive Play</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.25rem; font-weight:900; color:#FFFFFF; margin:0 0 12px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">Educational Games</h3>
                    <span style="color:#FFFFFF; font-weight:800; font-size:0.85rem; display:inline-flex; align-items:center; gap:6px;">
                        Explore Collection &rarr;
                    </span>
                </div>
            </a>
        </div>
    </section>

    <!-- 9. Find the Perfect Gift -->
    <section style="margin-bottom: 50px;">
        <div class="section-header" style="margin-bottom:20px;">
            <div>
                <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                    <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">Find the Perfect Gift</h2>
                </div>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:2px 0 0; font-weight:500;">
                    Thoughtful toys for every occasion.
                </p>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
            <div style="position:relative; min-height:250px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:24px;">
                <div style="position:absolute; inset:0; background:linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 55%, rgba(15,23,42,0.88) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.4rem; font-weight:900; color:#FFFFFF; margin:0 0 6px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">Birthday Gifts</h3>
                    <p style="font-size:0.92rem; color:rgba(255,255,255,0.92); margin:0; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5);">Fun picks they'll remember</p>
                </div>
                <div style="position:relative; z-index:2; margin-top:24px;">
                    <a href="<?php echo esc_url( home_url( '/shop?filter=birthday' ) ); ?>" style="background:#84CC16; color:#FFFFFF; font-weight:800; font-size:0.9rem; padding:10px 24px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; width:fit-content; text-decoration:none; box-shadow:0 4px 14px rgba(0,0,0,0.35);">
                        <span>Shop Birthday Gifts &rarr;</span>
                    </a>
                </div>
            </div>

            <div style="position:relative; min-height:250px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:24px;">
                <div style="position:absolute; inset:0; background:linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 55%, rgba(15,23,42,0.88) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.4rem; font-weight:900; color:#FFFFFF; margin:0 0 6px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">Educational Gifts</h3>
                    <p style="font-size:0.92rem; color:rgba(255,255,255,0.92); margin:0; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5);">Play &amp; learning together</p>
                </div>
                <div style="position:relative; z-index:2; margin-top:24px;">
                    <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" style="background:#EC4899; color:#FFFFFF; font-weight:800; font-size:0.9rem; padding:10px 24px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; width:fit-content; text-decoration:none; box-shadow:0 4px 14px rgba(0,0,0,0.35);">
                        <span>Shop Educational &rarr;</span>
                    </a>
                </div>
            </div>

            <div style="position:relative; min-height:250px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:24px;">
                <div style="position:absolute; inset:0; background:linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 55%, rgba(15,23,42,0.88) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.4rem; font-weight:900; color:#FFFFFF; margin:0 0 6px; text-shadow:0 2px 4px rgba(0,0,0,0.6);">Gifts Under PKR 2,000</h3>
                    <p style="font-size:0.92rem; color:rgba(255,255,255,0.92); margin:0; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5);">Great toys, great prices</p>
                </div>
                <div style="position:relative; z-index:2; margin-top:24px;">
                    <a href="<?php echo esc_url( home_url( '/shop?max_price=2000' ) ); ?>" style="background:#F59E0B; color:#FFFFFF; font-weight:800; font-size:0.9rem; padding:10px 24px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; width:fit-content; text-decoration:none; box-shadow:0 4px 14px rgba(0,0,0,0.35);">
                        <span>Shop Under 2,000 &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 10. What Parents Are Saying -->
    <section style="margin-bottom: 50px;">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
            <div>
                <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                    <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">What Parents Are Saying</h2>
                </div>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:2px 0 0; font-weight:500;">
                    Discover toys that make learning fun.
                </p>
            </div>

            <div style="display:flex; align-items:center; gap:6px; background:#FEF3C7; padding:6px 14px; border-radius:9999px; color:#B45309; font-weight:800; font-size:0.85rem;">
                <span style="color:#F59E0B;">&#9733;</span>
                <span>4.9/5 from 500+ happy parents</span>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">
            <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--gray-2); padding:20px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div>
                    <div style="color:#F59E0B; margin-bottom:12px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p style="font-size:0.88rem; color:var(--text); font-style:italic; margin:0 0 16px; line-height:1.5;">
                        "The quality was much better than I expected. My son absolutely loved it!"
                    </p>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:#FEE2E2; display:flex; align-items:center; justify-content:center; font-weight:800; color:#EF4444;">A</div>
                        <div>
                            <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">Ayesha K.</div>
                            <div style="font-size:0.75rem; color:var(--text-muted);">Karachi</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--gray-2); padding:20px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div>
                    <div style="color:#F59E0B; margin-bottom:12px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p style="font-size:0.88rem; color:var(--text); font-style:italic; margin:0 0 16px; line-height:1.5;">
                        "Great variety and fast delivery. Will definitely shop again!"
                    </p>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:#EFF6FF; display:flex; align-items:center; justify-content:center; font-weight:800; color:#0284C7;">A</div>
                        <div>
                            <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">Ali R.</div>
                            <div style="font-size:0.75rem; color:var(--text-muted);">Lahore</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--gray-2); padding:20px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div>
                    <div style="color:#F59E0B; margin-bottom:12px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p style="font-size:0.88rem; color:var(--text); font-style:italic; margin:0 0 16px; line-height:1.5;">
                        "Perfect for my daughter. She hasn't stopped playing with it!"
                    </p>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:#FDF2F8; display:flex; align-items:center; justify-content:center; font-weight:800; color:#EC4899;">S</div>
                        <div>
                            <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">Sana M.</div>
                            <div style="font-size:0.75rem; color:var(--text-muted);">Islamabad</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background:#FFFFFF; border-radius:16px; border:1px solid var(--gray-2); padding:20px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div>
                    <div style="color:#F59E0B; margin-bottom:12px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p style="font-size:0.88rem; color:var(--text); font-style:italic; margin:0 0 16px; line-height:1.5;">
                        "Excellent customer service and top quality toys!"
                    </p>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:#DCFCE7; display:flex; align-items:center; justify-content:center; font-weight:800; color:#16A34A;">I</div>
                        <div>
                            <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">Imran T.</div>
                            <div style="font-size:0.75rem; color:var(--text-muted);">Faisalabad</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 11. Follow the Fun Instagram -->
    <section style="margin-bottom: 50px;">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
            <div>
                <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">Follow the Fun</h2>
                </div>
                <p style="font-size:0.85rem; color:#0284C7; margin:2px 0 0; font-weight:700;">
                    @SmartKidsToys
                </p>
            </div>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style="background:#0284C7; color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; text-decoration:none;">
                <span>Follow Us on Instagram &rarr;</span>
            </a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:12px;">
            <div style="border-radius:12px; overflow:hidden; aspect-ratio:1; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400" alt="Playtime" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="border-radius:12px; overflow:hidden; aspect-ratio:1; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" alt="Cuddly toys" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="border-radius:12px; overflow:hidden; aspect-ratio:1; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400" alt="Stacker" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="border-radius:12px; overflow:hidden; aspect-ratio:1; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                <img src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400" alt="Vehicles" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="border-radius:12px; overflow:hidden; aspect-ratio:1; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400" alt="Gifts" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="border-radius:12px; overflow:hidden; aspect-ratio:1; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400" alt="Happy Kids" style="width:100%; height:100%; object-fit:cover;" />
            </div>
        </div>
    </section>

    <!-- 12. Shopping Made Easy -->
    <section style="background:#FFFFFF; border-radius:18px; border:1px solid var(--gray-2); padding:20px 24px; margin-bottom:28px; box-shadow:0 2px 10px rgba(0,0,0,0.02);">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <h3 style="font-size:1.05rem; font-weight:900; color:var(--dark-heading); margin:0;">Shopping Made Easy</h3>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:16px;">
            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:38px; height:38px; border-radius:50%; background:#E0F2FE; color:#0284C7; display:flex; align-items:center; justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                    <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">Fast Delivery</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">Across Pakistan</div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:38px; height:38px; border-radius:50%; background:#DCFCE7; color:#16A34A; display:flex; align-items:center; justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                </div>
                <div>
                    <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">Cash on Delivery</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">Available nationwide</div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:38px; height:38px; border-radius:50%; background:#FEF3C7; color:#D97706; display:flex; align-items:center; justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                </div>
                <div>
                    <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">14-Day Returns</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">Shop with confidence</div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:38px; height:38px; border-radius:50%; background:#DCFCE7; color:#25D366; display:flex; align-items:center; justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <div>
                    <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">WhatsApp Support</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">We're here to help</div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:38px; height:38px; border-radius:50%; background:#F3E8FF; color:#7C3AED; display:flex; align-items:center; justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                    <div style="font-size:0.85rem; font-weight:800; color:var(--dark-heading);">Secure Checkout</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">Your payment is protected</div>
                </div>
            </div>
        </div>
    </section>

    <!-- 13. Need Help Choosing a Toy? -->
    <section style="border-radius:16px; background:#DCFCE7; border:1px solid #BBF7D0; padding:20px 28px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
        <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:46px; height:46px; border-radius:50%; background:#25D366; color:#FFFFFF; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <div>
                <h3 style="font-size:1.1rem; font-weight:900; color:#065F46; margin:0 0 2px;">
                    Need Help Choosing a Toy?
                </h3>
                <p style="font-size:0.85rem; color:#047857; margin:0;">
                    Talk to our team on WhatsApp. We'll help you find the right toy for your child.
                </p>
            </div>
        </div>

        <a href="https://wa.me/923098444501?text=Hello%20SmartKids%20Toys!%20I%20need%20help%20choosing%20the%20right%20toy%20for%20my%20child." target="_blank" rel="noopener noreferrer" style="background:#059669; color:#FFFFFF; font-weight:800; font-size:0.88rem; padding:10px 22px; border-radius:9999px; display:inline-flex; align-items:center; gap:8px; text-decoration:none; box-shadow:0 3px 10px rgba(5,150,105,0.3);">
            <span>Chat on WhatsApp &rarr;</span>
        </a>
    </section>

    <!-- 14. Newsletter -->
    <section style="border-radius:16px; background:#EFF6FF; border:1px solid #BFDBFE; padding:24px 28px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px;">
        <div style="display:flex; align-items:center; gap:14px; max-width:520px;">
            <div style="width:46px; height:46px; border-radius:50%; background:#0284C7; color:#FFFFFF; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
                <h3 style="font-size:1.1rem; font-weight:900; color:#1E3A8A; margin:0 0 2px;">
                    Get 10% Off Your First Order
                </h3>
                <p style="font-size:0.82rem; color:#1D4ED8; margin:0;">
                    Sign up for new arrivals, special deals, birthday gift ideas and exclusive discounts.
                </p>
            </div>
        </div>

        <form action="#" method="post" style="display:flex; gap:8px; flex:1; max-width:420px; min-width:260px;">
            <input type="email" placeholder="Enter your email address..." required style="flex:1; padding:10px 16px; border-radius:9999px; border:1px solid #93C5FD; background:#FFFFFF; font-size:0.85rem;" />
            <button type="submit" style="background:#0284C7; color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:10px 22px; border-radius:9999px; border:none; cursor:pointer;">
                Subscribe
            </button>
        </form>
    </section>

</div>

<?php
get_footer();
