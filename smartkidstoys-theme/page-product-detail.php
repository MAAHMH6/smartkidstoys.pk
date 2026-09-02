<?php
/**
 * Template Name: Product Detail Page
 * The template for displaying individual toy details, specs, reviews, and related products.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();

$toys = smartkidstoys_get_catalog_toys();
$toy_id = isset( $_GET['id'] ) ? intval( $_GET['id'] ) : ( isset( $_GET['toy_id'] ) ? intval( $_GET['toy_id'] ) : 1 );

$product = null;
foreach ( $toys as $t ) {
    if ( $t['id'] === $toy_id ) {
        $product = $t;
        break;
    }
}

if ( ! $product ) {
    $product = $toys[0];
}

$related = array_filter( $toys, function( $t ) use ( $product ) {
    return $t['id'] !== $product['id'];
} );
$related = array_slice( $related, 0, 4 );

$sku = 'SKT-' . strtoupper( substr( $product['category'], 0, 3 ) ) . '-' . str_pad( $product['id'], 4, '0', STR_PAD_LEFT );
?>

<div class="container" style="padding: 24px 20px 80px;">
    
    <!-- Breadcrumbs -->
    <nav style="display: flex; align-items: center; gap: 8px; font-size: 0.86rem; color: var(--text-muted); margin-bottom: 28px;" aria-label="Breadcrumb">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color: var(--text-muted);">Home</a>
        <span>&rsaquo;</span>
        <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" style="color: var(--text-muted);">Shop</a>
        <span>&rsaquo;</span>
        <a href="<?php echo esc_url( home_url( '/shop?cat=' . urlencode( $product['category'] ) ) ); ?>" style="color: var(--text-muted);"><?php echo esc_html( $product['category'] ); ?></a>
        <span>&rsaquo;</span>
        <strong style="color: var(--dark-heading);"><?php echo esc_html( $product['name'] ); ?></strong>
    </nav>

    <!-- Main Product Two-Column Section -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 48px; align-items: start; margin-bottom: 60px;">
        
        <!-- Left: Image Gallery -->
        <div>
            <div style="background: white; border-radius: var(--radius-xl); border: 1px solid var(--gray-2); overflow: hidden; padding: 24px; display: flex; align-items: center; justify-content: center; aspect-ratio: 1; box-shadow: var(--shadow-card); position: relative; margin-bottom: 16px;">
                <?php if ( ! empty( $product['badge'] ) ) : ?>
                    <span style="position: absolute; top: 16px; left: 16px; background: var(--accent-red); color: white; padding: 4px 12px; border-radius: var(--radius-full); font-weight: 800; font-size: 0.78rem;">
                        <?php echo esc_html( $product['badge'] ); ?>
                    </span>
                <?php endif; ?>
                <img id="skt-main-product-img" src="<?php echo esc_url( $product['image'] ); ?>" alt="<?php echo esc_attr( $product['name'] ); ?>" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
            </div>

            <!-- Thumbnail Selector -->
            <div style="display: flex; gap: 12px;">
                <div class="skt-thumb-item active" style="width: 72px; height: 72px; border-radius: var(--radius-md); border: 2px solid var(--primary-blue); padding: 4px; background: white; cursor: pointer;">
                    <img src="<?php echo esc_url( $product['image'] ); ?>" alt="Angle 1" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />
                </div>
            </div>
        </div>

        <!-- Right: Product Information & Purchase Controls -->
        <div>
            <span style="display: inline-block; background: #EFF6FF; color: var(--primary-blue); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800; margin-bottom: 10px;">
                <?php echo esc_html( $product['category'] ); ?>
            </span>

            <h1 style="font-size: 2rem; font-weight: 900; color: var(--dark-heading); margin-bottom: 12px; line-height: 1.25;">
                <?php echo esc_html( $product['name'] ); ?>
            </h1>

            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; font-size: 0.9rem;">
                <div style="display: flex; align-items: center; gap: 4px; color: #F59E0B; font-weight: 800;">
                    <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    <span style="color: var(--dark-heading);"><?php echo esc_html( $product['rating'] ); ?></span>
                </div>
                <span style="color: var(--gray-3);">|</span>
                <span style="color: var(--text-muted);"><?php echo esc_html( $product['reviews'] ); ?> Customer Reviews</span>
                <span style="color: var(--gray-3);">|</span>
                <span style="color: #16A34A; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #16A34A;"></span>
                    In Stock Ready
                </span>
            </div>

            <!-- Price Row -->
            <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px;">
                <span style="font-size: 2.2rem; font-weight: 900; color: var(--dark-heading); font-family: var(--font-heading);">
                    PKR <?php echo number_format( $product['price'] ); ?>
                </span>
                <?php if ( ! empty( $product['old_price'] ) ) : ?>
                    <span style="font-size: 1.2rem; color: var(--gray-4); text-decoration: line-through;">
                        PKR <?php echo number_format( $product['old_price'] ); ?>
                    </span>
                    <span style="background: #FEE2E2; color: #DC2626; padding: 2px 8px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800;">
                        Save <?php echo round( ( ( $product['old_price'] - $product['price'] ) / $product['old_price'] ) * 100 ); ?>%
                    </span>
                <?php endif; ?>
            </div>

            <p style="color: var(--text); font-size: 0.96rem; line-height: 1.6; margin-bottom: 24px;">
                <?php echo esc_html( $product['description'] ); ?>
            </p>

            <!-- Quantity & Actions -->
            <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px;">
                
                <div style="display: flex; align-items: center; gap: 16px;">
                    <label style="font-size: 0.9rem; font-weight: 800; color: var(--dark-heading);">Quantity:</label>
                    <div class="quantity-control">
                        <button type="button" class="qty-btn" id="skt-detail-qty-dec">-</button>
                        <input type="text" id="skt-detail-qty" value="1" readonly class="qty-display" />
                        <button type="button" class="qty-btn" id="skt-detail-qty-inc">+</button>
                    </div>
                </div>

                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <button 
                        type="button" 
                        class="btn-add-cart-colorful skt-add-to-cart-trigger"
                        data-toy-id="<?php echo esc_attr( $product['id'] ); ?>"
                        data-toy-name="<?php echo esc_attr( $product['name'] ); ?>"
                        data-toy-price="<?php echo esc_attr( $product['price'] ); ?>"
                        data-toy-image="<?php echo esc_attr( $product['image'] ); ?>"
                        style="background: linear-gradient(135deg, #0284C7, #0369A1); padding: 12px 28px; font-size: 0.95rem; border-radius: var(--radius-full);"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        <span>Add to Shopping Bag</span>
                    </button>

                    <a 
                        href="https://wa.me/923098444501?text=<?php echo urlencode( 'Hello! I want to order: ' . $product['name'] . ' (SKU: ' . $sku . ' | PKR ' . number_format( $product['price'] ) . ')' ); ?>" 
                        target="_blank" 
                        rel="noreferrer"
                        class="btn-whatsapp"
                        style="padding: 12px 24px; font-size: 0.95rem; border-radius: var(--radius-full);"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        <span>Buy Now via WhatsApp</span>
                    </a>
                </div>

            </div>

            <!-- Trust & Safety Badges -->
            <div style="background: #F8FAFC; border: 1px solid var(--gray-2); border-radius: var(--radius-lg); padding: 18px 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background: #EFF6FF; color: #0284C7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <span><strong>100% Non-Toxic</strong> &amp; Child Safe</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background: #DCFCE7; color: #16A34A; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    </div>
                    <span><strong>Free Delivery</strong> over PKR 3,000</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background: #FEF3C7; color: #D97706; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                    </div>
                    <span><strong>14-Day Easy</strong> Replacement</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background: #F3E8FF; color: #7C3AED; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    </div>
                    <span><strong>Cash on Delivery</strong> Nationwide</span>
                </div>
            </div>

        </div>

    </div>

    <!-- Related Products -->
    <section>
        <div class="section-header">
            <h2 class="section-title-text">You May Also Like</h2>
            <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="view-all-btn">
                <span>View All Toys</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
            <?php foreach ( $related as $r_toy ) : ?>
                <div class="demo-product-card">
                    <div class="demo-product-img-box">
                        <img src="<?php echo esc_url( $r_toy['image'] ); ?>" alt="<?php echo esc_attr( $r_toy['name'] ); ?>" class="demo-product-img" />
                    </div>
                    <h3 class="demo-product-title">
                        <a href="<?php echo esc_url( home_url( '/product-detail?id=' . $r_toy['id'] ) ); ?>"><?php echo esc_html( $r_toy['name'] ); ?></a>
                    </h3>
                    <div class="demo-price-row">
                        <span class="demo-current-price">PKR <?php echo number_format( $r_toy['price'] ); ?></span>
                    </div>
                    <button 
                        type="button" 
                        class="btn-add-cart-colorful skt-add-to-cart-trigger"
                        data-toy-id="<?php echo esc_attr( $r_toy['id'] ); ?>"
                        data-toy-name="<?php echo esc_attr( $r_toy['name'] ); ?>"
                        data-toy-price="<?php echo esc_attr( $r_toy['price'] ); ?>"
                        data-toy-image="<?php echo esc_attr( $r_toy['image'] ); ?>"
                        style="background: linear-gradient(135deg, #0284C7, #0369A1);"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        <span>Add to Bag</span>
                    </button>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

</div>

<?php
get_footer();
