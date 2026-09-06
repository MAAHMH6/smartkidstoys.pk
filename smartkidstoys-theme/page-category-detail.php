<?php
/**
 * Template Name: Category Detail Page
 * Dedicated SEO landing page for individual toy categories.
 *
 * @package SmartKidsToys
 * @version 1.5.0
 */

get_header();

// 1. Extract category slug from URL
$request_uri = trim( parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ), '/' );
$home_path   = trim( parse_url( home_url(), PHP_URL_PATH ), '/' );
if ( ! empty( $home_path ) && strpos( $request_uri, $home_path ) === 0 ) {
    $request_uri = trim( substr( $request_uri, strlen( $home_path ) ), '/' );
}
$segments = explode( '/', $request_uri );
$slug = ( isset( $segments[0] ) && $segments[0] === 'category' && isset( $segments[1] ) ) ? sanitize_title( $segments[1] ) : ( isset( $_GET['cat_slug'] ) ? sanitize_title( $_GET['cat_slug'] ) : 'educational' );

// 2. Category metadata dictionary
$category_definitions = array(
    'baby-toddler' => array(
        'name' => 'Baby & Toddler',
        'title' => 'Baby & Toddler Toys Online in Pakistan | Smart Kids Toys',
        'description' => 'Shop safe, non-toxic baby toys and toddler learning sets in Pakistan. Fast delivery in Karachi, Lahore, Islamabad, and nationwide.',
        'content' => 'Welcome to our curated Baby & Toddler collection. Every toy in this collection is crafted from child-safe, non-toxic BPA-free materials with smooth edges. Stimulate cognitive growth and motor skills during the crucial first 1,000 days of childhood.'
    ),
    'educational' => array(
        'name' => 'Educational',
        'title' => 'Educational & STEM Toys for Kids in Pakistan | Smart Kids Toys',
        'description' => 'Discover STEM building sets, science experiment kits, and Montessori learning toys in Pakistan. Boost creativity and problem-solving skills.',
        'content' => 'Fuel curiosity with Pakistan\'s premier selection of educational and STEM toys. Our interactive learning range blends entertainment with fundamental learning pillars—Science, Technology, Engineering, and Mathematics.'
    ),
    'action-figures' => array(
        'name' => 'Action Figures',
        'title' => 'Action Figures & Superheroes Toys Pakistan | Smart Kids Toys',
        'description' => 'Buy high-quality superhero action figures, anime collectibles, and articulated toy sets in Pakistan. Cash on delivery available.',
        'content' => 'Bring mythical battles and heroic quests to life! Our action figures collection includes beloved superheroes, transforming robots, and poseable warriors built with durable, impact-resistant materials.'
    ),
    'dolls-playsets' => array(
        'name' => 'Dolls & Playsets',
        'title' => 'Dolls, Dollhouses & Pretend Playsets in Pakistan | Smart Kids Toys',
        'description' => 'Shop fashion dolls, doll accessories, kitchen sets, and doctor playsets in Pakistan. Encourage empathy and imaginative role play.',
        'content' => 'Inspire empathy, storytelling, and social creativity with our enchanting dolls and playsets. From realistic dolls to pretend kitchen cooktops and medical doctor kits.'
    ),
    'vehicles-track-sets' => array(
        'name' => 'Vehicles & Track Sets',
        'title' => 'Toy Cars, Racing Tracks & Monster Trucks Pakistan | Smart Kids Toys',
        'description' => 'Order high-speed racing track sets, die-cast toy cars, and construction vehicles in Pakistan. Premium quality and exciting races guaranteed.',
        'content' => 'Start your engines for heart-pounding racing excitement! Our vehicles and track sets category features precision die-cast model cars, gravitational loop racetracks, and rugged construction cranes.'
    ),
    'remote-control' => array(
        'name' => 'Remote Control',
        'title' => 'Remote Control RC Cars, Drones & Helicopters Pakistan | Smart Kids Toys',
        'description' => 'Buy rechargeable high-speed RC cars, 4x4 rock crawlers, and stunt drones in Pakistan. Responsive controls with rechargeable battery packs.',
        'content' => 'Experience extreme radio-controlled thrills! Discover our powerful 2.4GHz remote control vehicles, designed for zero-interference racing, high-traction 4WD rock climbing, and 360-degree stunt flips.'
    ),
    'puzzles-games' => array(
        'name' => 'Puzzles & Games',
        'title' => 'Kids Puzzles & Family Board Games Pakistan | Smart Kids Toys',
        'description' => 'Shop jigsaw puzzles, 3D brain teasers, and fun family board games in Pakistan. Enhance memory, focus, and logic for all ages.',
        'content' => 'Gather the family for brain-boosting game nights! From colorful wooden jigsaw puzzles for preschoolers to intricate 3D architectural models and classic strategy board games.'
    ),
    'outdoor-sports' => array(
        'name' => 'Outdoor & Sports',
        'title' => 'Outdoor Toys, Scooters & Sports Gear Pakistan | Smart Kids Toys',
        'description' => 'Explore active outdoor toys, 3-wheel kick scooters, soccer goals, and play tents for kids in Pakistan. Keep children healthy and active.',
        'content' => 'Encourage healthy, active outdoor play with our premium outdoor and sports toys. Featuring adjustable LED-wheel kick scooters, foldable garden play tents, and safe active gear.'
    )
);

$cat_meta = isset( $category_definitions[ $slug ] ) ? $category_definitions[ $slug ] : array(
    'name' => ucwords( str_replace( '-', ' ', $slug ) ),
    'title' => ucwords( str_replace( '-', ' ', $slug ) ) . ' Toys Online Pakistan | Smart Kids Toys',
    'description' => 'Explore quality toys in Pakistan at Smart Kids Toys. Fast cash on delivery nationwide.',
    'content' => 'Discover our premium selection of toys designed for safety, fun, and childhood development.'
);

// 3. Filter catalog toys
$all_toys = smartkidstoys_get_catalog_toys();
$category_toys = array_filter( $all_toys, function( $t ) use ( $cat_meta, $slug ) {
    $toy_cat_slug = function_exists( 'smartkidstoys_slugify' ) ? smartkidstoys_slugify( $t['category'] ) : strtolower( str_replace( ' ', '-', $t['category'] ) );
    return ( $toy_cat_slug === $slug || stripos( $t['category'], $cat_meta['name'] ) !== false );
} );

if ( empty( $category_toys ) ) {
    $category_toys = array_slice( $all_toys, 0, 8 );
}

$canonical_url = home_url( '/category/' . $slug );
?>

<!-- Schema.org JSON-LD Structured Data for Category Landing Page -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "<?php echo esc_url( home_url( '/' ) ); ?>"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Categories",
          "item": "<?php echo esc_url( home_url( '/categories' ) ); ?>"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "<?php echo esc_js( $cat_meta['name'] ); ?>",
          "item": "<?php echo esc_url( $canonical_url ); ?>"
        }
      ]
    },
    {
      "@type": "CollectionPage",
      "url": "<?php echo esc_url( $canonical_url ); ?>",
      "name": "<?php echo esc_js( $cat_meta['title'] ); ?>",
      "description": "<?php echo esc_js( $cat_meta['description'] ); ?>"
    }
  ]
}
</script>

<div style="background: #F8FAFC; min-height: 100vh; padding-bottom: 80px;">
    <!-- Breadcrumbs -->
    <div style="background: #FFFFFF; border-bottom: 1px solid #E2E8F0; padding: 14px 0;">
        <div class="container" style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748B;">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color: #64748B; text-decoration: none;">Home</a>
            <span>&rsaquo;</span>
            <a href="<?php echo esc_url( home_url( '/categories' ) ); ?>" style="color: #64748B; text-decoration: none;">Categories</a>
            <span>&rsaquo;</span>
            <span style="color: #FF4D8D; font-weight: 700;"><?php echo esc_html( $cat_meta['name'] ); ?></span>
        </div>
    </div>

    <!-- Category Hero Banner -->
    <div style="background: linear-gradient(135deg, #FFF1F2 0%, #EFF6FF 50%, #FAF5FF 100%); border-bottom: 1px solid #F1F5F9; padding: 48px 20px 40px;">
        <div class="container">
            <span style="display: inline-block; background: #FFFFFF; color: #FF4D8D; font-size: 12px; font-weight: 800; text-transform: uppercase; padding: 5px 14px; borderRadius: 30px; margin-bottom: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                Premium Toy Collection
            </span>
            <h1 style="font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: #0F172A; margin: 0 0 12px;">
                <?php echo esc_html( $cat_meta['name'] ); ?> <span style="color: #FF4D8D;">Toys</span>
            </h1>
            <p style="max-width: 780px; font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 20px;">
                <?php echo esc_html( $cat_meta['description'] ); ?>
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; font-weight: 700; color: #334155;">
                <span>🛡️ 100% Child Safe Materials</span>
                <span>🚚 Express Delivery Across Pakistan</span>
                <span>🔄 7-Day Easy Return</span>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container" style="padding-top: 36px;">
        <!-- Product Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; margin-bottom: 60px;">
            <?php foreach ( $category_toys as $product ) : 
                $prod_slug = function_exists( 'smartkidstoys_slugify' ) ? smartkidstoys_slugify( $product['name'] ) : 'toy-' . $product['id'];
                $prod_url = home_url( '/product/' . $prod_slug );
            ?>
                <div class="demo-product-card" style="background: white; border-radius: 16px; border: 1px solid #E2E8F0; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    <div>
                        <a href="<?php echo esc_url( $prod_url ); ?>" style="display: block; aspect-ratio: 1; overflow: hidden; border-radius: 12px; margin-bottom: 12px;">
                            <img src="<?php echo esc_url( $product['image'] ); ?>" alt="<?php echo esc_attr( $product['name'] ); ?>" style="width: 100%; height: 100%; object-fit: contain;" />
                        </a>
                        <span style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase;">
                            <?php echo esc_html( $product['category'] ); ?>
                        </span>
                        <h3 style="font-size: 15px; font-weight: 800; margin: 6px 0 10px;">
                            <a href="<?php echo esc_url( $prod_url ); ?>" style="color: #0F172A; text-decoration: none;">
                                <?php echo esc_html( $product['name'] ); ?>
                            </a>
                        </h3>
                    </div>
                    <div>
                        <div style="font-size: 16px; font-weight: 900; color: #0F172A; margin-bottom: 12px;">
                            PKR <?php echo number_format( $product['price'] ); ?>
                        </div>
                        <a href="<?php echo esc_url( $prod_url ); ?>" style="display: block; text-align: center; background: linear-gradient(135deg, #0284C7, #0369A1); color: white; padding: 10px; border-radius: 10px; font-weight: 800; font-size: 13px; text-decoration: none;">
                            View Details
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Rich SEO Content Block -->
        <div style="background: #FFFFFF; border-radius: 20px; border: 1px solid #E2E8F0; padding: 40px 32px;">
            <h2 style="font-size: 22px; font-weight: 800; color: #0F172A; margin-bottom: 16px;">
                About Our <?php echo esc_html( $cat_meta['name'] ); ?> Toys in Pakistan
            </h2>
            <p style="font-size: 14px; line-height: 1.8; color: #475569; margin-bottom: 24px;">
                <?php echo esc_html( $cat_meta['content'] ); ?>
            </p>
        </div>
    </div>
</div>

<?php get_footer(); ?>
