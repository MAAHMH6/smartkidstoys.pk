<?php
/**
 * The template for displaying all standard pages
 *
 * @package SmartKidsToys
 */

get_header();
?>

<div class="container" style="padding: 40px 20px 80px; max-width: 860px;">
    <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'entry-content' ); ?>>
            <header class="entry-header" style="margin-bottom: 28px;">
                <h1 class="section-title-text" style="font-size: 2.2rem;"><?php the_title(); ?></h1>
            </header>

            <div style="font-size: 0.96rem; line-height: 1.7; color: var(--text);">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; ?>
</div>

<?php
get_footer();
