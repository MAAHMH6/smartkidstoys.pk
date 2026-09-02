<?php
/**
 * Template Name: About Us
 * The template for displaying brand story and child-safety commitments.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();
?>

<div class="container" style="padding: 40px 20px 80px;">
    
    <!-- Hero Title -->
    <div style="text-align: center; max-width: 720px; margin: 0 auto 50px;">
        <span style="background: #EFF6FF; color: #0284C7; padding: 4px 14px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 800; text-transform: uppercase;">
            Our Mission &amp; Story
        </span>
        <h1 class="section-title-text" style="font-size: 2.4rem; margin: 12px 0 10px;">Inspiring Play &amp; <span>Joyful Childhoods</span></h1>
        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">
            Welcome to SmartKids Toys &mdash; Pakistan's trusted wonderland of child-safe, educational, and joyful play companions.
        </p>
    </div>

    <!-- Core Pillars Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 60px;">
        
        <div style="background: white; padding: 32px; border-radius: var(--radius-xl); border: 1px solid var(--gray-2); box-shadow: var(--shadow-card);">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: #EFF6FF; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; color: #0284C7;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h2 style="font-size: 1.25rem; font-weight: 900; margin-bottom: 8px;">100% Non-Toxic Safety</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
                Every single toy in our catalog undergoes strict safety screening. We prioritize smooth-edge woodwork, BPA-free plastics, and hypoallergenic plush fabrics.
            </p>
        </div>

        <div style="background: white; padding: 32px; border-radius: var(--radius-xl); border: 1px solid var(--gray-2); box-shadow: var(--shadow-card);">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: #FEF3C7; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; color: #D97706;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
            </div>
            <h2 style="font-size: 1.25rem; font-weight: 900; margin-bottom: 8px;">STEM &amp; Brain Development</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
                Play is the foundation of intellect. Our Montessori puzzles, robotic kits, and building sets help children develop critical problem-solving and motor skills.
            </p>
        </div>

        <div style="background: white; padding: 32px; border-radius: var(--radius-xl); border: 1px solid var(--gray-2); box-shadow: var(--shadow-card);">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: #DCFCE7; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; color: #16A34A;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <h2 style="font-size: 1.25rem; font-weight: 900; margin-bottom: 8px;">Seamless Pakistan Delivery</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
                Express doorstep shipping across all major cities and towns. Enjoy Free Delivery on orders over PKR 3,000 with Cash on Delivery and WhatsApp tracking.
            </p>
        </div>

    </div>

    <!-- Contact & Direct Support Banner -->
    <div style="background: linear-gradient(135deg, #0284C7, #0369A1); color: white; border-radius: var(--radius-xl); padding: 48px 36px; text-align: center; box-shadow: var(--shadow-card);">
        <h2 style="color: white; font-size: 1.8rem; font-weight: 900; margin-bottom: 8px;">Need Toy Guidance or Custom Gift Bundles?</h2>
        <p style="color: rgba(255,255,255,0.9); font-size: 1rem; max-width: 560px; margin: 0 auto 24px;">
            Our toy specialists are ready on WhatsApp to assist with age recommendations and fast order dispatch!
        </p>
        <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
            <a href="https://wa.me/923098444501" target="_blank" rel="noreferrer" class="btn" style="background: #25D366; color: white; padding: 12px 28px; border-radius: var(--radius-full); font-weight: 800; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                <span>WhatsApp Us (03098444501)</span>
            </a>
            <a href="tel:03098444501" class="btn" style="background: white; color: #0284C7; padding: 12px 28px; border-radius: var(--radius-full); font-weight: 800; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.78 16.92z"/></svg>
                <span>Call: 03098444501</span>
            </a>
        </div>
    </div>

</div>

<?php
get_footer();
