<?php
/**
 * Template Name: Customer Account
 * SVG-only icons. Zero raw emoji characters.
 *
 * @package SmartKidsToys
 * @version 1.1.0
 */

get_header();
?>

<div class="container" style="padding: 40px 20px 80px;">
    
    <div style="margin-bottom: 32px;">
        <h1 class="section-title-text" style="font-size: 2rem; margin-bottom: 6px;">My <span>Account</span></h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
            Welcome to your SmartKids Toys customer account dashboard.
        </p>
    </div>

    <div style="display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start;">
        
        <!-- Left Sidebar -->
        <div style="background: white; border-radius: var(--radius-xl); padding: 28px 24px; border: 1px solid var(--gray-2); box-shadow: var(--shadow-card);">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid var(--gray-2); margin-bottom: 20px;">
                <div style="width: 72px; height: 72px; border-radius: 50%; background: #EFF6FF; color: var(--primary-blue); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div style="font-weight: 800; font-size: 1.1rem; color: var(--dark-heading);" id="skt-account-user-name">Customer Account</div>
                <div style="margin-top: 10px;">
                    <span style="background: #DCFCE7; color: #16A34A; padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 800;">
                        Active Member
                    </span>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button type="button" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: var(--radius-md); background: #EFF6FF; color: var(--primary-blue); font-weight: 800; font-size: 0.92rem; text-align: left; width: 100%; border: none; cursor: pointer;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    <span>My Orders</span>
                </button>
                <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: var(--radius-md); color: var(--text); font-weight: 700; font-size: 0.92rem; text-decoration: none;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    <span>Explore Toys</span>
                </a>
                <a href="https://wa.me/923098444501" target="_blank" rel="noreferrer" style="display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: var(--radius-md); color: #16A34A; font-weight: 700; font-size: 0.92rem; text-decoration: none;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    <span>WhatsApp Support</span>
                </a>
            </div>
        </div>

        <!-- Right Content Area -->
        <div>
            <div style="background: white; border-radius: var(--radius-xl); border: 1px solid var(--gray-2); padding: 36px; box-shadow: var(--shadow-card);">
                <h2 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 20px;">Your WhatsApp Orders</h2>

                <div style="text-align: center; padding: 48px 20px;">
                    <div style="width: 72px; height: 72px; border-radius: 50%; background: #EFF6FF; color: #0284C7; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    </div>
                    <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 6px;">All Orders are Tracked via WhatsApp</h3>
                    <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 0.92rem;">
                        Your recent toy orders are synced with your WhatsApp helpline at <strong>03098444501</strong>.
                    </p>
                    <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="btn-hero-shop" style="display: inline-flex; align-items: center; gap: 8px;">
                        <span>Browse Toy Catalog</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
                </div>
            </div>
        </div>

    </div>

</div>

<?php
get_footer();
