<?php
/**
 * Template Name: New Arrivals
 * The template for displaying new arrivals with train banner header.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();

$all_toys = smartkidstoys_get_catalog_toys();
$new_toys = array_filter( $all_toys, function( $t ) {
    return ! empty( $t['is_new'] );
} );

$button_colors = array(
    'linear-gradient(135deg, #0284C7, #0369A1)',
    'linear-gradient(135deg, #EF4444, #DC2626)',
    'linear-gradient(135deg, #10B981, #059669)',
    'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    'linear-gradient(135deg, #F59E0B, #D97706)',
    'linear-gradient(135deg, #EC4899, #DB2777)'
);
?>

<div class="container" style="padding: 24px 20px 80px;">
    
    <!-- Top Train Banner -->
    <div style="position: relative; border-radius: var(--radius-xl); overflow: hidden; min-height: 220px; display: flex; align-items: center; margin-bottom: 32px; box-shadow: var(--shadow-card);">
        <img 
            src="<?php echo smartkidstoys_get_image_url( 'skt_train_banner', 'train-banner.png' ); ?>" 
            alt="New Arrivals Train Banner" 
            style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;"
        />
        <div style="position: relative; z-index: 2; padding: 36px 44px; max-width: 440px;">
            <span style="background: #0284C7; color: white; padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 800; text-transform: uppercase;">
                Fresh Launches
            </span>
            <h1 style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin: 8px 0 6px;">New Arrivals</h1>
            <p style="color: #334155; font-size: 0.95rem; line-height: 1.4;">
                Discover the latest electric trains, creative building blocks, and robotic STEM kits!
            </p>
        </div>
    </div>

    <!-- Shop Layout Grid -->
    <div class="shop-layout">
        
        <!-- Left Filter Sidebar -->
        <aside class="shop-sidebar">
            <div class="filter-header">
                <span style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem;">Filter New Arrivals</span>
                <a href="<?php echo esc_url( home_url( '/new-arrivals' ) ); ?>" style="font-size: 0.8rem; color: var(--accent-red); font-weight: 700;">Reset</a>
            </div>

            <div class="filter-group">
                <div class="filter-group-title">Categories</div>
                <?php
                $filter_categories = array( 'Vehicles', 'Building Blocks', 'Educational', 'Soft Toys', 'Action Figures' );
                foreach ( $filter_categories as $cat ) :
                ?>
                    <label class="filter-option-item">
                        <input type="checkbox" name="category" value="<?php echo esc_attr( $cat ); ?>" />
                        <span><?php echo esc_html( $cat ); ?></span>
                    </label>
                <?php endforeach; ?>
            </div>

            <div class="filter-group">
                <div class="filter-group-title">Price Range</div>
                <label class="filter-option-item">
                    <input type="checkbox" />
                    <span>Under PKR 2,000</span>
                </label>
                <label class="filter-option-item">
                    <input type="checkbox" />
                    <span>PKR 2,000 - PKR 4,000</span>
                </label>
            </div>
        </aside>

        <!-- Right Product Grid -->
        <div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
                <?php foreach ( $new_toys as $index => $toy ) : 
                    $btn_color = $button_colors[ $index % count( $button_colors ) ];
                ?>
                    <div class="demo-product-card">
                        <span class="demo-sale-tag" style="background:#0284C7;">NEW</span>

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
                                href="https://wa.me/923098444501?text=<?php echo urlencode( 'Hello! I want to order New Arrival: ' . $toy['name'] . ' (PKR ' . number_format( $toy['price'] ) . ')' ); ?>" 
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
        </div>

    </div>

</div>

<?php
get_footer();
