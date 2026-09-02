<?php
/**
 * SmartKids Toys - Header Template
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?php bloginfo( 'description' ); ?>">
    <title><?php wp_title( '|', true, 'right' ); ?><?php bloginfo( 'name' ); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- ===== TOP ANNOUNCEMENT BAR ===== -->
<div class="top-utilities-bar">
    <div class="container top-utilities-content">
        <div class="top-utilities-left">
            <!-- Truck SVG -->
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Free Delivery Across Pakistan on Orders Over PKR 3,000
        </div>
        <div class="top-utilities-right">
            <a href="https://wa.me/923098444501" target="_blank" rel="noreferrer" class="top-util-link">
                <!-- WhatsApp SVG -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WhatsApp: 03098444501
            </a>
            <a href="tel:+923098444501" class="top-util-link">
                <!-- Phone SVG -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.78 16.92z"/></svg>
                Call: 03098444501
            </a>
            <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>" class="top-util-link">Store Support</a>
        </div>
    </div>
</div>

<!-- ===== MAIN HEADER: 3-Column Centered Logo Grid ===== -->
<header class="main-header" role="banner">
    <div class="container main-header-centered-grid">

        <!-- LEFT: Pill Search Bar -->
        <div>
            <form class="demo-search-bar" role="search" action="<?php echo esc_url( home_url( '/shop' ) ); ?>" method="GET">
                <input 
                    type="search" 
                    class="demo-search-input" 
                    placeholder="Search toys, action figures, blocks..." 
                    value="<?php echo get_search_query(); ?>" 
                    name="s" 
                    required 
                />
                <select class="demo-search-select" name="toy_cat">
                    <option value="">All Categories</option>
                    <option value="soft-toys">Soft Toys</option>
                    <option value="building-blocks">Building Blocks</option>
                    <option value="educational">Educational</option>
                    <option value="vehicles">Vehicles</option>
                    <option value="action-figures">Action Figures</option>
                    <option value="puzzles">Puzzles</option>
                    <option value="outdoor-toys">Outdoor Toys</option>
                    <option value="baby-toys">Baby Toys</option>
                    <option value="arts-crafts">Arts &amp; Crafts</option>
                </select>
                <button type="submit" class="demo-search-btn" aria-label="Search">
                    <!-- Search / Magnify SVG -->
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
            </form>
        </div>

        <!-- CENTER: Large 135px 3D Toy Logo -->
        <div class="header-logo-center-wrap">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header-logo-wrap" rel="home">
                <img 
                    src="<?php echo smartkidstoys_get_image_url( 'skt_logo_url', 'logo.png' ); ?>" 
                    alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" 
                    class="header-logo-big-img"
                />
            </a>
        </div>

        <!-- RIGHT: Account & Bag Badges -->
        <div class="header-right-actions">
            
            <!-- Account / Login -->
            <a href="<?php echo esc_url( home_url( '/account' ) ); ?>" class="header-meta-item">
                <div style="width: 42px; height: 42px; border-radius: 50%; background: #EFF6FF; display: flex; align-items: center; justify-content: center;">
                    <!-- User SVG -->
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                    <div class="header-meta-label">Account</div>
                    <div class="header-meta-value">My Account</div>
                </div>
            </a>

            <!-- Shopping Bag / Cart -->
            <a href="<?php echo esc_url( home_url( '/bag' ) ); ?>" class="header-meta-item">
                <div style="position: relative;">
                    <div style="width: 42px; height: 42px; border-radius: 50%; background: #FEF3C7; display: flex; align-items: center; justify-content: center;">
                        <!-- Shopping Bag SVG -->
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <span class="cart-yellow-badge" id="skt-header-cart-count">0</span>
                </div>
                <div>
                    <div class="header-meta-label">BAG</div>
                    <div class="header-meta-value" id="skt-header-cart-total">PKR 0</div>
                </div>
            </a>

        </div>
    </div>
</header>

<!-- ===== NAVIGATION ROW ===== -->
<nav class="header-nav-bar" role="navigation" aria-label="Primary Navigation">
    <div class="container nav-bar-row">
        <a href="<?php echo esc_url( home_url( '/categories' ) ); ?>" class="all-categories-btn">
            <!-- Grid/Menu SVG -->
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            All Categories
        </a>
        <div class="main-nav-links">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="main-nav-link">Home</a>
            <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="main-nav-link">Shop Toys</a>
            <a href="<?php echo esc_url( home_url( '/new-arrivals' ) ); ?>" class="main-nav-link">New Arrivals</a>
            <a href="<?php echo esc_url( home_url( '/deals' ) ); ?>" class="main-nav-link" style="color: #EF4444;">
                Special Deals
                <!-- Tag SVG badge -->
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </a>
            <a href="<?php echo esc_url( home_url( '/about' ) ); ?>" class="main-nav-link">About Us</a>
            <a href="https://wa.me/923098444501" target="_blank" rel="noreferrer" class="main-nav-link" style="color: #16A34A;">
                <!-- WhatsApp SVG -->
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                Contact &amp; WhatsApp
            </a>
        </div>
    </div>
</nav>

<?php get_template_part( 'inc/auth-modal' ); ?>

<!-- Toast notification -->
<div class="skt-toast" id="skt-toast" role="status" aria-live="polite">
    <!-- Check SVG -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    <span id="skt-toast-msg">Added to Bag!</span>
</div>
