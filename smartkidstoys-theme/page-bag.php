<?php
/**
 * Template Name: Shopping Bag
 * The template for displaying shopping cart and direct WhatsApp checkout.
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();

$pakistan_cities = array(
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan',
    'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Abbottabad',
    'Bahawalpur', 'Sargodha', 'Sukkur'
);
?>

<div class="container" style="padding: 40px 20px 80px;">
    
    <div style="margin-bottom: 28px;">
        <h1 class="section-title-text" style="font-size: 2rem; margin-bottom: 6px;">Shopping <span>Bag</span></h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Review your items and proceed with Direct WhatsApp Checkout.</p>
    </div>

    <!-- Free Delivery Progress Bar -->
    <div style="background: white; border: 1px solid var(--gray-2); border-radius: var(--radius-xl); padding: 18px 24px; box-shadow: var(--shadow-card); margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 0.88rem;">
            <span style="font-weight: 800; color: var(--dark-heading); display: inline-flex; align-items: center; gap: 6px;" id="skt-bag-delivery-msg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span>Add PKR 3,000 for FREE Nationwide Delivery!</span>
            </span>
            <span style="font-weight: 800; color: var(--primary-blue);" id="skt-bag-delivery-percent">0%</span>
        </div>
        <div style="width: 100%; height: 8px; background: #F1F5F9; border-radius: var(--radius-full); overflow: hidden;">
            <div id="skt-bag-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #0284C7, #10B981); border-radius: var(--radius-full); transition: width 0.4s ease;"></div>
        </div>
    </div>

    <!-- Bag Layout -->
    <div class="bag-layout" style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px; align-items: start;">
        
        <!-- LEFT: Items List -->
        <div style="background: white; border-radius: var(--radius-xl); border: 1px solid var(--gray-2); padding: 24px; box-shadow: var(--shadow-card);" id="skt-bag-items-container">
            <!-- Dynamic Items Injected by JS -->
            <div id="skt-bag-items-list"></div>
            
            <div id="skt-bag-empty-state" style="text-align: center; padding: 48px 20px; display: none;">
                <div style="width: 72px; height: 72px; border-radius: 50%; background: #FEF3C7; color: #D97706; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 6px;">Your Bag is Currently Empty</h3>
                <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 0.92rem;">Explore our featured toys and add your favorites to cart.</p>
                <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="btn-hero-shop">Explore Toys</a>
            </div>
        </div>

        <!-- RIGHT: Order Summary & WhatsApp Checkout Form -->
        <div style="background: white; border-radius: var(--radius-xl); border: 1px solid var(--gray-2); padding: 28px; box-shadow: var(--shadow-card);">
            <h2 style="font-size: 1.25rem; font-weight: 900; margin-bottom: 18px; border-bottom: 1px solid var(--gray-2); padding-bottom: 12px;">
                Order Summary
            </h2>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; font-size: 0.92rem;">
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-muted);">Bag Subtotal</span>
                    <strong id="skt-summary-subtotal">PKR 0</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-muted);">Delivery Fee</span>
                    <span id="skt-summary-delivery" style="color: #16A34A; font-weight: 800;">FREE</span>
                </div>
                <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--gray-2); padding-top: 12px; font-size: 1.15rem; font-weight: 900; color: var(--dark-heading);">
                    <span>Total</span>
                    <span id="skt-summary-total">PKR 0</span>
                </div>
            </div>

            <!-- Checkout Form -->
            <form id="skt-whatsapp-checkout-form" style="display: flex; flex-direction: column; gap: 14px;">
                <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">Full Name *</label>
                    <input type="text" id="skt-checkout-name" required placeholder="e.g. Asad Khan" style="width: 100%; padding: 9px 12px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.9rem;" />
                </div>

                <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">WhatsApp Phone Number *</label>
                    <input type="tel" id="skt-checkout-phone" required placeholder="03XX XXXXXXX" style="width: 100%; padding: 9px 12px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.9rem;" />
                </div>

                <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">City *</label>
                    <select id="skt-checkout-city" style="width: 100%; padding: 9px 12px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.9rem; background: white;">
                        <?php foreach ( $pakistan_cities as $c ) : ?>
                            <option value="<?php echo esc_attr( $c ); ?>"><?php echo esc_html( $c ); ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div>
                    <label style="display: block; font-size: 0.84rem; font-weight: 700; margin-bottom: 4px;">Delivery Address *</label>
                    <textarea id="skt-checkout-address" rows="2" required placeholder="House number, street, area..." style="width: 100%; padding: 9px 12px; border: 1.5px solid var(--gray-2); border-radius: var(--radius-md); font-size: 0.9rem;"></textarea>
                </div>

                <button type="submit" class="btn-whatsapp" style="width: 100%; padding: 12px; font-size: 0.95rem; border-radius: var(--radius-full); margin-top: 6px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    <span>Complete Order via WhatsApp</span>
                </button>

                <p style="text-align: center; font-size: 0.76rem; color: var(--text-muted); margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span>Cash on Delivery | Fast &amp; Verified Pakistan Dispatch</span>
                </p>
            </form>
        </div>

    </div>

</div>

<?php
get_footer();
