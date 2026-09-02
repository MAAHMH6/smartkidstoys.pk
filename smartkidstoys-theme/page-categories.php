<?php
/**
 * Template Name: Categories Directory
 * The template for displaying all 9 toy categories.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();

$categories = array(
    array(
        'name'  => 'Soft & Plush Toys',
        'desc'  => 'Super soft cuddly teddy bears, plush animals, and bedtime companions.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"/><circle cx="8" cy="6" r="3"/><circle cx="16" cy="6" r="3"/><circle cx="9.5" cy="12" r="1" fill="#EF4444"/><circle cx="14.5" cy="12" r="1" fill="#EF4444"/><path d="M12 14v1"/><path d="M10 16s1 1 2 1 2-1 2-1"/></svg>',
        'bg'    => '#FEE2E2',
        'count' => '45+ Toys',
        'slug'  => 'Soft+Toys'
    ),
    array(
        'name'  => 'Building Blocks & Sets',
        'desc'  => 'Natural wooden architectural blocks and colorful interlocking bricks.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
        'bg'    => '#EFF6FF',
        'count' => '32+ Toys',
        'slug'  => 'Building+Blocks'
    ),
    array(
        'name'  => 'STEM & Educational',
        'desc'  => 'Hands-on science kits, solar robotics, and Montessori developmental puzzles.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31a2 2 0 0 1-.37 1.17l-4.26 6.39A2 2 0 0 0 7.04 20h9.92a2 2 0 0 0 1.67-3.13l-4.26-6.39a2 2 0 0 1-.37-1.17V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="14" x2="17" y2="14"/></svg>',
        'bg'    => '#DCFCE7',
        'count' => '28+ Toys',
        'slug'  => 'Educational'
    ),
    array(
        'name'  => 'RC Vehicles & Trains',
        'desc'  => 'High-speed remote control cars, monster trucks, and classic electric railway sets.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="22" height="11" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><line x1="5" y1="9" x2="19" y2="9"/></svg>',
        'bg'    => '#FEF3C7',
        'count' => '50+ Toys',
        'slug'  => 'Vehicles'
    ),
    array(
        'name'  => 'Action Figures & Heroes',
        'desc'  => 'Articulated superheroes, poseable adventure characters, and collectibles.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/><path d="M18 10a6 6 0 0 1-12 0v-2"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>',
        'bg'    => '#F3E8FF',
        'count' => '40+ Toys',
        'slug'  => 'Action+Figures'
    ),
    array(
        'name'  => '3D Puzzles & Brain Games',
        'desc'  => 'Laser-cut wooden jigsaw puzzles, logic teasers, and family board games.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>',
        'bg'    => '#FCE7F3',
        'count' => '22+ Toys',
        'slug'  => 'Puzzles'
    ),
    array(
        'name'  => 'Outdoor & Sports Toys',
        'desc'  => 'Active play balls, bubble blasters, backyard playsets, and scooters.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
        'bg'    => '#E0F2FE',
        'count' => '18+ Toys',
        'slug'  => 'Outdoor+Toys'
    ),
    array(
        'name'  => 'Baby & Toddler Toys',
        'desc'  => 'Safe rattles, sensory teething rings, and musical interactive toys.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EAB308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
        'bg'    => '#FEF9C3',
        'count' => '25+ Toys',
        'slug'  => 'Baby+Toys'
    ),
    array(
        'name'  => 'Arts & Creative Crafts',
        'desc'  => 'Washable finger paints, DIY jewelry crafting sets, and modeling clay.',
        'svg'   => '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="#10B981"/><circle cx="17.5" cy="10.5" r=".5" fill="#10B981"/><circle cx="8.5" cy="7.5" r=".5" fill="#10B981"/><circle cx="6.5" cy="12.5" r=".5" fill="#10B981"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
        'bg'    => '#ECFDF5',
        'count' => '30+ Toys',
        'slug'  => 'Arts+Crafts'
    )
);
?>

<div class="container" style="padding: 40px 20px 80px;">
    
    <div style="text-align: center; max-width: 640px; margin: 0 auto 48px;">
        <h1 class="section-title-text" style="font-size: 2.2rem; margin-bottom: 8px;">Explore All <span>Toy Categories</span></h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
            From cuddly plushies to brain-boosting STEM sets, find the perfect toy designed for your child's age and passions.
        </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
        <?php foreach ( $categories as $cat ) : ?>
            <a href="<?php echo esc_url( home_url( '/shop?cat=' . $cat['slug'] ) ); ?>" class="demo-product-card" style="padding: 24px; text-decoration: none;">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 14px;">
                    <div style="width: 64px; height: 64px; border-radius: 50%; background: <?php echo esc_attr( $cat['bg'] ); ?>; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <?php echo $cat['svg']; ?>
                    </div>
                    <div>
                        <h2 style="font-size: 1.2rem; font-weight: 900; color: var(--dark-heading); margin-bottom: 2px;"><?php echo esc_html( $cat['name'] ); ?></h2>
                        <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary-blue);"><?php echo esc_html( $cat['count'] ); ?></span>
                    </div>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
                    <?php echo esc_html( $cat['desc'] ); ?>
                </p>
                <div style="margin-top: auto; display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 0.85rem; color: var(--primary-blue);">
                    <span>Browse Collection</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
            </a>
        <?php endforeach; ?>
    </div>

</div>

<?php
get_footer();
