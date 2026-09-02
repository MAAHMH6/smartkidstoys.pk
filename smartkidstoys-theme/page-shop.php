<?php
/**
 * Template Name: Shop Catalog
 * The template for displaying all toys catalog with sidebar filters.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();

$toys = smartkidstoys_get_catalog_toys();

// Color rotation for Add to Cart buttons
$button_colors = array(
    'linear-gradient(135deg, #0284C7, #0369A1)',
    'linear-gradient(135deg, #EF4444, #DC2626)',
    'linear-gradient(135deg, #10B981, #059669)',
    'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    'linear-gradient(135deg, #F59E0B, #D97706)',
    'linear-gradient(135deg, #EC4899, #DB2777)'
);
?>

<div class="container" style="padding: 30px 20px 80px;">
    
    <div style="margin-bottom: 24px;">
        <h1 class="section-title-text" style="font-size: 2rem; margin-bottom: 6px;">All <span>Toys Catalog</span></h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
            Explore premium child-safe toys, educational STEM puzzles, building blocks, and action figures.
        </p>
    </div>

    <div class="shop-layout">
        
        <!-- LEFT: Layered Filter Sidebar -->
        <aside class="shop-sidebar">
            <div class="filter-header">
                <span style="font-family: var(--font-heading); font-weight: 800; font-size: 0.95rem;">Filter Products</span>
                <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" style="font-size: 0.8rem; color: var(--accent-red); font-weight: 700;">Reset All</a>
            </div>

            <!-- Category Filter -->
            <div class="filter-group">
                <div class="filter-group-title">Categories</div>
                <?php
                $filter_categories = array(
                    'Soft Toys', 'Building Blocks', 'Educational', 'Vehicles', 'Action Figures', 'Puzzles', 'Outdoor Toys', 'Baby Toys', 'Arts & Crafts'
                );
                foreach ( $filter_categories as $cat ) :
                ?>
                    <label class="filter-option-item">
                        <input type="checkbox" name="category" value="<?php echo esc_attr( $cat ); ?>" />
                        <span><?php echo esc_html( $cat ); ?></span>
                    </label>
                <?php endforeach; ?>
            </div>

            <!-- Price Range Filter -->
            <div class="filter-group">
                <div class="filter-group-title">Price Range</div>
                <label class="filter-option-item">
                    <input type="checkbox" name="price" value="under-1500" />
                    <span>Under PKR 1,500</span>
                </label>
                <label class="filter-option-item">
                    <input type="checkbox" name="price" value="1500-3000" />
                    <span>PKR 1,500 - PKR 3,000</span>
                </label>
                <label class="filter-option-item">
                    <input type="checkbox" name="price" value="above-3000" />
                    <span>Above PKR 3,000</span>
                </label>
            </div>

            <!-- Stock Status -->
            <div class="filter-group">
                <div class="filter-group-title">Availability</div>
                <label class="filter-option-item">
                    <input type="checkbox" checked />
                    <span>In Stock Ready</span>
                </label>
                <label class="filter-option-item">
                    <input type="checkbox" />
                    <span>Special Deals</span>
                </label>
            </div>
        </aside>

        <!-- RIGHT: Product Catalog & Sorting -->
        <div>
            
            <!-- Top Controls Row -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; background: white; padding: 14px 20px; border-radius: var(--radius-lg); border: 1px solid var(--gray-2); flex-wrap: wrap; gap: 12px;">
                <div style="font-size: 0.92rem; font-weight: 700; color: var(--text);">
                    Showing <strong style="color: var(--primary-blue);"><?php echo count( $toys ); ?></strong> toys
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                    <label style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted);">Sort By:</label>
                    <select style="padding: 6px 14px; border-radius: var(--radius-md); border: 1px solid var(--gray-3); font-size: 0.88rem; font-weight: 700; background: white;">
                        <option value="featured">Featured &amp; Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Customer Rated</option>
                    </select>
                </div>
            </div>

            <!-- Product Cards Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
                <?php foreach ( $toys as $index => $toy ) : 
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
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
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
