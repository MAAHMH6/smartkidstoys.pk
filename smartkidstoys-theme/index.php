<?php
/**
 * The main template file
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();
?>

<div class="container" style="padding: 40px 20px 80px;">
    <?php if ( have_posts() ) : ?>
        <header class="page-header" style="margin-bottom: 30px;">
            <h1 class="section-title-text"><?php single_post_title(); ?></h1>
        </header>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
            <?php while ( have_posts() ) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class( 'demo-product-card' ); ?>>
                    <h2 class="demo-product-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">
                        <?php the_excerpt(); ?>
                    </div>
                    <a href="<?php the_permalink(); ?>" class="btn-hero-shop" style="padding: 8px 18px; font-size: 0.85rem; align-self: flex-start; display: inline-flex; align-items: center; gap: 6px;">
                        <span>Read More</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                </article>
            <?php endwhile; ?>
        </div>

        <div style="margin-top: 30px;">
            <?php the_posts_pagination(); ?>
        </div>
    <?php else : ?>
        <div style="text-align: center; padding: 60px 20px;">
            <h2>No content found</h2>
            <p style="color: var(--text-muted); margin: 10px 0 20px;">Please browse our active toy catalog.</p>
            <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="btn-hero-shop">Go to Shop</a>
        </div>
    <?php endif; ?>
</div>

<?php
get_footer();
