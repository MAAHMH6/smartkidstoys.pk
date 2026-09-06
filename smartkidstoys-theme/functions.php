<?php
/**
 * SmartKids Toys Theme Functions & Definitions
 *
 * @package SmartKidsToys
 * @version 1.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// 1. Theme Setup
function smartkidstoys_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    add_theme_support( 'custom-logo' );

    register_nav_menus( array(
        'primary-menu' => __( 'Primary Header Menu', 'smartkidstoys' ),
        'footer-menu'  => __( 'Footer Menu', 'smartkidstoys' ),
    ) );
}
add_action( 'after_setup_theme', 'smartkidstoys_setup' );

// 2. Enqueue Styles & Scripts
function smartkidstoys_scripts() {
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito:wght@700;800;900&display=swap', array(), null );
    wp_enqueue_style( 'smartkidstoys-style', get_stylesheet_uri(), array(), '1.3.0' );

    wp_enqueue_script( 'smartkidstoys-main', get_template_directory_uri() . '/assets/js/main.js', array( 'jquery' ), '1.3.0', true );

    wp_localize_script( 'smartkidstoys-main', 'skt_ajax', array(
        'ajax_url' => admin_url( 'admin-ajax.php' ),
        'nonce'    => wp_create_nonce( 'skt_order_nonce' ),
        'whatsapp_number' => get_theme_mod( 'skt_whatsapp_number', '923098444501' )
    ) );
}
add_action( 'wp_enqueue_scripts', 'smartkidstoys_scripts' );

// 2b. Theme Image & Media Helper
function smartkidstoys_get_image_url( $setting_key, $default_filename ) {
    $custom_url = get_theme_mod( $setting_key );
    if ( ! empty( $custom_url ) ) {
        return esc_url( $custom_url );
    }
    return esc_url( get_template_directory_uri() . '/assets/img/' . $default_filename );
}

// 2c. WordPress Customizer Settings
function smartkidstoys_customize_register( $wp_customize ) {
    $wp_customize->add_section( 'skt_media_section', array(
        'title'    => __( 'SmartKids Toys Media & Banners', 'smartkidstoys' ),
        'priority' => 30,
    ) );

    // Logo
    $wp_customize->add_setting( 'skt_logo_url', array( 'default' => '' ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'skt_logo_url', array(
        'label'    => __( 'Header & Footer Logo', 'smartkidstoys' ),
        'section'  => 'skt_media_section',
        'settings' => 'skt_logo_url',
    ) ) );

    // Hero Banner
    $wp_customize->add_setting( 'skt_hero_banner', array( 'default' => '' ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'skt_hero_banner', array(
        'label'    => __( 'Hero Mega Sale Banner', 'smartkidstoys' ),
        'section'  => 'skt_media_section',
        'settings' => 'skt_hero_banner',
    ) ) );

    // Train Banner (New Arrivals)
    $wp_customize->add_setting( 'skt_train_banner', array( 'default' => '' ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'skt_train_banner', array(
        'label'    => __( 'New Arrivals Train Banner', 'smartkidstoys' ),
        'section'  => 'skt_media_section',
        'settings' => 'skt_train_banner',
    ) ) );

    // Teddy Bear Banner (Special Deals)
    $wp_customize->add_setting( 'skt_teddy_banner', array( 'default' => '' ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'skt_teddy_banner', array(
        'label'    => __( 'Special Deals Teddy Bear Banner', 'smartkidstoys' ),
        'section'  => 'skt_media_section',
        'settings' => 'skt_teddy_banner',
    ) ) );

    // Flash Sale Banner
    $wp_customize->add_setting( 'skt_flash_sale_banner', array( 'default' => '' ) );
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'skt_flash_sale_banner', array(
        'label'    => __( 'Flash Sale Banner Image', 'smartkidstoys' ),
        'section'  => 'skt_media_section',
        'settings' => 'skt_flash_sale_banner',
    ) ) );

    // WhatsApp Number
    $wp_customize->add_setting( 'skt_whatsapp_number', array( 'default' => '923098444501' ) );
    $wp_customize->add_control( 'skt_whatsapp_number', array(
        'label'    => __( 'WhatsApp Support & Order Number (e.g. 923098444501)', 'smartkidstoys' ),
        'section'  => 'skt_media_section',
        'type'     => 'text',
    ) );

    // Scrolling Announcement Bar Messages
    $wp_customize->add_setting( 'skt_announcement_messages', array(
        'default' => "🚚 Free Shipping on orders above PKR 3,000 🚀 | ⚡ Flash Sale — Up to 40% OFF selected toys! | 🎁 Fast Delivery across Pakistan in 2–4 days | 📞 Order via WhatsApp: 03098444501 | ✨ New arrivals added every week — Shop now!"
    ) );
    $wp_customize->add_control( 'skt_announcement_messages', array(
        'label'       => __( 'Scrolling Announcement Bar Messages (Separate each message with |)', 'smartkidstoys' ),
        'section'     => 'skt_media_section',
        'type'        => 'textarea',
        'description' => __( 'Each item will scroll smoothly across the top bar. Use pipe | to separate announcements.', 'smartkidstoys' ),
    ) );

    // Flash Sale End Date
    $wp_customize->add_setting( 'skt_flash_sale_end_date', array( 'default' => '' ) );
    $wp_customize->add_control( 'skt_flash_sale_end_date', array(
        'label'       => __( 'Flash Sale Countdown End Date (ISO / YYYY-MM-DDTHH:MM)', 'smartkidstoys' ),
        'section'     => 'skt_media_section',
        'type'        => 'text',
        'description' => __( 'Leave empty for automatic 3-day rolling countdown, or set e.g. 2026-09-20T23:59:59', 'smartkidstoys' ),
    ) );
}
add_action( 'customize_register', 'smartkidstoys_customize_register' );

// 3. Smart Dynamic Template Router (Bypasses 404s cleanly)
add_filter( 'redirect_canonical', '__return_false' );

function smartkidstoys_smart_router( $template ) {
    // Never intercept admin, login, cron, or AJAX requests
    if ( is_admin() || wp_doing_ajax() || ( defined( 'DOING_CRON' ) && DOING_CRON ) ) {
        return $template;
    }

    if ( is_front_page() || is_home() ) {
        $front = get_template_directory() . '/front-page.php';
        return file_exists( $front ) ? $front : $template;
    }

    $request_uri = trim( parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ), '/' );
    $home_path   = trim( parse_url( home_url(), PHP_URL_PATH ), '/' );
    if ( ! empty( $home_path ) && strpos( $request_uri, $home_path ) === 0 ) {
        $request_uri = trim( substr( $request_uri, strlen( $home_path ) ), '/' );
    }

    if ( empty( $request_uri ) ) return $template;

    $segments  = explode( '/', $request_uri );
    $first_seg = $segments[0] ?? '';
    $last_slug = end( $segments );

    if ( strpos( $last_slug, 'wp-' ) === 0 ) {
        return $template;
    }

    // 1. Dynamic /category/:slug router
    if ( $first_seg === 'category' ) {
        $cat_file = get_template_directory() . '/page-category-detail.php';
        if ( file_exists( $cat_file ) ) {
            global $wp_query;
            if ( isset( $wp_query ) && is_object( $wp_query ) ) {
                $wp_query->is_404  = false;
                $wp_query->is_page = true;
            }
            return $cat_file;
        }
    }

    // 2. Dynamic /product/:slug router
    if ( $first_seg === 'product' ) {
        $prod_file = get_template_directory() . '/page-product-detail.php';
        if ( file_exists( $prod_file ) ) {
            global $wp_query;
            if ( isset( $wp_query ) && is_object( $wp_query ) ) {
                $wp_query->is_404  = false;
                $wp_query->is_page = true;
            }
            return $prod_file;
        }
    }

    $slug_mappings = array(
        'shop'              => 'page-shop.php',
        'deals'             => 'page-deals.php',
        'new-arrivals'      => 'page-new-arrivals.php',
        'categories'        => 'page-categories.php',
        'about'             => 'page-about.php',
        'contact'           => 'page-contact.php',
        'bag'               => 'page-bag.php',
        'cart'              => 'page-bag.php',
        'checkout'          => 'page-bag.php',
        'account'           => 'page-account.php',
        'my-account'        => 'page-account.php',
        'product-detail'    => 'page-product-detail.php',
        'toy'               => 'page-product-detail.php',
        'privacy-policy'    => 'page-privacy-policy.php',
        'terms'             => 'page-terms.php',
        'shipping-delivery' => 'page-shipping-delivery.php',
        'returns-refunds'   => 'page-returns-refunds.php'
    );

    if ( isset( $slug_mappings[ $last_slug ] ) ) {
        $file_path = get_template_directory() . '/' . $slug_mappings[ $last_slug ];
        if ( file_exists( $file_path ) ) {
            global $wp_query;
            if ( isset( $wp_query ) && is_object( $wp_query ) ) {
                $wp_query->is_404  = false;
                $wp_query->is_page = true;
            }
            return $file_path;
        }
    }

    $candidate = get_template_directory() . "/page-{$last_slug}.php";
    if ( file_exists( $candidate ) ) {
        global $wp_query;
        if ( isset( $wp_query ) && is_object( $wp_query ) ) {
            $wp_query->is_404  = false;
            $wp_query->is_page = true;
        }
        return $candidate;
    }

    return $template;
}
add_filter( 'template_include', 'smartkidstoys_smart_router', 99 );

// Load Admin Dashboard Hub, CPTs, and Analytics
$admin_hub_file = get_template_directory() . '/inc/admin-dashboard.php';
if ( file_exists( $admin_hub_file ) ) {
    require_once $admin_hub_file;
}

// 7. Native AJAX Endpoint for Direct Order Placement
function smartkidstoys_ajax_submit_order() {
    check_ajax_referer( 'skt_order_nonce', 'nonce' );

    $name    = isset( $_POST['customer_name'] ) ? sanitize_text_field( $_POST['customer_name'] ) : 'Customer';
    $phone   = isset( $_POST['phone'] ) ? sanitize_text_field( $_POST['phone'] ) : '';
    $city    = isset( $_POST['city'] ) ? sanitize_text_field( $_POST['city'] ) : 'Lahore';
    $address = isset( $_POST['address'] ) ? sanitize_textarea_field( $_POST['address'] ) : '';
    $total   = isset( $_POST['total'] ) ? floatval( $_POST['total'] ) : 0;
    $items   = isset( $_POST['items'] ) ? sanitize_text_field( $_POST['items'] ) : '';

    $order_num = 'SKT-ORD-' . rand( 1000, 9999 );

    $post_id = wp_insert_post( array(
        'post_type'   => 'toy_order',
        'post_title'  => $order_num . ' - ' . $name,
        'post_status' => 'publish',
    ) );

    if ( $post_id ) {
        update_post_meta( $post_id, 'order_number', $order_num );
        update_post_meta( $post_id, 'order_customer_name', $name );
        update_post_meta( $post_id, 'order_phone', $phone );
        update_post_meta( $post_id, 'order_city', $city );
        update_post_meta( $post_id, 'order_address', $address );
        update_post_meta( $post_id, 'order_total', $total );
        update_post_meta( $post_id, 'order_status', 'confirmed' );
        update_post_meta( $post_id, 'order_items_json', $items );

        if ( function_exists( 'smartkidstoys_sync_customer_record' ) ) {
            smartkidstoys_sync_customer_record( $name, $phone, $city, $address, $total );
        }

        wp_send_json_success( array(
            'order_id'     => $post_id,
            'order_number' => $order_num,
            'message'      => 'Order received successfully'
        ) );
    } else {
        wp_send_json_error( array( 'message' => 'Failed to save order' ) );
    }
}
add_action( 'wp_ajax_skt_submit_order', 'smartkidstoys_ajax_submit_order' );
add_action( 'wp_ajax_nopriv_skt_submit_order', 'smartkidstoys_ajax_submit_order' );

// 7b. Helper: Slugify text (100% safe, zero external extension dependency)
function smartkidstoys_slugify( $text ) {
    if ( empty( $text ) ) return 'toy';
    if ( function_exists( 'sanitize_title' ) ) {
        return sanitize_title( $text );
    }
    $text = preg_replace( '/[^A-Za-z0-9-]+/', '-', strtolower( (string) $text ) );
    $clean = trim( $text, '-' );
    return ! empty( $clean ) ? $clean : 'toy';
}

// 8. Dynamic Catalog Helper (Queries skt_toy posts from WP database with sample fallback)
function smartkidstoys_get_catalog_toys() {
    $db_toys = get_posts( array(
        'post_type'      => 'skt_toy',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ) );

    if ( ! empty( $db_toys ) && is_array( $db_toys ) ) {
        $catalog = array();
        foreach ( $db_toys as $post ) {
            $terms = wp_get_post_terms( $post->ID, 'skt_toy_cat' );
            $cat_name = ( ! is_wp_error( $terms ) && ! empty( $terms ) && is_object( $terms[0] ) ) ? $terms[0]->name : 'Soft Toys';
            $img_url = has_post_thumbnail( $post->ID ) ? get_the_post_thumbnail_url( $post->ID, 'large' ) : 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&auto=format&fit=crop&q=80';

            $catalog[] = array(
                'id'                => $post->ID,
                'name'              => $post->post_title,
                'category'          => $cat_name,
                'price'             => floatval( get_post_meta( $post->ID, 'toy_price', true ) ?: 1500 ),
                'old_price'         => floatval( get_post_meta( $post->ID, 'toy_old_price', true ) ),
                'rating'            => floatval( get_post_meta( $post->ID, 'toy_rating', true ) ?: 4.9 ),
                'reviews'           => intval( get_post_meta( $post->ID, 'toy_reviews', true ) ?: 50 ),
                'image'             => $img_url,
                'is_new'            => get_post_meta( $post->ID, 'toy_is_new', true ) === '1',
                'is_deal'           => get_post_meta( $post->ID, 'toy_is_deal', true ) === '1',
                'badge'             => get_post_meta( $post->ID, 'toy_badge', true ) ?: 'Best Seller',
                'age_range'         => get_post_meta( $post->ID, 'toy_age_range', true ) ?: '3-8 Years',
                'educational_skill' => get_post_meta( $post->ID, 'toy_educational_skill', true ) ?: 'STEM &amp; Motor Skills',
                'description'       => ! empty( $post->post_excerpt ) ? $post->post_excerpt : wp_trim_words( $post->post_content, 30 )
            );
        }
        if ( ! empty( $catalog ) ) {
            return $catalog;
        }
    }

    // Fallback catalog for instant theme preview
    return array(
        array(
            'id'                => 1,
            'name'              => 'Cute Teddy Bear',
            'category'          => 'Soft Toys',
            'price'             => 1750,
            'old_price'         => 2500,
            'rating'            => 4.9,
            'reviews'           => 128,
            'image'             => 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&auto=format&fit=crop&q=80',
            'is_new'            => true,
            'is_deal'           => true,
            'badge'             => 'Best Seller',
            'age_range'         => '1-3 Years',
            'educational_skill' => 'Sensory &amp; Emotional Comfort',
            'description'       => 'Super soft and cuddly plush teddy bear made with hypoallergenic non-toxic fabric.'
        ),
        array(
            'id'                => 2,
            'name'              => 'Wooden Building Blocks Set',
            'category'          => 'Building Blocks',
            'price'             => 2890,
            'old_price'         => 3500,
            'rating'            => 4.8,
            'reviews'           => 94,
            'image'             => 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&auto=format&fit=crop&q=80',
            'is_new'            => true,
            'is_deal'           => false,
            'badge'             => 'Parent Favorite',
            'age_range'         => '3-5 Years',
            'educational_skill' => 'STEM / Logic / Motor Skills',
            'description'       => '100 pieces natural solid wood building blocks with vibrant non-toxic water-based paint.'
        ),
        array(
            'id'                => 3,
            'name'              => 'Remote Control Monster Truck',
            'category'          => 'Vehicles',
            'price'             => 3450,
            'old_price'         => 4500,
            'rating'            => 4.9,
            'reviews'           => 156,
            'image'             => 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&auto=format&fit=crop&q=80',
            'is_new'            => false,
            'is_deal'           => true,
            'badge'             => 'Best Seller',
            'age_range'         => '5-8 Years',
            'educational_skill' => 'Hand-Eye Coordination &amp; Spatial Skills',
            'description'       => 'High speed 4WD off-road RC monster truck with rechargeable battery and shockproof chassis.'
        ),
        array(
            'id'                => 4,
            'name'              => 'Solar Robot 12-in-1 Kit',
            'category'          => 'Educational',
            'price'             => 2200,
            'old_price'         => 2900,
            'rating'            => 4.7,
            'reviews'           => 82,
            'image'             => 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=500&auto=format&fit=crop&q=80',
            'is_new'            => false,
            'is_deal'           => true,
            'badge'             => 'Educational',
            'age_range'         => '8+ Years',
            'educational_skill' => 'STEM / Robotics / Problem Solving',
            'description'       => 'Hands-on STEM solar powered robot kit that builds 12 different walking and crawling robots.'
        ),
        array(
            'id'                => 5,
            'name'              => 'Color Sorting Wooden Rainbow Stacker',
            'category'          => 'Educational',
            'price'             => 1299,
            'old_price'         => 1600,
            'rating'            => 4.9,
            'reviews'           => 67,
            'image'             => 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80',
            'is_new'            => true,
            'is_deal'           => false,
            'badge'             => 'Great Gift',
            'age_range'         => '1-3 Years',
            'educational_skill' => 'Color Sorting &amp; Fine Motor Dexterity',
            'description'       => 'Montessori wooden stacking rings to foster hand-eye coordination and color identification.'
        ),
        array(
            'id'                => 6,
            'name'              => 'Classic Electric Train Set',
            'category'          => 'Vehicles',
            'price'             => 3200,
            'old_price'         => 4000,
            'rating'            => 4.8,
            'reviews'           => 112,
            'image'             => 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&auto=format&fit=crop&q=80',
            'is_new'            => true,
            'is_deal'           => true,
            'badge'             => 'Parent Favorite',
            'age_range'         => '3-5 Years',
            'educational_skill' => 'Creative Play &amp; Imagination',
            'description'       => 'Complete railway train set with headlight locomotive, passenger cars, and loop tracks.'
        ),
        array(
            'id'                => 7,
            'name'              => 'Superhero Articulated Action Figure',
            'category'          => 'Action Figures',
            'price'             => 1450,
            'old_price'         => 1950,
            'rating'            => 4.9,
            'reviews'           => 98,
            'image'             => 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80',
            'is_new'            => false,
            'is_deal'           => true,
            'badge'             => 'Great Gift',
            'age_range'         => '5-8 Years',
            'educational_skill' => 'Storytelling &amp; Imaginative Play',
            'description'       => 'Poseable superhero action figure with 16 points of articulation and premium detailed sculpting.'
        ),
        array(
            'id'                => 8,
            'name'              => 'Animals 3D Wooden Jigsaw Puzzle',
            'category'          => 'Puzzles',
            'price'             => 990,
            'old_price'         => 1350,
            'rating'            => 4.7,
            'reviews'           => 45,
            'image'             => 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&auto=format&fit=crop&q=80',
            'is_new'            => false,
            'is_deal'           => false,
            'badge'             => 'Educational',
            'age_range'         => '3-5 Years',
            'educational_skill' => 'Cognitive Logic &amp; Pattern Recognition',
            'description'       => 'Laser cut 3D jigsaw puzzle developing spatial reasoning and fine motor dexterity.'
        )
    );
}

// 9. SmartKids Bundles Catalog Helper
function smartkidstoys_get_bundles() {
    return array(
        array(
            'id'             => 'bundle-1',
            'name'           => 'Little Builder Bundle',
            'description'    => 'Wooden Building Blocks (100 pcs) + 3D Animal Puzzle + Montessori Stacker.',
            'price'          => 3290,
            'original_price' => 4390,
            'savings'        => 1100,
            'age_range'      => '1-5 Years',
            'items_count'    => 3,
            'badge'          => 'Save Rs 1,100',
            'image'          => 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600'
        ),
        array(
            'id'             => 'bundle-2',
            'name'           => 'Creative Kids Bundle',
            'description'    => 'Rainbow Stacker + Magnetic Drawing Board + Animal Jigsaw Set.',
            'price'          => 2850,
            'original_price' => 3800,
            'savings'        => 950,
            'age_range'      => '3-8 Years',
            'items_count'    => 3,
            'badge'          => 'Save Rs 950',
            'image'          => 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600'
        ),
        array(
            'id'             => 'bundle-3',
            'name'           => 'STEM Learning Bundle',
            'description'    => '12-in-1 Solar Robot Kit + Science Logic Puzzle + Electric Train Set.',
            'price'          => 5490,
            'original_price' => 6890,
            'savings'        => 1400,
            'age_range'      => '5-8+ Years',
            'items_count'    => 3,
            'badge'          => 'Save Rs 1,400',
            'image'          => 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600'
        ),
        array(
            'id'             => 'bundle-4',
            'name'           => 'Birthday Mega Gift Bundle',
            'description'    => 'Cute Plush Bear + 4WD Monster Truck + Superhero Action Figure.',
            'price'          => 4950,
            'original_price' => 6200,
            'savings'        => 1250,
            'age_range'      => '3-8+ Years',
            'items_count'    => 3,
            'badge'          => 'Save Rs 1,250',
            'image'          => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'
        )
    );
}
