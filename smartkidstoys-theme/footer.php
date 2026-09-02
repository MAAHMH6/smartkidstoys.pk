<?php
/**
 * SmartKids Toys - Footer Template
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */
?>

<!-- Scalloped wave divider -->
<div class="scalloped-divider" aria-hidden="true"></div>

<footer class="demo-footer" role="contentinfo">
    <div class="container">

        <div class="demo-footer-grid">

            <!-- Column 1: Brand & Pakistan Trust Badge -->
            <div>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="display:inline-block; margin-bottom:16px;">
                    <img src="<?php echo smartkidstoys_get_image_url( 'skt_logo_url', 'logo.png' ); ?>" alt="SmartKids Toys" style="height:70px; width:auto; object-fit:contain;">
                </a>
                <p style="color:var(--text-muted); font-size:0.88rem; line-height:1.6; margin-bottom:18px;">
                    Pakistan's premium destination for child-safe, educational, and creative toys. Designed to foster imagination and joyful learning.
                </p>
                <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:var(--radius-md); padding:10px 14px; display:flex; align-items:center; gap:10px;">
                    <!-- Flag Pakistan (P shape) SVG placeholder -->
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l3 1m0 0l-3 9M6 7l6 2m0 0l-2 8M6 7l6-2m0 0l6 2m0 0l-2 8m2-8l-6-2"/></svg>
                    <span style="font-size:0.82rem; font-weight:700; color:var(--primary-blue);">100% Verified WhatsApp Orders &amp; Cash on Delivery Across Pakistan</span>
                </div>
            </div>

            <!-- Column 2: Shop Categories -->
            <div>
                <div class="footer-column-title">Shop Categories</div>
                <ul class="footer-links-list">
                    <li><a href="<?php echo esc_url( home_url( '/shop?cat=Soft+Toys' ) ); ?>">Soft Toys &amp; Plush Toys</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/shop?cat=Educational' ) ); ?>">STEM &amp; Educational</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/shop?cat=Building+Blocks' ) ); ?>">Building Blocks &amp; Sets</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/shop?cat=Vehicles' ) ); ?>">RC Cars &amp; Trains</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/shop?cat=Action+Figures' ) ); ?>">Action Figures</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/new-arrivals' ) ); ?>">New Arrivals</a></li>
                </ul>
            </div>

            <!-- Column 3: Customer Care -->
            <div>
                <div class="footer-column-title">Customer Care</div>
                <ul class="footer-links-list">
                    <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>">Contact Support</a></li>
                    <li><a href="https://wa.me/923098444501" target="_blank" rel="noreferrer">WhatsApp: 03098444501</a></li>
                    <li><a href="tel:+923098444501">Call: 03098444501</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/bag' ) ); ?>">View Shopping Bag</a></li>
                </ul>
            </div>

            <!-- Column 4: Information -->
            <div>
                <div class="footer-column-title">Information</div>
                <ul class="footer-links-list">
                    <li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>">About SmartKids</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>">Privacy &amp; Security</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/terms' ) ); ?>">Terms &amp; Conditions</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/shipping-delivery' ) ); ?>">Shipping &amp; Delivery</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/returns-refunds' ) ); ?>">14-Day Easy Returns</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/categories' ) ); ?>">All Categories</a></li>
                </ul>
            </div>

            <!-- Column 5: Newsletter & Social -->
            <div>
                <div class="footer-column-title">Stay Connected</div>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:10px;">Get SMS alerts for new toy launches and special discount offers.</p>
                <form class="demo-subscribe-form" onsubmit="return false;">
                    <input type="email" class="demo-subscribe-input" placeholder="Enter your email" aria-label="Email for newsletter" />
                    <button type="submit" class="btn-subscribe">Join</button>
                </form>

                <!-- Social Icons - pure SVG, no emoji -->
                <div class="footer-social-icons">
                    <a href="#" class="footer-social-icon" aria-label="Facebook">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="#" class="footer-social-icon" aria-label="Instagram">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href="https://wa.me/923098444501" target="_blank" rel="noreferrer" class="footer-social-icon" aria-label="WhatsApp" style="color:#25D366;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </a>
                    <a href="#" class="footer-social-icon" aria-label="YouTube">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                    </a>
                    <a href="#" class="footer-social-icon" aria-label="TikTok">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                    </a>
                </div>
            </div>

        </div>

        <!-- Footer Bottom Bar -->
        <div class="demo-footer-bottom">
            <span>&copy; <?php echo date( 'Y' ); ?> SmartKids Toys Pakistan. All Rights Reserved.</span>
            <div style="display:flex; gap:20px;">
                <a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>">Privacy</a>
                <a href="<?php echo esc_url( home_url( '/terms' ) ); ?>">Terms</a>
                <a href="<?php echo esc_url( home_url( '/shipping-delivery' ) ); ?>">Delivery</a>
            </div>
        </div>

    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
