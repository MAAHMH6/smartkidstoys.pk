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
    
    <!-- 1. Hero Banner -->
    <section class="demo-hero-section" style="margin:16px 0 24px; border-radius:20px; overflow:hidden;">
        <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" style="display:block; width:100%; border-radius:20px; overflow:hidden;" aria-label="Shop our complete toys collection">
            <img 
                src="<?php echo smartkidstoys_get_image_url( 'skt_hero_banner', 'hero-banner.png' ); ?>" 
                alt="Play, Learn &amp; Grow Together" 
                style="width:100%; height:auto; display:block; border-radius:20px; object-fit:cover;"
            />
        </a>
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
                    <div class="demo-card-actions">
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
                </article>
            <?php endforeach; ?>
        </div>
    </section>

    <?php
    $flash_sale_bg = get_theme_mod( 'skt_flash_sale_banner' );
    if ( empty( $flash_sale_bg ) ) {
        $flash_sale_bg = get_option( 'flash_sale_image_url' );
    }
    if ( empty( $flash_sale_bg ) ) {
        $flash_sale_bg = smartkidstoys_get_image_url( 'skt_flash_sale_banner', 'flash-sale-banner.png' );
    }
    if ( empty( $flash_sale_bg ) || ( strpos( $flash_sale_bg, 'flash-sale-banner.png' ) !== false && ! file_exists( get_template_directory() . '/assets/img/flash-sale-banner.png' ) ) ) {
        $flash_sale_bg = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900';
    }
    ?>
    <!-- 5. FLASH SALE UP TO 40% OFF BANNER (Full BG Image Card) -->
    <section style="margin:36px 0 48px; border-radius:24px; position:relative; overflow:hidden; min-height:clamp(340px, 32vw, 460px); background-color:#FFF9E6; background-image:url('<?php echo esc_url( $flash_sale_bg ); ?>'); background-size:cover; background-position:right center; background-repeat:no-repeat; display:flex; align-items:center; padding:32px 36px;">
        <!-- Clean frosted text card: ensures text readability while keeping the user-uploaded background image 100% visible, bright and clear with no greyish tint -->
        <div style="position:relative; z-index:2; background:rgba(255, 255, 255, 0.92); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-radius:16px; padding:24px 28px; max-width:520px; box-shadow:0 8px 30px rgba(0,0,0,0.12); border:1px solid rgba(255, 255, 255, 0.85);">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <h2 style="font-size:clamp(1.3rem, 2.5vw, 1.85rem); font-weight:900; color:#DB2777; margin:0; text-transform:uppercase; letter-spacing:-0.5px;">
                    FLASH SALE <span style="color:#0284C7;">UP TO 40% OFF</span>
                </h2>
            </div>

            <p style="color:#475569; font-size:0.92rem; font-weight:600; margin:0 0 16px;">
                Limited-time deals on kids' favourite toys
            </p>

            <!-- Countdown Box (Dynamic Ticking Timer) -->
            <?php
            $default_end_ts = time() + (3 * 24 * 3600);
            $custom_end_date = get_theme_mod( 'skt_flash_sale_end_date', '' );
            $target_iso = !empty($custom_end_date) ? $custom_end_date : gmdate('Y-m-d\TH:i:s\Z', $default_end_ts);
            ?>
            <div id="skt-flash-countdown" style="display:flex; align-items:center; gap:8px; margin-bottom:18px; flex-wrap:wrap;" data-fallback-end="<?php echo esc_attr( $target_iso ); ?>">
                <div style="background:#FFFFFF; border:1.5px solid #E2E8F0; border-radius:10px; padding:6px 12px; text-align:center; min-width:54px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
                    <div id="skt-cd-days" style="font-size:1.2rem; font-weight:900; color:#0F172A;">03</div>
                    <div style="font-size:0.65rem; color:#64748B; font-weight:700; text-transform:uppercase;">Days</div>
                </div>
                <span style="font-weight:900; color:#DB2777; font-size:1.1rem;">:</span>

                <div style="background:#FFFFFF; border:1.5px solid #E2E8F0; border-radius:10px; padding:6px 12px; text-align:center; min-width:54px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
                    <div id="skt-cd-hours" style="font-size:1.2rem; font-weight:900; color:#0F172A;">00</div>
                    <div style="font-size:0.65rem; color:#64748B; font-weight:700; text-transform:uppercase;">Hours</div>
                </div>
                <span style="font-weight:900; color:#DB2777; font-size:1.1rem;">:</span>

                <div style="background:#FFFFFF; border:1.5px solid #E2E8F0; border-radius:10px; padding:6px 12px; text-align:center; min-width:54px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
                    <div id="skt-cd-mins" style="font-size:1.2rem; font-weight:900; color:#0F172A;">00</div>
                    <div style="font-size:0.65rem; color:#64748B; font-weight:700; text-transform:uppercase;">Minutes</div>
                </div>
                <span style="font-weight:900; color:#DB2777; font-size:1.1rem;">:</span>

                <div style="background:#FFFFFF; border:1.5px solid #E2E8F0; border-radius:10px; padding:6px 12px; text-align:center; min-width:54px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
                    <div id="skt-cd-secs" style="font-size:1.2rem; font-weight:900; color:#DB2777;">00</div>
                    <div style="font-size:0.65rem; color:#64748B; font-weight:700; text-transform:uppercase;">Seconds</div>
                </div>
            </div>

            <script>
            (function() {
                var container = document.getElementById('skt-flash-countdown');
                if (!container) return;
                
                var targetStr = container.getAttribute('data-fallback-end');
                // Check if admin dashboard saved settings in localStorage
                try {
                    var localSettings = JSON.parse(localStorage.getItem('smartkids_site_settings') || '{}');
                    if (localSettings.flash_sale_end_date) {
                        targetStr = localSettings.flash_sale_end_date;
                    }
                } catch(e) {}

                var elDays = document.getElementById('skt-cd-days');
                var elHours = document.getElementById('skt-cd-hours');
                var elMins = document.getElementById('skt-cd-mins');
                var elSecs = document.getElementById('skt-cd-secs');

                function updateCountdown() {
                    var diff = Math.max(0, new Date(targetStr).getTime() - Date.now());
                    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    var pad = function(n) { return String(n).padStart(2, '0'); };
                    if (elDays) elDays.textContent = pad(days);
                    if (elHours) elHours.textContent = pad(hours);
                    if (elMins) elMins.textContent = pad(minutes);
                    if (elSecs) elSecs.textContent = pad(seconds);
                }

                updateCountdown();
                setInterval(updateCountdown, 1000);
            })();
            </script>

            <a href="<?php echo esc_url( home_url( '/deals' ) ); ?>" style="background:linear-gradient(135deg, #EC4899, #DB2777); color:#FFFFFF; font-weight:800; font-size:0.9rem; padding:10px 22px; border-radius:9999px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 4px 14px rgba(236,72,153,0.35); text-decoration:none;">
                <span>Shop Flash Sale</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
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
                    <div class="demo-card-actions">
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
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.2) 40%, rgba(15,23,42,0.55) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:9999px;">Baby &amp; Toddler</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0 0 4px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">0-2 Years</h3>
                    <p style="font-size:0.88rem; color:rgba(255,255,255,0.95); margin:0 0 14px; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.4);">Safe &amp; sensory</p>
                    <span style="background:linear-gradient(135deg, #EC4899, #DB2777); color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.25);">
                        Shop Now &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=3-5' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.2) 40%, rgba(15,23,42,0.55) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:9999px;">Preschoolers</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0 0 4px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">3-5 Years</h3>
                    <p style="font-size:0.88rem; color:rgba(255,255,255,0.95); margin:0 0 14px; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.4);">Creative play</p>
                    <span style="background:linear-gradient(135deg, #0284C7, #0369A1); color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.25);">
                        Shop Now &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=6-8' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.2) 40%, rgba(15,23,42,0.55) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:9999px;">Early Explorers</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0 0 4px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">6-8 Years</h3>
                    <p style="font-size:0.88rem; color:rgba(255,255,255,0.95); margin:0 0 14px; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.4);">Learning &amp; fun</p>
                    <span style="background:linear-gradient(135deg, #10B981, #059669); color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.25);">
                        Shop Now &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?age=9-12' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.2) 40%, rgba(15,23,42,0.55) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:5px 12px; border-radius:9999px;">Young Innovators</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.45rem; font-weight:900; color:#FFFFFF; margin:0 0 4px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">9-12 Years</h3>
                    <p style="font-size:0.88rem; color:rgba(255,255,255,0.95); margin:0 0 14px; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.4);">STEM &amp; adventure</p>
                    <span style="background:linear-gradient(135deg, #8B5CF6, #7C3AED); color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.25);">
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
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.22) 40%, rgba(15,23,42,0.58) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center;">
                    <span style="width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.3); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.15);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
                    </span>
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:9999px;">Critical Thinking</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.25rem; font-weight:900; color:#FFFFFF; margin:0 0 12px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">Puzzles &amp; Brain Games</h3>
                    <span style="background:linear-gradient(135deg, #8B5CF6, #7C3AED); color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.25);">
                        Explore Collection &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=STEM' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.22) 40%, rgba(15,23,42,0.58) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center;">
                    <span style="width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.3); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.15);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>
                    </span>
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:9999px;">Science &amp; Logic</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.25rem; font-weight:900; color:#FFFFFF; margin:0 0 12px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">STEM &amp; Math Toys</h3>
                    <span style="background:linear-gradient(135deg, #0284C7, #0369A1); color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.25);">
                        Explore Collection &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.22) 40%, rgba(15,23,42,0.58) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center;">
                    <span style="width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.3); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.15);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"/></svg>
                    </span>
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:9999px;">Creative Expression</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.25rem; font-weight:900; color:#FFFFFF; margin:0 0 12px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">Art &amp; Creativity</h3>
                    <span style="background:linear-gradient(135deg, #EC4899, #DB2777); color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.25);">
                        Explore Collection &rarr;
                    </span>
                </div>
            </a>

            <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" style="position:relative; height:270px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:20px; text-decoration:none;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.22) 40%, rgba(15,23,42,0.58) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center;">
                    <span style="width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.3); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.15);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
                    </span>
                    <span style="background:rgba(255,255,255,0.92); color:#0F172A; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:9999px;">Interactive Play</span>
                </div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.25rem; font-weight:900; color:#FFFFFF; margin:0 0 12px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">Educational Games</h3>
                    <span style="background:linear-gradient(135deg, #10B981, #059669); color:#FFFFFF; font-weight:800; font-size:0.85rem; padding:8px 18px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 12px rgba(0,0,0,0.25);">
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
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.18) 40%, rgba(15,23,42,0.52) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.4rem; font-weight:900; color:#FFFFFF; margin:0 0 6px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">Birthday Gifts</h3>
                    <p style="font-size:0.92rem; color:rgba(255,255,255,0.95); margin:0; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.4);">Fun picks they'll remember</p>
                </div>
                <div style="position:relative; z-index:2; margin-top:24px;">
                    <a href="<?php echo esc_url( home_url( '/shop?filter=birthday' ) ); ?>" style="background:linear-gradient(135deg, #10B981, #059669); color:#FFFFFF; font-weight:800; font-size:0.9rem; padding:10px 24px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; width:fit-content; text-decoration:none; box-shadow:0 4px 14px rgba(0,0,0,0.25);">
                        <span>Shop Birthday Gifts &rarr;</span>
                    </a>
                </div>
            </div>

            <div style="position:relative; min-height:250px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:24px;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.18) 40%, rgba(15,23,42,0.52) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.4rem; font-weight:900; color:#FFFFFF; margin:0 0 6px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">Educational Gifts</h3>
                    <p style="font-size:0.92rem; color:rgba(255,255,255,0.95); margin:0; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.4);">Play &amp; learning together</p>
                </div>
                <div style="position:relative; z-index:2; margin-top:24px;">
                    <a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>" style="background:linear-gradient(135deg, #EC4899, #DB2777); color:#FFFFFF; font-weight:800; font-size:0.9rem; padding:10px 24px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; width:fit-content; text-decoration:none; box-shadow:0 4px 14px rgba(0,0,0,0.25);">
                        <span>Shop Educational &rarr;</span>
                    </a>
                </div>
            </div>

            <div style="position:relative; min-height:250px; border-radius:20px; overflow:hidden; background-image:url('https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'); background-size:cover; background-position:center; box-shadow:0 4px 16px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; padding:24px;">
                <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.18) 40%, rgba(15,23,42,0.52) 100%); z-index:1;"></div>
                <div style="position:relative; z-index:2;">
                    <h3 style="font-size:1.4rem; font-weight:900; color:#FFFFFF; margin:0 0 6px; text-shadow:0 2px 4px rgba(0,0,0,0.4);">Gifts Under PKR 2,000</h3>
                    <p style="font-size:0.92rem; color:rgba(255,255,255,0.95); margin:0; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.4);">Great toys, great prices</p>
                </div>
                <div style="position:relative; z-index:2; margin-top:24px;">
                    <a href="<?php echo esc_url( home_url( '/shop?max_price=2000' ) ); ?>" style="background:linear-gradient(135deg, #F59E0B, #D97706); color:#FFFFFF; font-weight:800; font-size:0.9rem; padding:10px 24px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; width:fit-content; text-decoration:none; box-shadow:0 4px 14px rgba(0,0,0,0.25);">
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
    <section style="margin-bottom: 40px;">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
            <div>
                <div class="section-title-wrapper" style="display:flex; align-items:center; gap:8px;">
                    <div style="width:32px; height:32px; border-radius:8px; background:linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); display:flex; align-items:center; justify-content:center; color:#FFFFFF;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </div>
                    <h2 class="section-title-text" style="font-size:1.4rem; font-weight:900; margin:0;">Follow the Fun</h2>
                </div>
                <p style="font-size:0.85rem; color:#DB2777; margin:2px 0 0; font-weight:700;">
                    @SmartKidsToys
                </p>
            </div>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style="background:linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color:#FFFFFF; font-weight:800; font-size:0.88rem; padding:9px 20px; border-radius:9999px; display:inline-flex; align-items:center; gap:8px; text-decoration:none; box-shadow:0 4px 15px rgba(220, 39, 67, 0.35);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
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

    <!-- 12. Promotional Banners: New Arrivals & Special Deals -->
    <section class="demo-banners-grid" style="margin: 36px 0 50px;">
        <!-- Left: New Arrivals Train Banner -->
        <a href="<?php echo esc_url( home_url( '/new-arrivals' ) ); ?>" class="demo-banner-card" style="background:#DCEFFA; text-decoration:none; display:flex;">
            <img 
                src="<?php echo smartkidstoys_get_image_url( 'skt_train_banner', 'train-banner.png' ); ?>" 
                alt="New Arrivals Banner" 
                class="demo-banner-full-bg" 
            />
            <div class="demo-banner-card-content">
                <h3 class="demo-banner-title" style="color:#0369A1;">New Arrivals</h3>
                <p class="demo-banner-sub">Fresh toys<br>just for your kids!</p>
                <span class="btn-banner-action" style="background:linear-gradient(135deg, #0284C7, #0369A1); color:white; font-weight:800; box-shadow:0 4px 14px rgba(2,132,199,0.35); border-radius:9999px; padding:8px 20px; display:inline-flex; align-items:center; gap:6px;">Shop Now &rarr;</span>
            </div>
        </a>

        <!-- Right: Special Deals Teddy Bear Banner -->
        <a href="<?php echo esc_url( home_url( '/deals' ) ); ?>" class="demo-banner-card" style="background:#FEF6DF; text-decoration:none; display:flex;">
            <img 
                src="<?php echo smartkidstoys_get_image_url( 'skt_teddy_banner', 'teddy-banner.png' ); ?>" 
                alt="Special Deals Banner" 
                class="demo-banner-full-bg" 
            />
            <div class="demo-banner-card-content">
                <h3 class="demo-banner-title" style="color:#B45309;">Special Deals</h3>
                <p class="demo-banner-sub">Up to 30% OFF<br>on selected toys</p>
                <span class="btn-banner-action" style="background:linear-gradient(135deg, #F59E0B, #D97706); color:white; font-weight:800; box-shadow:0 4px 14px rgba(245,158,11,0.35); border-radius:9999px; padding:8px 20px; display:inline-flex; align-items:center; gap:6px;">Shop Deals &rarr;</span>
            </div>
        </a>
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

</div>

<?php
get_footer();
