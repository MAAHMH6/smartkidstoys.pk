<?php
/**
 * SmartKids Toys - WordPress Admin Dashboard Hub & Custom Post Types
 * Zero plugin dependency. Full CRUD for Products, Customers, and Orders.
 *
 * @package SmartKidsToys
 * @version 1.2.1
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// =========================================================================
// 1. REGISTER CUSTOM POST TYPES: PRODUCTS, CUSTOMERS & ORDERS
// =========================================================================

function smartkidstoys_register_admin_cpts() {
    
    // 1A. Products / Toys CPT (skt_toy)
    register_post_type( 'skt_toy', array(
        'labels' => array(
            'name'               => __( 'Toys Catalog', 'smartkidstoys' ),
            'singular_name'      => __( 'Toy Product', 'smartkidstoys' ),
            'menu_name'          => __( 'Toys Products', 'smartkidstoys' ),
            'all_items'          => __( 'All Products', 'smartkidstoys' ),
            'add_new'            => __( 'Add New Toy', 'smartkidstoys' ),
            'add_new_item'       => __( 'Add New Toy Product', 'smartkidstoys' ),
            'edit_item'          => __( 'Edit Toy Product', 'smartkidstoys' ),
            'new_item'           => __( 'New Toy Product', 'smartkidstoys' ),
            'view_item'          => __( 'View Toy Product', 'smartkidstoys' ),
            'search_items'       => __( 'Search Toys', 'smartkidstoys' ),
            'not_found'          => __( 'No toys found', 'smartkidstoys' ),
        ),
        'public'             => true,
        'has_archive'        => true,
        'show_in_menu'       => 'smartkidstoys-hub',
        'menu_icon'          => 'dashicons-products',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'rewrite'            => array( 'slug' => 'toy' ),
        'show_in_rest'       => true,
    ) );

    // Register Toy Category Taxonomy
    register_taxonomy( 'skt_toy_cat', 'skt_toy', array(
        'labels' => array(
            'name'              => __( 'Toy Categories', 'smartkidstoys' ),
            'singular_name'     => __( 'Toy Category', 'smartkidstoys' ),
            'search_items'      => __( 'Search Categories', 'smartkidstoys' ),
            'all_items'         => __( 'All Categories', 'smartkidstoys' ),
            'edit_item'         => __( 'Edit Category', 'smartkidstoys' ),
            'update_item'       => __( 'Update Category', 'smartkidstoys' ),
            'add_new_item'      => __( 'Add New Category', 'smartkidstoys' ),
            'new_item_name'     => __( 'New Category Name', 'smartkidstoys' ),
            'menu_name'         => __( 'Categories', 'smartkidstoys' ),
        ),
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'toy-category' ),
        'show_in_rest'      => true,
    ) );

    // 1B. Customers CRM CPT (skt_customer)
    register_post_type( 'skt_customer', array(
        'labels' => array(
            'name'               => __( 'Customers CRM', 'smartkidstoys' ),
            'singular_name'      => __( 'Customer', 'smartkidstoys' ),
            'menu_name'          => __( 'Customers CRM', 'smartkidstoys' ),
            'all_items'          => __( 'All Customers', 'smartkidstoys' ),
            'add_new'            => __( 'Add New Customer', 'smartkidstoys' ),
            'add_new_item'       => __( 'Add New Customer Profile', 'smartkidstoys' ),
            'edit_item'          => __( 'Edit Customer Profile', 'smartkidstoys' ),
            'search_items'       => __( 'Search Customers', 'smartkidstoys' ),
            'not_found'          => __( 'No customers found', 'smartkidstoys' ),
        ),
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => 'smartkidstoys-hub',
        'menu_icon'          => 'dashicons-groups',
        'supports'           => array( 'title' ),
        'capability_type'    => 'post',
    ) );

    // 1C. WhatsApp Orders CRM CPT (toy_order)
    register_post_type( 'toy_order', array(
        'labels' => array(
            'name'               => __( 'WhatsApp Orders', 'smartkidstoys' ),
            'singular_name'      => __( 'WhatsApp Order', 'smartkidstoys' ),
            'menu_name'          => __( 'Orders CRM', 'smartkidstoys' ),
            'all_items'          => __( 'All Orders', 'smartkidstoys' ),
            'add_new'            => __( 'Create Order', 'smartkidstoys' ),
            'add_new_item'       => __( 'Create Manual Order', 'smartkidstoys' ),
            'edit_item'          => __( 'Order Details', 'smartkidstoys' ),
            'search_items'       => __( 'Search Orders', 'smartkidstoys' ),
            'not_found'          => __( 'No orders found', 'smartkidstoys' ),
        ),
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => 'smartkidstoys-hub',
        'menu_icon'          => 'dashicons-cart',
        'supports'           => array( 'title' ),
        'capability_type'    => 'post',
    ) );
}
add_action( 'init', 'smartkidstoys_register_admin_cpts' );


// =========================================================================
// 2. ADMIN MENU: SMARTKIDS TOYS STORE HUB
// =========================================================================

function smartkidstoys_add_admin_menu_pages() {
    // Top-Level Store Hub
    add_menu_page(
        __( 'SmartKids Store Hub', 'smartkidstoys' ),
        __( 'SmartKids Hub', 'smartkidstoys' ),
        'manage_options',
        'smartkidstoys-hub',
        'smartkidstoys_render_hub_dashboard',
        'dashicons-store',
        2
    );

    // Submenu: Store Overview
    add_submenu_page(
        'smartkidstoys-hub',
        __( 'Store Analytics & Overview', 'smartkidstoys' ),
        __( 'Dashboard Overview', 'smartkidstoys' ),
        'manage_options',
        'smartkidstoys-hub',
        'smartkidstoys_render_hub_dashboard'
    );
}
add_action( 'admin_menu', 'smartkidstoys_add_admin_menu_pages' );


// =========================================================================
// 3. STORE HUB DASHBOARD OVERVIEW PAGE
// =========================================================================

function smartkidstoys_render_hub_dashboard() {
    // Calculate store metrics
    $orders_count_obj = wp_count_posts( 'toy_order' );
    $total_orders = isset( $orders_count_obj->publish ) ? intval( $orders_count_obj->publish ) : 0;

    $customers_count_obj = wp_count_posts( 'skt_customer' );
    $total_customers = isset( $customers_count_obj->publish ) ? intval( $customers_count_obj->publish ) : 0;

    $toys_count_obj = wp_count_posts( 'skt_toy' );
    $total_toys = isset( $toys_count_obj->publish ) ? intval( $toys_count_obj->publish ) : 0;

    // Calculate total revenue and pending orders
    $all_orders = get_posts( array(
        'post_type'      => 'toy_order',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ) );

    $total_revenue = 0;
    $pending_orders = 0;
    $confirmed_orders = 0;
    $delivered_orders = 0;

    if ( ! empty( $all_orders ) && is_array( $all_orders ) ) {
        foreach ( $all_orders as $ord ) {
            $tot = floatval( get_post_meta( $ord->ID, 'order_total', true ) );
            $st  = get_post_meta( $ord->ID, 'order_status', true ) ?: 'pending';
            $total_revenue += $tot;

            if ( $st === 'pending' ) {
                $pending_orders++;
            } elseif ( $st === 'confirmed' ) {
                $confirmed_orders++;
            } elseif ( $st === 'delivered' ) {
                $delivered_orders++;
            }
        }
    }

    $recent_orders = ( ! empty( $all_orders ) && is_array( $all_orders ) ) ? array_slice( $all_orders, 0, 8 ) : array();
    ?>
    <div class="wrap" style="max-width: 1200px; margin-top: 20px;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0284C7, #0369A1); color: white; padding: 28px 32px; border-radius: 12px; box-shadow: 0 4px 15px rgba(2,132,199,0.2); margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
                <h1 style="color: white; font-size: 1.8rem; font-weight: 900; margin: 0 0 6px;">SmartKids Toys Store Hub</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 0.95rem;">
                    Live Store Operations, Orders Pipeline, Customer Profiles &amp; Catalog Management.
                </p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=skt_toy' ) ); ?>" class="button button-primary" style="background: #10B981; border-color: #10B981; font-weight: bold; padding: 6px 14px; height: auto;">+ Add New Toy</a>
                <a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=toy_order' ) ); ?>" class="button button-primary" style="background: #F59E0B; border-color: #F59E0B; font-weight: bold; padding: 6px 14px; height: auto;">+ Create Manual Order</a>
                <a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=skt_customer' ) ); ?>" class="button button-secondary" style="font-weight: bold; padding: 6px 14px; height: auto;">+ Add Customer</a>
            </div>
        </div>

        <!-- Metrics Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin-bottom: 28px;">
            
            <!-- Revenue -->
            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <span style="font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Total Sales Volume</span>
                <div style="font-size: 1.7rem; font-weight: 900; color: #0284C7; margin: 8px 0 4px;">PKR <?php echo number_format( $total_revenue ); ?></div>
                <span style="font-size: 0.8rem; color: #10B981; font-weight: 600;">Direct WhatsApp &amp; Online Orders</span>
            </div>

            <!-- Orders Count -->
            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <span style="font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Total Orders</span>
                <div style="font-size: 1.7rem; font-weight: 900; color: #0F172A; margin: 8px 0 4px;"><?php echo esc_html( $total_orders ); ?></div>
                <span style="font-size: 0.8rem; color: #F59E0B; font-weight: 700;"><?php echo esc_html( $pending_orders ); ?> Pending Confirmation</span>
            </div>

            <!-- Customers Count -->
            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <span style="font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Active Customers</span>
                <div style="font-size: 1.7rem; font-weight: 900; color: #0F172A; margin: 8px 0 4px;"><?php echo esc_html( $total_customers ); ?></div>
                <span style="font-size: 0.8rem; color: #0284C7; font-weight: 600;">Registered in CRM</span>
            </div>

            <!-- Catalog Toys -->
            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <span style="font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Products in Catalog</span>
                <div style="font-size: 1.7rem; font-weight: 900; color: #0F172A; margin: 8px 0 4px;"><?php echo ( $total_toys > 0 ? esc_html( $total_toys ) : '8 (Sample Demo)' ); ?></div>
                <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=skt_toy' ) ); ?>" style="font-size: 0.8rem; color: #0284C7; font-weight: 700; text-decoration: none;">Manage Catalog &rarr;</a>
            </div>

        </div>

        <!-- Recent Orders Table -->
        <div style="background: white; border: 1px solid #E2E8F0; border-radius: 10px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h2 style="font-size: 1.2rem; font-weight: 800; margin: 0;">Recent WhatsApp Orders</h2>
                <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=toy_order' ) ); ?>" class="button" style="font-weight: 600;">View All Orders</a>
            </div>

            <?php if ( ! empty( $recent_orders ) ) : ?>
                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th style="font-weight: 800;">Order ID</th>
                            <th style="font-weight: 800;">Customer</th>
                            <th style="font-weight: 800;">Phone / WhatsApp</th>
                            <th style="font-weight: 800;">City</th>
                            <th style="font-weight: 800;">Total (PKR)</th>
                            <th style="font-weight: 800;">Status</th>
                            <th style="font-weight: 800;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ( $recent_orders as $o ) : 
                            $ord_num = get_post_meta( $o->ID, 'order_number', true ) ?: get_the_title( $o->ID );
                            $c_name  = get_post_meta( $o->ID, 'order_customer_name', true ) ?: 'Customer';
                            $c_phone = get_post_meta( $o->ID, 'order_phone', true );
                            $c_city  = get_post_meta( $o->ID, 'order_city', true ) ?: 'N/A';
                            $c_tot   = floatval( get_post_meta( $o->ID, 'order_total', true ) );
                            $c_stat  = get_post_meta( $o->ID, 'order_status', true ) ?: 'pending';

                            $stat_bg = ( $c_stat === 'delivered' ) ? '#10B981' : ( ( $c_stat === 'confirmed' ) ? '#0284C7' : '#F59E0B' );
                            $clean_phone = preg_replace( '/\D/', '', $c_phone );
                        ?>
                            <tr>
                                <td>
                                    <strong><a href="<?php echo esc_url( get_edit_post_link( $o->ID ) ); ?>"><?php echo esc_html( $ord_num ); ?></a></strong>
                                </td>
                                <td><?php echo esc_html( $c_name ); ?></td>
                                <td><?php echo esc_html( $c_phone ?: 'N/A' ); ?></td>
                                <td><?php echo esc_html( $c_city ); ?></td>
                                <td><strong>PKR <?php echo number_format( $c_tot ); ?></strong></td>
                                <td>
                                    <span style="background: <?php echo esc_attr( $stat_bg ); ?>; color: white; padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                                        <?php echo esc_html( $c_stat ); ?>
                                    </span>
                                </td>
                                <td>
                                    <?php if ( $clean_phone ) : ?>
                                        <a href="https://wa.me/<?php echo esc_attr( $clean_phone ); ?>?text=<?php echo urlencode( "Hello {$c_name}! Update regarding your SmartKids Toys order #{$ord_num}:" ); ?>" target="_blank" class="button button-small" style="background: #25D366; color: white; border-color: #25D366; font-weight: bold;">
                                            WhatsApp
                                        </a>
                                    <?php endif; ?>
                                    <a href="<?php echo esc_url( get_edit_post_link( $o->ID ) ); ?>" class="button button-small">Edit</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else : ?>
                <div style="text-align: center; padding: 40px 20px; color: #64748B;">
                    <p style="font-size: 1rem; margin-bottom: 12px;">No customer orders placed yet.</p>
                    <a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=toy_order' ) ); ?>" class="button button-primary">+ Create First Order</a>
                </div>
            <?php endif; ?>
        </div>

    </div>
    <?php
}


// =========================================================================
// 4. TOY PRODUCTS: META BOXES & ADMIN COLUMNS
// =========================================================================

function smartkidstoys_add_toy_meta_boxes() {
    add_meta_box(
        'skt_toy_pricing_meta',
        __( 'Toy Pricing, Stock & Promo Badges', 'smartkidstoys' ),
        'smartkidstoys_render_toy_meta_box',
        'skt_toy',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'smartkidstoys_add_toy_meta_boxes' );

function smartkidstoys_render_toy_meta_box( $post ) {
    $price       = get_post_meta( $post->ID, 'toy_price', true );
    $old_price   = get_post_meta( $post->ID, 'toy_old_price', true );
    $badge       = get_post_meta( $post->ID, 'toy_badge', true );
    $rating      = get_post_meta( $post->ID, 'toy_rating', true ) ?: '4.9';
    $reviews     = get_post_meta( $post->ID, 'toy_reviews', true ) ?: '84';
    $is_deal     = get_post_meta( $post->ID, 'toy_is_deal', true );
    $is_new      = get_post_meta( $post->ID, 'toy_is_new', true );
    $stock_st    = get_post_meta( $post->ID, 'toy_stock_status', true ) ?: 'instock';
    wp_nonce_field( 'skt_toy_save_nonce', 'skt_toy_nonce' );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="toy_price"><?php _e( 'Price (PKR) *', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="number" name="toy_price" id="toy_price" value="<?php echo esc_attr( $price ); ?>" class="regular-text" required placeholder="e.g. 1750" />
            </td>
        </tr>
        <tr>
            <th><label for="toy_old_price"><?php _e( 'Regular / Old Price (PKR)', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="number" name="toy_old_price" id="toy_old_price" value="<?php echo esc_attr( $old_price ); ?>" class="regular-text" placeholder="e.g. 2500 (Shown with strike-through)" />
            </td>
        </tr>
        <tr>
            <th><label for="toy_badge"><?php _e( 'Promo Badge Tag', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="text" name="toy_badge" id="toy_badge" value="<?php echo esc_attr( $badge ); ?>" class="regular-text" placeholder="e.g. 30% OFF, NEW, HOT DEAL, BESTSELLER" />
            </td>
        </tr>
        <tr>
            <th><label for="toy_stock_status"><?php _e( 'Stock Availability', 'smartkidstoys' ); ?></label></th>
            <td>
                <select name="toy_stock_status" id="toy_stock_status">
                    <option value="instock" <?php selected( $stock_st, 'instock' ); ?>>In Stock Ready</option>
                    <option value="outofstock" <?php selected( $stock_st, 'outofstock' ); ?>>Out of Stock</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label><?php _e( 'Special Collections', 'smartkidstoys' ); ?></label></th>
            <td>
                <label style="margin-right: 20px;">
                    <input type="checkbox" name="toy_is_deal" value="1" <?php checked( $is_deal, '1' ); ?> />
                    <?php _e( 'Show in Special Deals page', 'smartkidstoys' ); ?>
                </label>
                <label>
                    <input type="checkbox" name="toy_is_new" value="1" <?php checked( $is_new, '1' ); ?> />
                    <?php _e( 'Show in New Arrivals page', 'smartkidstoys' ); ?>
                </label>
            </td>
        </tr>
        <tr>
            <th><label for="toy_rating"><?php _e( 'Rating & Reviews Count', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="text" name="toy_rating" id="toy_rating" value="<?php echo esc_attr( $rating ); ?>" style="width: 80px;" placeholder="4.9" /> Rating &nbsp;&nbsp;
                <input type="number" name="toy_reviews" id="toy_reviews" value="<?php echo esc_attr( $reviews ); ?>" style="width: 100px;" placeholder="84" /> Reviews
            </td>
        </tr>
    </table>
    <?php
}

function smartkidstoys_save_toy_meta( $post_id ) {
    if ( ! isset( $_POST['skt_toy_nonce'] ) || ! wp_verify_nonce( $_POST['skt_toy_nonce'], 'skt_toy_save_nonce' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    $fields = array( 'toy_price', 'toy_old_price', 'toy_badge', 'toy_rating', 'toy_reviews', 'toy_stock_status' );
    foreach ( $fields as $f ) {
        if ( isset( $_POST[ $f ] ) ) {
            update_post_meta( $post_id, $f, sanitize_text_field( $_POST[ $f ] ) );
        }
    }

    update_post_meta( $post_id, 'toy_is_deal', isset( $_POST['toy_is_deal'] ) ? '1' : '0' );
    update_post_meta( $post_id, 'toy_is_new', isset( $_POST['toy_is_new'] ) ? '1' : '0' );
}
add_action( 'save_post_skt_toy', 'smartkidstoys_save_toy_meta' );

// Product Admin Columns
function smartkidstoys_toy_columns( $columns ) {
    $new_columns = array();
    $new_columns['cb']          = '<input type="checkbox" />';
    $new_columns['toy_thumb']   = __( 'Image', 'smartkidstoys' );
    $new_columns['title']       = __( 'Toy Name', 'smartkidstoys' );
    $new_columns['taxonomy-skt_toy_cat'] = __( 'Category', 'smartkidstoys' );
    $new_columns['toy_price']   = __( 'Price (PKR)', 'smartkidstoys' );
    $new_columns['toy_badge']   = __( 'Badge', 'smartkidstoys' );
    $new_columns['toy_stock']   = __( 'Stock', 'smartkidstoys' );
    $new_columns['date']        = __( 'Date Added', 'smartkidstoys' );
    return $new_columns;
}
add_filter( 'manage_skt_toy_posts_columns', 'smartkidstoys_toy_columns' );

function smartkidstoys_toy_column_content( $column, $post_id ) {
    switch ( $column ) {
        case 'toy_thumb':
            if ( has_post_thumbnail( $post_id ) ) {
                echo get_the_post_thumbnail( $post_id, array( 50, 50 ), array( 'style' => 'border-radius: 6px; object-fit: cover;' ) );
            } else {
                echo '<span style="display:inline-block; width:50px; height:50px; background:#E2E8F0; border-radius:6px; text-align:center; line-height:50px; font-size:10px; color:#64748B;">No Pic</span>';
            }
            break;
        case 'toy_price':
            $p   = get_post_meta( $post_id, 'toy_price', true );
            $old = get_post_meta( $post_id, 'toy_old_price', true );
            echo '<strong>PKR ' . number_format( (float)$p ) . '</strong>';
            if ( $old ) {
                echo '<br><small style="color:#94A3B8; text-decoration:line-through;">PKR ' . number_format( (float)$old ) . '</small>';
            }
            break;
        case 'toy_badge':
            $b = get_post_meta( $post_id, 'toy_badge', true );
            if ( $b ) {
                echo '<span style="background:#EF4444; color:white; padding:2px 8px; border-radius:10px; font-size:10px; font-weight:bold;">' . esc_html( $b ) . '</span>';
            } else {
                echo '-';
            }
            break;
        case 'toy_stock':
            $st = get_post_meta( $post_id, 'toy_stock_status', true ) ?: 'instock';
            if ( $st === 'instock' ) {
                echo '<span style="color:#10B981; font-weight:bold;">In Stock</span>';
            } else {
                echo '<span style="color:#EF4444; font-weight:bold;">Out of Stock</span>';
            }
            break;
    }
}
add_action( 'manage_skt_toy_posts_custom_column', 'smartkidstoys_toy_column_content', 10, 2 );


// =========================================================================
// 5. CUSTOMERS CRM: META BOXES & ADMIN COLUMNS
// =========================================================================

function smartkidstoys_add_customer_meta_boxes() {
    add_meta_box(
        'skt_customer_details_meta',
        __( 'Customer Profile & Contact Details', 'smartkidstoys' ),
        'smartkidstoys_render_customer_meta_box',
        'skt_customer',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'smartkidstoys_add_customer_meta_boxes' );

function smartkidstoys_render_customer_meta_box( $post ) {
    $cus_num = get_post_meta( $post->ID, 'customer_number', true );
    $phone   = get_post_meta( $post->ID, 'customer_phone', true );
    $email   = get_post_meta( $post->ID, 'customer_email', true );
    $city    = get_post_meta( $post->ID, 'customer_city', true );
    $address = get_post_meta( $post->ID, 'customer_address', true );
    $orders  = get_post_meta( $post->ID, 'customer_orders_count', true ) ?: '1';
    $spent   = get_post_meta( $post->ID, 'customer_total_spent', true ) ?: '0';
    wp_nonce_field( 'skt_customer_save_nonce', 'skt_customer_nonce' );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="customer_number"><?php _e( 'Customer ID', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="text" name="customer_number" id="customer_number" value="<?php echo esc_attr( $cus_num ?: 'SKT-CUS-' . str_pad( $post->ID, 4, '0', STR_PAD_LEFT ) ); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="customer_phone"><?php _e( 'WhatsApp / Phone Number *', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="text" name="customer_phone" id="customer_phone" value="<?php echo esc_attr( $phone ); ?>" class="regular-text" required placeholder="03XX XXXXXXX" />
            </td>
        </tr>
        <tr>
            <th><label for="customer_email"><?php _e( 'Email Address', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="email" name="customer_email" id="customer_email" value="<?php echo esc_attr( $email ); ?>" class="regular-text" placeholder="customer@example.com" />
            </td>
        </tr>
        <tr>
            <th><label for="customer_city"><?php _e( 'City', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="text" name="customer_city" id="customer_city" value="<?php echo esc_attr( $city ); ?>" class="regular-text" placeholder="Lahore, Karachi, Islamabad..." />
            </td>
        </tr>
        <tr>
            <th><label for="customer_address"><?php _e( 'Delivery Address', 'smartkidstoys' ); ?></label></th>
            <td>
                <textarea name="customer_address" id="customer_address" rows="3" class="large-text"><?php echo esc_textarea( $address ); ?></textarea>
            </td>
        </tr>
        <tr>
            <th><label><?php _e( 'Orders History', 'smartkidstoys' ); ?></label></th>
            <td>
                <input type="number" name="customer_orders_count" value="<?php echo esc_attr( $orders ); ?>" style="width: 80px;" /> Orders Placed &nbsp;&nbsp;
                <input type="number" name="customer_total_spent" value="<?php echo esc_attr( $spent ); ?>" style="width: 120px;" /> Total Spent (PKR)
            </td>
        </tr>
    </table>
    <?php
}

function smartkidstoys_save_customer_meta( $post_id ) {
    if ( ! isset( $_POST['skt_customer_nonce'] ) || ! wp_verify_nonce( $_POST['skt_customer_nonce'], 'skt_customer_save_nonce' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    $fields = array( 'customer_number', 'customer_phone', 'customer_email', 'customer_city', 'customer_address', 'customer_orders_count', 'customer_total_spent' );
    foreach ( $fields as $f ) {
        if ( isset( $_POST[ $f ] ) ) {
            update_post_meta( $post_id, $f, sanitize_text_field( $_POST[ $f ] ) );
        }
    }
}
add_action( 'save_post_skt_customer', 'smartkidstoys_save_customer_meta' );

// Customer Admin Columns
function smartkidstoys_customer_columns( $columns ) {
    return array(
        'cb'            => '<input type="checkbox" />',
        'cus_id'        => __( 'Customer ID', 'smartkidstoys' ),
        'title'         => __( 'Customer Name', 'smartkidstoys' ),
        'phone'         => __( 'Phone / WhatsApp', 'smartkidstoys' ),
        'city'          => __( 'City', 'smartkidstoys' ),
        'orders_count'  => __( 'Orders', 'smartkidstoys' ),
        'total_spent'   => __( 'Total Spent (PKR)', 'smartkidstoys' ),
        'actions'       => __( 'Direct Action', 'smartkidstoys' ),
        'date'          => __( 'Registered', 'smartkidstoys' ),
    );
}
add_filter( 'manage_skt_customer_posts_columns', 'smartkidstoys_customer_columns' );

function smartkidstoys_customer_column_content( $column, $post_id ) {
    $cid   = get_post_meta( $post_id, 'customer_number', true ) ?: 'SKT-CUS-' . str_pad( $post_id, 4, '0', STR_PAD_LEFT );
    $phone = get_post_meta( $post_id, 'customer_phone', true );
    $name  = get_the_title( $post_id );
    $city  = get_post_meta( $post_id, 'customer_city', true );
    $ord   = get_post_meta( $post_id, 'customer_orders_count', true ) ?: '1';
    $spent = get_post_meta( $post_id, 'customer_total_spent', true ) ?: '0';

    switch ( $column ) {
        case 'cus_id':
            echo '<code>' . esc_html( $cid ) . '</code>';
            break;
        case 'phone':
            echo esc_html( $phone ?: 'N/A' );
            break;
        case 'city':
            echo esc_html( $city ?: 'Lahore' );
            break;
        case 'orders_count':
            echo '<span style="background:#EFF6FF; color:#0284C7; padding:2px 8px; border-radius:10px; font-weight:bold;">' . intval( $ord ) . '</span>';
            break;
        case 'total_spent':
            echo '<strong>PKR ' . number_format( (float)$spent ) . '</strong>';
            break;
        case 'actions':
            if ( $phone ) {
                $clean_phone = preg_replace( '/\D/', '', $phone );
                echo '<a href="https://wa.me/' . esc_attr( $clean_phone ) . '?text=' . urlencode( "Hello {$name}! Welcome to SmartKids Toys Pakistan:" ) . '" target="_blank" class="button button-small" style="background:#25D366; color:white; border-color:#25D366; font-weight:bold;">WhatsApp</a>';
            }
            break;
    }
}
add_action( 'manage_skt_customer_posts_custom_column', 'smartkidstoys_customer_column_content', 10, 2 );


// =========================================================================
// 6. ORDERS CRM: META BOXES & ADMIN COLUMNS
// =========================================================================

function smartkidstoys_add_order_meta_box() {
    add_meta_box(
        'skt_order_details',
        __( 'WhatsApp Order Details & Items', 'smartkidstoys' ),
        'smartkidstoys_render_order_meta_box',
        'toy_order',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'smartkidstoys_add_order_meta_box' );

function smartkidstoys_render_order_meta_box( $post ) {
    $name     = get_post_meta( $post->ID, 'order_customer_name', true );
    $phone    = get_post_meta( $post->ID, 'order_phone', true );
    $city     = get_post_meta( $post->ID, 'order_city', true );
    $address  = get_post_meta( $post->ID, 'order_address', true );
    $total    = get_post_meta( $post->ID, 'order_total', true );
    $status   = get_post_meta( $post->ID, 'order_status', true ) ?: 'pending';
    $items    = get_post_meta( $post->ID, 'order_items_json', true );
    wp_nonce_field( 'skt_order_save_nonce', 'skt_order_nonce' );
    ?>
    <table class="form-table">
        <tr>
            <th><label><?php _e( 'Customer Name', 'smartkidstoys' ); ?></label></th>
            <td><input type="text" name="order_customer_name" value="<?php echo esc_attr( $name ); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label><?php _e( 'Phone / WhatsApp', 'smartkidstoys' ); ?></label></th>
            <td><input type="text" name="order_phone" value="<?php echo esc_attr( $phone ); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label><?php _e( 'City', 'smartkidstoys' ); ?></label></th>
            <td><input type="text" name="order_city" value="<?php echo esc_attr( $city ); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label><?php _e( 'Delivery Address', 'smartkidstoys' ); ?></label></th>
            <td><textarea name="order_address" rows="3" class="large-text"><?php echo esc_textarea( $address ); ?></textarea></td>
        </tr>
        <tr>
            <th><label><?php _e( 'Order Total (PKR)', 'smartkidstoys' ); ?></label></th>
            <td><input type="number" name="order_total" value="<?php echo esc_attr( $total ); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label><?php _e( 'Pipeline Status', 'smartkidstoys' ); ?></label></th>
            <td>
                <select name="order_status">
                    <option value="pending" <?php selected( $status, 'pending' ); ?>>Pending Confirmation</option>
                    <option value="confirmed" <?php selected( $status, 'confirmed' ); ?>>Confirmed &amp; Dispatched</option>
                    <option value="delivered" <?php selected( $status, 'delivered' ); ?>>Delivered Successfully</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label><?php _e( 'Ordered Items (JSON)', 'smartkidstoys' ); ?></label></th>
            <td><textarea name="order_items_json" rows="4" class="large-text"><?php echo esc_textarea( $items ); ?></textarea></td>
        </tr>
    </table>
    <?php
}

function smartkidstoys_save_order_meta( $post_id ) {
    if ( ! isset( $_POST['skt_order_nonce'] ) || ! wp_verify_nonce( $_POST['skt_order_nonce'], 'skt_order_save_nonce' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    $fields = array( 'order_customer_name', 'order_phone', 'order_city', 'order_address', 'order_total', 'order_status', 'order_items_json' );
    foreach ( $fields as $f ) {
        if ( isset( $_POST[ $f ] ) ) {
            update_post_meta( $post_id, $f, sanitize_text_field( $_POST[ $f ] ) );
        }
    }
}
add_action( 'save_post_toy_order', 'smartkidstoys_save_order_meta' );

// Orders Admin Columns
function smartkidstoys_order_columns( $columns ) {
    return array(
        'cb'            => '<input type="checkbox" />',
        'title'         => __( 'Order Number', 'smartkidstoys' ),
        'customer'      => __( 'Customer Name', 'smartkidstoys' ),
        'phone'         => __( 'Phone / WhatsApp', 'smartkidstoys' ),
        'city'          => __( 'City', 'smartkidstoys' ),
        'total'         => __( 'Total (PKR)', 'smartkidstoys' ),
        'order_status'  => __( 'Status', 'smartkidstoys' ),
        'actions'       => __( 'Direct Action', 'smartkidstoys' ),
        'date'          => __( 'Order Date', 'smartkidstoys' ),
    );
}
add_filter( 'manage_toy_order_posts_columns', 'smartkidstoys_order_columns' );

function smartkidstoys_order_column_content( $column, $post_id ) {
    $phone   = get_post_meta( $post_id, 'order_phone', true );
    $name    = get_post_meta( $post_id, 'order_customer_name', true );
    $city    = get_post_meta( $post_id, 'order_city', true );
    $total   = get_post_meta( $post_id, 'order_total', true );
    $status  = get_post_meta( $post_id, 'order_status', true ) ?: 'pending';
    $ord_num = get_post_meta( $post_id, 'order_number', true ) ?: get_the_title( $post_id );

    switch ( $column ) {
        case 'customer':
            echo esc_html( $name ?: 'N/A' );
            break;
        case 'phone':
            echo esc_html( $phone ?: 'N/A' );
            break;
        case 'city':
            echo esc_html( $city ?: 'Lahore' );
            break;
        case 'total':
            echo '<strong>PKR ' . number_format( (float)$total ) . '</strong>';
            break;
        case 'order_status':
            $badge_color = ( $status === 'delivered' ) ? '#10B981' : ( ( $status === 'confirmed' ) ? '#0284C7' : '#F59E0B' );
            echo '<span style="background:' . esc_attr( $badge_color ) . '; color:white; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:11px; text-transform:uppercase;">' . esc_html( $status ) . '</span>';
            break;
        case 'actions':
            if ( $phone ) {
                $clean_phone = preg_replace( '/\D/', '', $phone );
                $wa_url = 'https://wa.me/' . $clean_phone . '?text=' . urlencode( "Hello {$name}! Update regarding your SmartKids Toys order #{$ord_num}:" );
                echo '<a href="' . esc_url( $wa_url ) . '" target="_blank" style="background:#25D366; color:white; padding:4px 8px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:11px; display:inline-flex; align-items:center; gap:4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> WhatsApp</a>';
            }
            break;
    }
}
add_action( 'manage_toy_order_posts_custom_column', 'smartkidstoys_order_column_content', 10, 2 );


// =========================================================================
// 7. AUTO-SYNC CUSTOMER ON CHECKOUT / ORDER PLACEMENT
// =========================================================================

function smartkidstoys_sync_customer_record( $name, $phone, $city, $address, $order_total ) {
    if ( empty( $phone ) ) return;

    // Check if customer already exists with this phone
    $existing = get_posts( array(
        'post_type'      => 'skt_customer',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
        'meta_query'     => array(
            array(
                'key'     => 'customer_phone',
                'value'   => $phone,
                'compare' => 'LIKE',
            ),
        ),
    ) );

    if ( ! empty( $existing ) && is_array( $existing ) ) {
        $cid = $existing[0]->ID;
        $prev_orders = intval( get_post_meta( $cid, 'customer_orders_count', true ) ?: 0 );
        $prev_spent  = floatval( get_post_meta( $cid, 'customer_total_spent', true ) ?: 0 );

        update_post_meta( $cid, 'customer_orders_count', $prev_orders + 1 );
        update_post_meta( $cid, 'customer_total_spent', $prev_spent + floatval( $order_total ) );
        if ( ! empty( $city ) ) update_post_meta( $cid, 'customer_city', $city );
        if ( ! empty( $address ) ) update_post_meta( $cid, 'customer_address', $address );
    } else {
        // Create new customer
        $all_customers = wp_count_posts( 'skt_customer' );
        $count = isset( $all_customers->publish ) ? intval( $all_customers->publish ) + 1 : 1;
        $formatted_id = 'SKT-CUS-' . str_pad( $count, 4, '0', STR_PAD_LEFT );

        $new_cid = wp_insert_post( array(
            'post_type'   => 'skt_customer',
            'post_title'  => $name,
            'post_status' => 'publish',
        ) );

        if ( $new_cid && ! is_wp_error( $new_cid ) ) {
            update_post_meta( $new_cid, 'customer_number', $formatted_id );
            update_post_meta( $new_cid, 'customer_phone', $phone );
            update_post_meta( $new_cid, 'customer_city', $city );
            update_post_meta( $new_cid, 'customer_address', $address );
            update_post_meta( $new_cid, 'customer_orders_count', 1 );
            update_post_meta( $new_cid, 'customer_total_spent', floatval( $order_total ) );
        }
    }
}
